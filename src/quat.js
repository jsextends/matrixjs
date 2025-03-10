import { ARRAY_TYPE } from "./common";

export default class Quat {
  _value = null;
  constructor() {
    this._value = new ARRAY_TYPE(4);
    this.identity();
  }

  get(component) {
    switch (component) {
      case "r":
        return this._value[3];
      case "i":
        return this._value[0];
      case "j":
        return this._value[1];
      case "k":
        return this._value[2];
      default:
        throw Error("unknown vector component");
    }
  }

  set(r, i, j, k) {
    this._value[3] = r;
    this._value[0] = i;
    this._value[1] = j;
    this._value[2] = k;
  }

  identity() {
    this.set(1, 0, 0, 0);
  }

  toString(){
    return `Quat(${this.get("i")}, ${this.get("j")}, ${this.get("k")}, ${this.get("r")})`
  }
}
