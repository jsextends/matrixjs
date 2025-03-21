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

  /**
   * 使用4个值创建一个二维矩阵
   *
   * @param {Number} m00
   * @param {Number} m01
   * @param {Number} m10
   * @param {Number} m11
   * @returns {Mat2}
   */
  static fromValues(m00, m01, m10, m11) {
    const result = new Mat2();
    result.set(m00, m01, m10, m11);
    return result;
  }

  /**
   * 设置二维矩阵的值
   *
   * @param {Number} m00
   * @param {Number} m01
   * @param {Number} m10
   * @param {Number} m11
   */
  set(m00, m01, m10, m11) {
    this.set00(m00);
    this.set01(m01);
    this.set10(m10);
    this.set11(m11);
  }

  /**
   * 设置二维矩阵的第一行第一列的值
   *
   * @param {Number} val
   */
  set00(val) {
    this._value[0] = val;
  }

  /**
   * 设置二维矩阵的第一行第二列的值
   *
   * @param {Number} val
   */
  set01(val) {
    this._value[1] = val;
  }

  /**
   * 设置二维矩阵的第二行第一列的值
   *
   * @param {Number} val
   */
  set10(val) {
    this._value[2] = val;
  }

  /**
   * 设置二维矩阵的第二行第二列的值
   *
   * @param {Number} val
   */
  set11(val) {
    this._value[3] = val;
  }

  /**
   * 获取二维矩阵的第一行第一列的值
   *
   * @returns {Number}
   */
  get00() {
    return this._value[0];
  }

  /**
   * 获取二维矩阵的第一行第二列的值
   *
   * @returns {Number}
   */
  get01() {
    return this._value[1];
  }

  /**
   * 获取二维矩阵的第二行第一列的值
   *
   * @returns {Number}
   */
  get10() {
    return this._value[2];
  }

  /**
   * 获取二维矩阵的第二行第二列的值
   *
   * @returns {Number}
   */
  get11() {
    return this._value[3];
  }

  /**
   * 设置二维矩阵为单位矩阵（对眼矩阵）
   */
  identity() {
    this.set00(1);
    this.set01(0);
    this.set10(0);
    this.set11(1);
  }

  /**
   * 克隆一个二维矩阵
   *
   * @returns {Mat2}
   */
  clone() {
    const result = new Mat2();
    result.set00(this.get00());
    result.set01(this.get01());
    result.set10(this.get10());
    result.set11(this.get11());
    return result;
  }

  /**
   * 复制另一个二维矩阵的值
   *
   * @param {Mat2} Mat2
   */
  copy(mat2) {
    this.set00(mat2.get00());
    this.set01(mat2.get01());
    this.set10(mat2.get10());
    this.set11(mat2.get11());
  }

  /**
   * 矩阵转置
   */
  transpose() {
    const m01 = this.get01();
    const m10 = this.get10();
    this.set01(m10);
    this.set10(m01);
  }

  /**
   * 计算行列式
   *
   * @returns{Number}
   */
  determinant() {
    return this.get00() * this.get11() - this.get01() * this.get10();
  }

  /**
   * 求逆矩阵
   *
   * @returns {Mat2|null}
   */
  invert() {
    let det = this.determinant();

    if (!det) {
      return null;
    }
    const result = new Mat2();
    result.set(
      this.get11() / det,
      -this.get01() / det,
      -this.get10() / det,
      this.get00() / det
    );
    return result;
  }

  /**
   * 伴随矩阵
   *
   * @returns{Mat2}
   */
  adjugate() {
    const result = new Mat2();
    result.set(this.get11(), -this.get01(), -this.get10(), this.get00());
    return result;
  }

  /**
   * 矩阵相加
   */
  add(mat2) {
    const m00 = this.get00() + mat2.get00();
    const m01 = this.get01() + mat2.get01();
    const m02 = this.get10() + mat2.get10();
    const m03 = this.get11() + mat2.get11();
    this.set(m00, m01, m02, m03);
  }

  /**
   * 二维矩阵的相乘
   *
   * @param {Mat2} mat2
   */
  multiply(mat2) {
    const m00 = this.get00() * mat2.get00() + this.get10() * mat2.get01();
    const m01 = this.get00() * mat2.get10() + this.get01() * mat2.get11();
    const m02 = this.get10() * mat2.get00() + this.get11() * mat2.get10();
    const m03 = this.get10() * mat2.get01() + this.get11() * mat2.get11();
    this.set(m00, m01, m02, m03);
  }

  /**
   * 判断2个二维矩阵是否严格相对
   *
   * @param {Mat2} mat2
   * @returns {Boolean}
   */
  exactEquals(mat2) {
    return (
      this.get00() === mat2.get00() &&
      this.get01() === mat2.get01() &&
      this.get10() === mat2.get10() &&
      this.get11() === mat2.get11()
    );
  }

  /**
   * 判断2个二维矩阵是否相对相等，具体实现参考公共部分的equals方法
   *
   * @param {Mat2} mat2
   * @returns {Boolean}
   */
  equals(mat2) {
    return (
      equals(this.get00(), mat2.get00()) &&
      equals(this.get01(), mat2.get01()) &&
      equals(this.get10(), mat2.get10()) &&
      equals(this.get11(), mat2.get11())
    );
  }

  /**
   * 以字符串显示
   *
   * @returns{String}
   */
  toString() {
    return `Mat2
[${this.get00()} ${this.get01()}
${this.get10()} ${this.get11()}]`;
  }
}
