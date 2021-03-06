// THIS IS AN AUTOGENERATED FILE. DO NOT EDIT THIS FILE DIRECTLY.

import {
  TypedMap,
  Entity,
  Value,
  ValueKind,
  store,
  Address,
  Bytes,
  BigInt,
  BigDecimal
} from "@graphprotocol/graph-ts";

export class JobEntity extends Entity {
  constructor(id: string) {
    super();
    this.set("id", Value.fromString(id));
  }

  save(): void {
    let id = this.get("id");
    assert(id !== null, "Cannot save JobEntity entity without an ID");
    assert(
      id.kind == ValueKind.STRING,
      "Cannot save JobEntity entity with non-string ID. " +
        'Considering using .toHex() to convert the "id" to a string.'
    );
    store.set("JobEntity", id.toString(), this);
  }

  static load(id: string): JobEntity | null {
    return store.get("JobEntity", id) as JobEntity | null;
  }

  get id(): string {
    let value = this.get("id");
    return value.toString();
  }

  set id(value: string) {
    this.set("id", Value.fromString(value));
  }

  get specId(): Bytes {
    let value = this.get("specId");
    return value.toBytes();
  }

  set specId(value: Bytes) {
    this.set("specId", Value.fromBytes(value));
  }

  get requester(): Bytes {
    let value = this.get("requester");
    return value.toBytes();
  }

  set requester(value: Bytes) {
    this.set("requester", Value.fromBytes(value));
  }

  get payment(): BigInt {
    let value = this.get("payment");
    return value.toBigInt();
  }

  set payment(value: BigInt) {
    this.set("payment", Value.fromBigInt(value));
  }

  get timestamp(): BigInt {
    let value = this.get("timestamp");
    return value.toBigInt();
  }

  set timestamp(value: BigInt) {
    this.set("timestamp", Value.fromBigInt(value));
  }

  get block(): BigInt {
    let value = this.get("block");
    return value.toBigInt();
  }

  set block(value: BigInt) {
    this.set("block", Value.fromBigInt(value));
  }

  get data(): Bytes | null {
    let value = this.get("data");
    if (value === null) {
      return null;
    } else {
      return value.toBytes();
    }
  }

  set data(value: Bytes | null) {
    if (value === null) {
      this.unset("data");
    } else {
      this.set("data", Value.fromBytes(value as Bytes));
    }
  }

  get completed(): boolean {
    let value = this.get("completed");
    return value.toBoolean();
  }

  set completed(value: boolean) {
    this.set("completed", Value.fromBoolean(value));
  }

  get node(): string {
    let value = this.get("node");
    return value.toString();
  }

  set node(value: string) {
    this.set("node", Value.fromString(value));
  }
}

export class NodeEntity extends Entity {
  constructor(id: string) {
    super();
    this.set("id", Value.fromString(id));
  }

  save(): void {
    let id = this.get("id");
    assert(id !== null, "Cannot save NodeEntity entity without an ID");
    assert(
      id.kind == ValueKind.STRING,
      "Cannot save NodeEntity entity with non-string ID. " +
        'Considering using .toHex() to convert the "id" to a string.'
    );
    store.set("NodeEntity", id.toString(), this);
  }

  static load(id: string): NodeEntity | null {
    return store.get("NodeEntity", id) as NodeEntity | null;
  }

  get id(): string {
    let value = this.get("id");
    return value.toString();
  }

  set id(value: string) {
    this.set("id", Value.fromString(value));
  }

  get address(): Bytes {
    let value = this.get("address");
    return value.toBytes();
  }

  set address(value: Bytes) {
    this.set("address", Value.fromBytes(value));
  }

  get jobs(): Array<string> | null {
    let value = this.get("jobs");
    if (value === null) {
      return null;
    } else {
      return value.toStringArray();
    }
  }

  set jobs(value: Array<string> | null) {
    if (value === null) {
      this.unset("jobs");
    } else {
      this.set("jobs", Value.fromStringArray(value as Array<string>));
    }
  }
}
