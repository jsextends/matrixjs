import { ARRAY_TYPE } from "./common";

export default class Mat2 {
  _value = [];

  /**
   * 初始化一个二维矩阵
   *
   * [1,0
   *  0,1]
   */
  constructor() {
    this._value = new ARRAY_TYPE(4);
    if (ARRAY_TYPE !== Float32Array) {
      this.identity();
    }
  }

  static fromValues(m00, m01, m10, m11) {
    const result = new Mat2();
    this.set(m00, m01, m10, m11)
    return result;
  }

  set(m00, m01, m10, m11){
    this.set00(m00);
    this.set01(m01);
    this.set10(m10);
    this.set11(m11);
  }

  set00(val) {
    this._value[0] = val;
  }

  set01(val) {
    this._value[1] = val;
  }

  set10(val) {
    this._value[2] = val;
  }

  set11(val) {
    this._value[3] = val;
  }

  get00() {
    return this._value[0];
  }

  get01() {
    return this._value[1];
  }

  get10() {
    return this._value[2];
  }

  get11() {
    return this._value[3];
  }

  clone() {
    const result = new Mat2();
    result.set00(this.get00());
    result.set01(this.get01());
    result.set10(this.get10());
    result.set11(this.get11());
    return result;
  }

  copy(mat2) {
    this.set00(mat2.get00());
    this.set01(mat2.get01());
    this.set10(mat2.get10());
    this.set11(mat2.get11());
  }

  identity(){
    this.set00(1);
    this.set01(0);
    this.set10(0);
    this.set11(1);
  }

  transpose(){
    const m01 = this.get01();
    const m10 = this.get10();
    this.set01(m10)
    this.set10(m01)
  }
}
