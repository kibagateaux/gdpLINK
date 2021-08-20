pragma solidity ^0.6.0;

import "@chainlink/contracts/src/v0.4/ChainlinkClient.sol";
import "openzeppelin-eth/contracts/math/SafeMath.sol";
import "openzeppelin-eth/contracts/ownership/Ownable.sol";

import "./lib/SafeMathInt.sol";
import "./lib/UInt256Lib.sol";
import "./UFragments.sol";

/**
 * @title uFragments Monetary Supply Policy
 * @dev This is an implementation of the uFragments Ideal Money protocol.
 *      uFragments operates symmetrically on expansion and contraction. It will both split and
 *      combine coins to maintain a stable unit price.
 *
 *      This component regulates the token supply of the uFragments ERC20 token in response to
 *      ChainLink oracles' total amount payed in the last epoch period.
 */
contract UFragmentsPolicy is Ownable, ChainlinkClient {
    using SafeMath for uint256;
    using SafeMathInt for int256;
    using UInt256Lib for uint256;

    event LogRebase(
        uint256 indexed epoch,
        int256 newGDP,
        uint256 timestampSec
    );

    UFragments public uFrags;

		// Chainlink job spec id
    bytes32 private jobId;
		// Chainlink oracle fee (0.1 LINK)
    uint256 private oracleFee;
    // chainlink oracle data requests are sent to
    address private oracle;

		// current total economic activity over time period
		uint256 public totalGDP;

    // More than this much time must pass between rebase operations.
    uint256 public minRebaseTimeIntervalSec;

    // Block timestamp of last rebase operation
    uint256 public lastRebaseTimestampSec;

    // The rebase window begins this many seconds into the minRebaseTimeInterval period.
    // For example if minRebaseTimeInterval is 24hrs, it represents the time of day in seconds.
    uint256 public rebaseWindowOffsetSec;

    // The length of the time window where a rebase operation is allowed to execute, in seconds.
    uint256 public rebaseWindowLengthSec;

    // The number of rebase cycles since inception
    uint256 public epoch;

    uint256 private constant DECIMALS = 18;

		// Timespan to calculate GDP over e.g. 1 year
		uint256 public epochLength = 1 days;

    // Due to the expression in computeSupplyDelta(), MAX_RATE * MAX_SUPPLY must fit into an int256.
    // Both are 18 decimals fixed point numbers.
    uint256 private constant MAX_RATE = 10**6 * 10**DECIMALS;
    // MAX_SUPPLY = MAX_INT256 / MAX_RATE
    uint256 private constant MAX_SUPPLY = ~(uint256(1) << 255) / MAX_RATE;

    // This module orchestrates the rebase execution and downstream notification.
    address public orchestrator;

    modifier onlyOrchestrator() {
        require(msg.sender == orchestrator);
        _;
    }

    /**
     * @notice Initiates a new rebase operation, provided the minimum time period has elapsed.
     *
     * @dev The supply adjustment equals the new totalGDP for the last epoch.
		 *			The new supply is completely unrelated to the old supply.
     */
    function rebase() external onlyOrchestrator {
        require(inRebaseWindow());

        // This comparison also ensures there is no reentrancy.
        require(lastRebaseTimestampSec.add(minRebaseTimeIntervalSec) < now);

        // Snap the rebase time to the start of this window.
        lastRebaseTimestampSec = now.sub(
            now.mod(minRebaseTimeIntervalSec)).add(rebaseWindowOffsetSec);

        epoch = epoch.add(1);

				// get current GDP from node

        if (totalGDP > 0 && uFrags.totalSupply().add(uint256(totalGDP)) > MAX_SUPPLY) {
            totalGDP = (MAX_SUPPLY.sub(uFrags.totalSupply())).toInt256Safe();
        }

        uint256 supplyAfterRebase = uFrags.rebase(epoch, totalGDP);
        assert(supplyAfterRebase <= MAX_SUPPLY);
        emit LogRebase(epoch, exchangeRate, cpi, totalGDP, now);
    }


		function requestTotalGDP()
			public
			onlyOwner
			returns (bytes32 requestId) 
		{
			Chainlink.Request memory req = buildChainlinkRequest(jobId, this, this.fulfill.selector);
			req.add('epochLength', epochLength);
			req.add('epochStart', now.sub(epochLength));
			requestId = sendChainlinkRequestTo(oracle, req, oracleFee);
			return requestId;
		}

		 /**
     * Receive the response in the form of uint256 and update total supply of gdpLINK
     */ 
    function updateTotalGDP(bytes32 requestId_, uint256 totalGDP_)
			public
			recordChainlinkFulfillment(requestId_)
    {
        totalGDP = totalGDP_;
    }

		 /**
     * @notice Sets the timespan over which we query network activity.
     * @param epochLength_ The address of the market oracle contract.
     */
    function setEpochLength(uint256 epochLength_)
        external
        onlyOwner
    {
				require(
					epochLength > 1 hours && epochLength <= 1 days * 365,
					"Epoch length must be between 1 hour and 1 year"
				);
        epochLength = epochLength_;
    }

    /**
     * @notice Sets the reference to the orchestrator.
     * @param orchestrator_ The address of the orchestrator contract.
     */
    function setOrchestrator(address orchestrator_)
        external
        onlyOwner
    {
        orchestrator = orchestrator_;
    }

    /**
     * @notice Sets the parameters which control the timing and frequency of
     *         rebase operations.
     *         a) the minimum time period that must elapse between rebase cycles.
     *         b) the rebase window offset parameter.
     *         c) the rebase window length parameter.
     * @param minRebaseTimeIntervalSec_ More than this much time must pass between rebase
     *        operations, in seconds.
     * @param rebaseWindowOffsetSec_ The number of seconds from the beginning of
              the rebase interval, where the rebase window begins.
     * @param rebaseWindowLengthSec_ The length of the rebase window in seconds.
     */
    function setRebaseTimingParameters(
        uint256 minRebaseTimeIntervalSec_,
        uint256 rebaseWindowOffsetSec_,
        uint256 rebaseWindowLengthSec_)
        external
        onlyOwner
    {
        require(minRebaseTimeIntervalSec_ > 0);
        require(rebaseWindowOffsetSec_ < minRebaseTimeIntervalSec_);

        minRebaseTimeIntervalSec = minRebaseTimeIntervalSec_;
        rebaseWindowOffsetSec = rebaseWindowOffsetSec_;
        rebaseWindowLengthSec = rebaseWindowLengthSec_;
    }

    /**
     * @dev ZOS upgradable contract initialization method.
     *      It is called at the time of contract creation to invoke parent class initializers and
     *      initialize the contract's state variables.
     */
    function initialize(
      address owner_,
      UFragments uFrags_,
      uint256 baseCpi_,
      address _oracle,
      bytes _jobId
    ) public initializer {
      Ownable.initialize(owner_);

      minRebaseTimeIntervalSec = 1 days;
      rebaseWindowOffsetSec = 72000;  // 8PM UTC
      rebaseWindowLengthSec = 15 minutes;
      lastRebaseTimestampSec = 0;
      epoch = 0;
      totalGDP = 0;
      oracle = _oracle;
      jobId = _jobId';
      oracleFee = 1e17; // 0.1 LINK

      uFrags = uFrags_;
    }

    /**
     * @return If the latest block timestamp is within the rebase time window it, returns true.
     *         Otherwise, returns false.
     */
    function inRebaseWindow() public view returns (bool) {
        return (
            now.mod(minRebaseTimeIntervalSec) >= rebaseWindowOffsetSec &&
            now.mod(minRebaseTimeIntervalSec) < (rebaseWindowOffsetSec.add(rebaseWindowLengthSec))
        );
    }
}
