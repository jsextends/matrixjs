import { ARRAY_TYPE, equals } from "./common";

export default class Mat2 {

  /**
   * @property {ARRAY_TYPE} _value 分量的数据
   */
  _value = [];

  /**
   * 初始化一个二维矩阵
   *
   * [1,0
   *  0,1]
   */
  constructor() {
    this._value = new ARRAY_TYPE(4);
    this.identity();
  }

  static fromValues(m00, m01, m10, m11) {
    const result = new Mat2();
    this.set(m00, m01, m10, m11);
    return result;
  }

  set(m00, m01, m10, m11) {
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

  identity() {
    this.set00(1);
    this.set01(0);
    this.set10(0);
    this.set11(1);
  }

  transpose() {
    const m01 = this.get01();
    const m10 = this.get10();
    this.set01(m10);
    this.set10(m01);
  }

  invert() {
    let det = this.determinant();

    if (!det) {
      return null;
    }
    det = 1 / det;
    const result = new Mat2();
    result.set(
      this.get00() / det,
      -this.get01() / det,
      -this.get10() / det,
      this.get11() / det
    );
    return result;
  }

  adjugate() {
    const result = new Mat2();
    result.set(this.get11(), -this.get01(), -this.get10(), this.get00());
    return result;
  }

  determinant() {
    return this.get00() * this.get11() - this.get01() * this.get10();
  }

  multiply(mat2) {
    const m00 = this.get00() * mat2.get00() + this.get10() * mat2.get01();
    const m01 = this.get00() * mat2.get10() + this.get01() * mat2.get11();
    const m02 = this.get10() * mat2.get00() + this.get11() * mat2.get10();
    const m03 = this.get10() * mat2.get01() + this.get11() * mat2.get11();
    const result = new Mat2();
    result.set(m00, m01, m02, m03);
    return result;
  }

  rotate(rad) {
    let s = Math.sin(rad);
    let c = Math.cos(rad);
    const m00 = this.get00() * c + this.get10() * s;
    const m01 = this.get01() * c + this.get11() * s;
    const m02 = this.get00() * s + this.get10() * c;
    const m03 = this.get01() * s + this.get11() * c;
    this.set(m00, m01, m02, m03);
  }

  scale(vec2) {
    this.set(
      this.get00() * vec2.get("x"),
      this.get01() * vec2.get("x"),
      this.get10() * vec2.get("y"),
      this.get11() * vec2.get("y")
    );
  }

  add(mat2) {
    const m00 = this.get00() + mat2.get00();
    const m01 = this.get01() + mat2.get01();
    const m02 = this.get10() + mat2.get10();
    const m03 = this.get11() + mat2.get11();
    this.set(m00, m01, m02, m03);
  }

  subtract(mat2) {
    const m00 = this.get00() - mat2.get00();
    const m01 = this.get01() - mat2.get01();
    const m02 = this.get10() - mat2.get10();
    const m03 = this.get11() - mat2.get11();
    this.set(m00, m01, m02, m03);
  }

  exactEquals(mat2) {
    return (
      this.get00() === mat2.get00() &&
      this.get01() === mat2.get01() &&
      this.get10() === mat2.get10() &&
      this.get11() === mat2.get11()
    );
  }

  equals(mat2) {
    return (
      equals(this.get00(), mat2.get00()) &&
      equals(this.get01(), mat2.get01()) &&
      equals(this.get10(), mat2.get10()) &&
      equals(this.get11(), mat2.get11())
    );
  }

  toString() {
    return `Mat2(${this.get00()},${this.get01()},${this.get10()},${this.get11()})`;
  }
}
