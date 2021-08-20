import { log, Address } from '@graphprotocol/graph-ts'
import {
  OracleContract,
  OracleRequest,
  CancelOracleRequest,
  // OwnershipRenounced,
  // OwnershipTransferred
} from "../generated/OracleContract/OracleContract"
import {
	NodeEntity,
	JobEntity,
} from "../generated/schema"

export function handleOracleRequest(event: OracleRequest): void {
	// create new job in the store
	let jobId = event.transaction.hash.toHex()
  let job = new JobEntity(jobId)

  job.specId = event.params.specId
  job.requester = event.params.requester
  job.payment = event.params.payment
  // job.gas = event.transaction.gasUsed * event.transactin.gasPrice
	job.completed = true
  job.timestamp = event.block.timestamp
  job.block = event.block.number
  job.data = event.params.data

  let nodeId = event.address.toHex() // Oracle request was sent to
  let node = new NodeEntity(nodeId)
  node.address = Address.fromString(nodeId)
  node.save()
  
  job.node = nodeId
	job.save()


  // Note: If a handler doesn't require existing field values, it is faster
  // _not_ to load the entity from the store. Instead, create it fresh with
  // `new Entity(...)`, set the fields that should be updated and save the
  // entity back to the store. Fields that were not set or unset remain
  // unchanged, allowing for partial updates to be applied.

  // It is also possible to access smart contracts from mappings. For
  // example, the contract that has emitted the event can be connected to
  // with:
  //
  // let contract = Contract.bind(event.address)
  //
  // The following functions can then be called on this contract to access
  // state variables and other data:
  //
  // - contract.fulfillOracleRequest(...)
  // - contract.EXPIRY_TIME(...)
  // - contract.withdrawable(...)
  // - contract.owner(...)
  // - contract.getAuthorizationStatus(...)
}

export function handleCancelOracleRequest(event: CancelOracleRequest): void {
	let id = event.transaction.hash.toHex();
	let job = JobEntity.load(id)
	if(job == null)
		job = new JobEntity(id);
	
	job.completed = false;
	job.save();
}

// export function handleOwnershipRenounced(event: OwnershipRenounced): void {}

// export function handleOwnershipTransferred(event: OwnershipTransferred): void {}
