// THIS IS AN AUTOGENERATED FILE. DO NOT EDIT THIS FILE DIRECTLY.

import {
  ethereum,
  JSONValue,
  TypedMap,
  Entity,
  Bytes,
  Address,
  BigInt
} from "@graphprotocol/graph-ts";

export class OracleRequest extends ethereum.Event {
  get params(): OracleRequest__Params {
    return new OracleRequest__Params(this);
  }
}

export class OracleRequest__Params {
  _event: OracleRequest;

  constructor(event: OracleRequest) {
    this._event = event;
  }

  get specId(): Bytes {
    return this._event.parameters[0].value.toBytes();
  }

  get requester(): Address {
    return this._event.parameters[1].value.toAddress();
  }

  get requestId(): Bytes {
    return this._event.parameters[2].value.toBytes();
  }

  get payment(): BigInt {
    return this._event.parameters[3].value.toBigInt();
  }

  get callbackAddr(): Address {
    return this._event.parameters[4].value.toAddress();
  }

  get callbackFunctionId(): Bytes {
    return this._event.parameters[5].value.toBytes();
  }

  get cancelExpiration(): BigInt {
    return this._event.parameters[6].value.toBigInt();
  }

  get dataVersion(): BigInt {
    return this._event.parameters[7].value.toBigInt();
  }

  get data(): Bytes {
    return this._event.parameters[8].value.toBytes();
  }
}

export class CancelOracleRequest extends ethereum.Event {
  get params(): CancelOracleRequest__Params {
    return new CancelOracleRequest__Params(this);
  }
}

export class CancelOracleRequest__Params {
  _event: CancelOracleRequest;

  constructor(event: CancelOracleRequest) {
    this._event = event;
  }

  get requestId(): Bytes {
    return this._event.parameters[0].value.toBytes();
  }
}

export class OwnershipRenounced extends ethereum.Event {
  get params(): OwnershipRenounced__Params {
    return new OwnershipRenounced__Params(this);
  }
}

export class OwnershipRenounced__Params {
  _event: OwnershipRenounced;

  constructor(event: OwnershipRenounced) {
    this._event = event;
  }

  get previousOwner(): Address {
    return this._event.parameters[0].value.toAddress();
  }
}

export class OwnershipTransferred extends ethereum.Event {
  get params(): OwnershipTransferred__Params {
    return new OwnershipTransferred__Params(this);
  }
}

export class OwnershipTransferred__Params {
  _event: OwnershipTransferred;

  constructor(event: OwnershipTransferred) {
    this._event = event;
  }

  get previousOwner(): Address {
    return this._event.parameters[0].value.toAddress();
  }

  get newOwner(): Address {
    return this._event.parameters[1].value.toAddress();
  }
}

export class Contract extends ethereum.SmartContract {
  static bind(address: Address): Contract {
    return new Contract("Contract", address);
  }

  fulfillOracleRequest(
    _requestId: Bytes,
    _payment: BigInt,
    _callbackAddress: Address,
    _callbackFunctionId: Bytes,
    _expiration: BigInt,
    _data: Bytes
  ): boolean {
    let result = super.call(
      "fulfillOracleRequest",
      "fulfillOracleRequest(bytes32,uint256,address,bytes4,uint256,bytes32):(bool)",
      [
        ethereum.Value.fromFixedBytes(_requestId),
        ethereum.Value.fromUnsignedBigInt(_payment),
        ethereum.Value.fromAddress(_callbackAddress),
        ethereum.Value.fromFixedBytes(_callbackFunctionId),
        ethereum.Value.fromUnsignedBigInt(_expiration),
        ethereum.Value.fromFixedBytes(_data)
      ]
    );

    return result[0].toBoolean();
  }

  try_fulfillOracleRequest(
    _requestId: Bytes,
    _payment: BigInt,
    _callbackAddress: Address,
    _callbackFunctionId: Bytes,
    _expiration: BigInt,
    _data: Bytes
  ): ethereum.CallResult<boolean> {
    let result = super.tryCall(
      "fulfillOracleRequest",
      "fulfillOracleRequest(bytes32,uint256,address,bytes4,uint256,bytes32):(bool)",
      [
        ethereum.Value.fromFixedBytes(_requestId),
        ethereum.Value.fromUnsignedBigInt(_payment),
        ethereum.Value.fromAddress(_callbackAddress),
        ethereum.Value.fromFixedBytes(_callbackFunctionId),
        ethereum.Value.fromUnsignedBigInt(_expiration),
        ethereum.Value.fromFixedBytes(_data)
      ]
    );
    if (result.reverted) {
      return new ethereum.CallResult();
    }
    let value = result.value;
    return ethereum.CallResult.fromValue(value[0].toBoolean());
  }

  EXPIRY_TIME(): BigInt {
    let result = super.call("EXPIRY_TIME", "EXPIRY_TIME():(uint256)", []);

    return result[0].toBigInt();
  }

  try_EXPIRY_TIME(): ethereum.CallResult<BigInt> {
    let result = super.tryCall("EXPIRY_TIME", "EXPIRY_TIME():(uint256)", []);
    if (result.reverted) {
      return new ethereum.CallResult();
    }
    let value = result.value;
    return ethereum.CallResult.fromValue(value[0].toBigInt());
  }

