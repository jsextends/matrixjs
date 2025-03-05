import { ARRAY_TYPE } from "./common";

export default class Vec2 {
  _value = null;
  constructor() {
    this._value = new ARRAY_TYPE(2);
    if (ARRAY_TYPE !== Float32Array) {
      this._value[0] = 0;
      this._value[1] = 0;
    }
  }

  clone() {
    let result = new ARRAY_TYPE(2);
    result[0] = this._value[0];
    result[1] = this._value[1];
    return result;
  }

  static fromValues(x, y){
    let result = new ARRAY_TYPE(2);
    result[0] = x;
    result[1] = y;
    return result;
  }
}