  withdrawable(): BigInt {
    let result = super.call("withdrawable", "withdrawable():(uint256)", []);

    return result[0].toBigInt();
  }

  try_withdrawable(): ethereum.CallResult<BigInt> {
    let result = super.tryCall("withdrawable", "withdrawable():(uint256)", []);
    if (result.reverted) {
      return new ethereum.CallResult();
    }
    let value = result.value;
    return ethereum.CallResult.fromValue(value[0].toBigInt());
  }

  owner(): Address {
    let result = super.call("owner", "owner():(address)", []);

    return result[0].toAddress();
  }

  try_owner(): ethereum.CallResult<Address> {
    let result = super.tryCall("owner", "owner():(address)", []);
    if (result.reverted) {
      return new ethereum.CallResult();
    }
    let value = result.value;
    return ethereum.CallResult.fromValue(value[0].toAddress());
  }

  getAuthorizationStatus(_node: Address): boolean {
    let result = super.call(
      "getAuthorizationStatus",
      "getAuthorizationStatus(address):(bool)",
      [ethereum.Value.fromAddress(_node)]
    );

    return result[0].toBoolean();
  }

  try_getAuthorizationStatus(_node: Address): ethereum.CallResult<boolean> {
    let result = super.tryCall(
      "getAuthorizationStatus",
      "getAuthorizationStatus(address):(bool)",
      [ethereum.Value.fromAddress(_node)]
    );
    if (result.reverted) {
      return new ethereum.CallResult();
    }
    let value = result.value;
    return ethereum.CallResult.fromValue(value[0].toBoolean());
  }
}

export class OracleRequestCall extends ethereum.Call {
  get inputs(): OracleRequestCall__Inputs {
    return new OracleRequestCall__Inputs(this);
  }

  get outputs(): OracleRequestCall__Outputs {
    return new OracleRequestCall__Outputs(this);
  }
}

export class OracleRequestCall__Inputs {
  _call: OracleRequestCall;

  constructor(call: OracleRequestCall) {
    this._call = call;
  }

  get _sender(): Address {
    return this._call.inputValues[0].value.toAddress();
  }

  get _payment(): BigInt {
    return this._call.inputValues[1].value.toBigInt();
  }

  get _specId(): Bytes {
    return this._call.inputValues[2].value.toBytes();
  }

  get _callbackAddress(): Address {
    return this._call.inputValues[3].value.toAddress();
  }

  get _callbackFunctionId(): Bytes {
    return this._call.inputValues[4].value.toBytes();
  }

  get _nonce(): BigInt {
    return this._call.inputValues[5].value.toBigInt();
  }

  get _dataVersion(): BigInt {
    return this._call.inputValues[6].value.toBigInt();
  }

  get _data(): Bytes {
    return this._call.inputValues[7].value.toBytes();
  }
}

export class OracleRequestCall__Outputs {
  _call: OracleRequestCall;

  constructor(call: OracleRequestCall) {
    this._call = call;
  }
}

export class FulfillOracleRequestCall extends ethereum.Call {
  get inputs(): FulfillOracleRequestCall__Inputs {
    return new FulfillOracleRequestCall__Inputs(this);
  }

  get outputs(): FulfillOracleRequestCall__Outputs {
    return new FulfillOracleRequestCall__Outputs(this);
  }
}

export class FulfillOracleRequestCall__Inputs {
  _call: FulfillOracleRequestCall;

  constructor(call: FulfillOracleRequestCall) {
    this._call = call;
  }

  get _requestId(): Bytes {
    return this._call.inputValues[0].value.toBytes();
  }

  get _payment(): BigInt {
    return this._call.inputValues[1].value.toBigInt();
  }

  get _callbackAddress(): Address {
    return this._call.inputValues[2].value.toAddress();
  }

  get _callbackFunctionId(): Bytes {
    return this._call.inputValues[3].value.toBytes();
  }

  get _expiration(): BigInt {
    return this._call.inputValues[4].value.toBigInt();
  }

  get _data(): Bytes {
    return this._call.inputValues[5].value.toBytes();
  }
}

export class FulfillOracleRequestCall__Outputs {
  _call: FulfillOracleRequestCall;

  constructor(call: FulfillOracleRequestCall) {
    this._call = call;
  }

  get value0(): boolean {
    return this._call.outputValues[0].value.toBoolean();
  }
}

export class CancelOracleRequestCall extends ethereum.Call {
  get inputs(): CancelOracleRequestCall__Inputs {
    return new CancelOracleRequestCall__Inputs(this);
  }

  get outputs(): CancelOracleRequestCall__Outputs {
    return new CancelOracleRequestCall__Outputs(this);
  }
}

export class CancelOracleRequestCall__Inputs {
  _call: CancelOracleRequestCall;

  constructor(call: CancelOracleRequestCall) {
    this._call = call;
  }

  get _requestId(): Bytes {
    return this._call.inputValues[0].value.toBytes();
  }

  get _payment(): BigInt {
    return this._call.inputValues[1].value.toBigInt();
  }

  get _callbackFunc(): Bytes {
    return this._call.inputValues[2].value.toBytes();
  }

  get _expiration(): BigInt {
    return this._call.inputValues[3].value.toBigInt();
  }
}

export class CancelOracleRequestCall__Outputs {
  _call: CancelOracleRequestCall;

  constructor(call: CancelOracleRequestCall) {
    this._call = call;
  }
}

export class RenounceOwnershipCall extends ethereum.Call {
  get inputs(): RenounceOwnershipCall__Inputs {
    return new RenounceOwnershipCall__Inputs(this);
  }

  get outputs(): RenounceOwnershipCall__Outputs {
    return new RenounceOwnershipCall__Outputs(this);
  }
}

export class RenounceOwnershipCall__Inputs {
  _call: RenounceOwnershipCall;

  constructor(call: RenounceOwnershipCall) {
    this._call = call;
  }
}

export class RenounceOwnershipCall__Outputs {
  _call: RenounceOwnershipCall;

  constructor(call: RenounceOwnershipCall) {
    this._call = call;
  }
}

export class SetFulfillmentPermissionCall extends ethereum.Call {
  get inputs(): SetFulfillmentPermissionCall__Inputs {
    return new SetFulfillmentPermissionCall__Inputs(this);
  }

  get outputs(): SetFulfillmentPermissionCall__Outputs {
    return new SetFulfillmentPermissionCall__Outputs(this);
  }
}

export class SetFulfillmentPermissionCall__Inputs {
  _call: SetFulfillmentPermissionCall;

  constructor(call: SetFulfillmentPermissionCall) {
    this._call = call;
  }

  get _node(): Address {
    return this._call.inputValues[0].value.toAddress();
  }

  get _allowed(): boolean {
    return this._call.inputValues[1].value.toBoolean();
  }
}

export class SetFulfillmentPermissionCall__Outputs {
  _call: SetFulfillmentPermissionCall;

  constructor(call: SetFulfillmentPermissionCall) {
    this._call = call;
  }
}

export class OnTokenTransferCall extends ethereum.Call {
  get inputs(): OnTokenTransferCall__Inputs {
    return new OnTokenTransferCall__Inputs(this);
  }

  get outputs(): OnTokenTransferCall__Outputs {
    return new OnTokenTransferCall__Outputs(this);
  }
}

export class OnTokenTransferCall__Inputs {
  _call: OnTokenTransferCall;

  constructor(call: OnTokenTransferCall) {
    this._call = call;
  }

  get _sender(): Address {
    return this._call.inputValues[0].value.toAddress();
  }

  get _amount(): BigInt {
    return this._call.inputValues[1].value.toBigInt();
  }

  get _data(): Bytes {
    return this._call.inputValues[2].value.toBytes();
  }
}

export class OnTokenTransferCall__Outputs {
  _call: OnTokenTransferCall;

  constructor(call: OnTokenTransferCall) {
    this._call = call;
  }
}

export class TransferOwnershipCall extends ethereum.Call {
  get inputs(): TransferOwnershipCall__Inputs {
    return new TransferOwnershipCall__Inputs(this);
  }

  get outputs(): TransferOwnershipCall__Outputs {
    return new TransferOwnershipCall__Outputs(this);
  }
}

export class TransferOwnershipCall__Inputs {
  _call: TransferOwnershipCall;

  constructor(call: TransferOwnershipCall) {
    this._call = call;
  }

  get _newOwner(): Address {
    return this._call.inputValues[0].value.toAddress();
  }
}

export class TransferOwnershipCall__Outputs {
  _call: TransferOwnershipCall;

  constructor(call: TransferOwnershipCall) {
    this._call = call;
  }
}

export class WithdrawCall extends ethereum.Call {
  get inputs(): WithdrawCall__Inputs {
    return new WithdrawCall__Inputs(this);
  }

  get outputs(): WithdrawCall__Outputs {
    return new WithdrawCall__Outputs(this);
  }
}

export class WithdrawCall__Inputs {
  _call: WithdrawCall;

  constructor(call: WithdrawCall) {
    this._call = call;
  }

  get _recipient(): Address {
    return this._call.inputValues[0].value.toAddress();
  }

  get _amount(): BigInt {
    return this._call.inputValues[1].value.toBigInt();
  }
}

export class WithdrawCall__Outputs {
  _call: WithdrawCall;

  constructor(call: WithdrawCall) {
    this._call = call;
  }
}

export class ConstructorCall extends ethereum.Call {
  get inputs(): ConstructorCall__Inputs {
    return new ConstructorCall__Inputs(this);
  }

  get outputs(): ConstructorCall__Outputs {
    return new ConstructorCall__Outputs(this);
  }
}

export class ConstructorCall__Inputs {
  _call: ConstructorCall;

  constructor(call: ConstructorCall) {
    this._call = call;
  }

  get _link(): Address {
    return this._call.inputValues[0].value.toAddress();
  }
}

export class ConstructorCall__Outputs {
  _call: ConstructorCall;

  constructor(call: ConstructorCall) {
    this._call = call;
  }
}
