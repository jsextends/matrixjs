import { ARRAY_TYPE, equals } from "./common";

export default class Mat3 {
  /**
   * @property {ARRAY_TYPE} _value 分量的数据
   */
  _value = [];

  /**
   * 初始化一个三维矩阵
   *
   * [1,0,0
   *  0,1,0,
   *  0,0,1]
   */
  constructor() {
    this._value = new ARRAY_TYPE(9);
    this.identity();
  }

  /**
   * 使用9个值创建一个三维矩阵
   *
   * @param {Number} m00
   * @param {Number} m01
   * @param {Number} m02
   * @param {Number} m10
   * @param {Number} m11
   * @param {Number} m12
   * @param {Number} m20
   * @param {Number} m21
   * @param {Number} m22
   * @returns {Mat3}
   */
  static fromValues(m00, m01, m02, m10, m11, m12, m20, m21, m22) {
    const result = new Mat3();
    result.set(m00, m01, m02, m10, m11, m12, m20, m21, m22);
    return result;
  }

  /**
   * 设置三维矩阵的值
   *
   * @param {Number} m00
   * @param {Number} m01
   * @param {Number} m02
   * @param {Number} m10
   * @param {Number} m11
   * @param {Number} m12
   * @param {Number} m20
   * @param {Number} m21
   * @param {Number} m22
   */
  set(m00, m01, m02, m10, m11, m12, m20, m21, m22) {
    this.set00(m00);
    this.set01(m01);
    this.set02(m02);
    this.set10(m10);
    this.set11(m11);
    this.set12(m12);
    this.set20(m20);
    this.set21(m21);
    this.set22(m22);
  }
  /**
   * 设置三维矩阵的第一行第一列的值
   *
   * @param {Number} val
   */
  set00(val) {
    this._value[0] = val;
  }

  /**
   * 设置三维矩阵的第一行第二列的值
   *
   * @param {Number} val
   */
  set01(val) {
    this._value[1] = val;
  }

  /**
   * 设置三维矩阵的第一行第三列的值
   *
   * @param {Number} val
   */
  set02(val) {
    this._value[2] = val;
  }

  /**
   * 设置三维矩阵的第二行第一列的值
   *
   * @param {Number} val
   */
  set10(val) {
    this._value[3] = val;
  }

  /**
   * 设置三维矩阵的第二行第二列的值
   *
   * @param {Number} val
   */
  set11(val) {
    this._value[4] = val;
  }

  /**
   * 设置三维矩阵的第二行第三列的值
   *
   * @param {Number} val
   */
  set12(val) {
    this._value[5] = val;
  }

  /**
   * 设置三维矩阵的第三行第一列的值
   *
   * @param {Number} val
   */
  set20(val) {
    this._value[6] = val;
  }

  /**
   * 设置三维矩阵的第三行第二列的值
   *
   * @param {Number} val
   */
  set21(val) {
    this._value[7] = val;
  }

  /**
   * 设置三维矩阵的第三行第三列的值
   *
   * @param {Number} val
   */
  set22(val) {
    this._value[8] = val;
  }

  /**
   * 获取三维矩阵的第一行第一列的值
   *
   * @returns {Number}
   */
  get00() {
    return this._value[0];
  }

  /**
   * 获取三维矩阵的第一行第二列的值
   *
   * @returns {Number}
   */
  get01() {
    return this._value[1];
  }

  /**
   * 获取三维矩阵的第一行第三列的值
   *
   * @returns {Number}
   */
  get02() {
    return this._value[2];
  }

  /**
   * 获取三维矩阵的第二行第一列的值
   *
   * @returns {Number}
   */
  get10() {
    return this._value[3];
  }

  /**
   * 获取三维矩阵的第二行第二列的值
   *
   * @returns {Number}
   */
  get11() {
    return this._value[4];
  }

  /**
   * 获取三维矩阵的第二行第三列的值
   *
   * @returns {Number}
   */
  get12() {
    return this._value[5];
  }

  /**
   * 获取三维矩阵的第三行第一列的值
   *
   * @returns {Number}
   */
  get20() {
    return this._value[6];
  }

  /**
   * 获取三维矩阵的第三行第二列的值
   *
   * @returns {Number}
   */
  get21() {
    return this._value[7];
  }

  /**
   * 获取三维矩阵的第三行第三列的值
   *
   * @returns {Number}
   */
  get22() {
    return this._value[8];
  }

  /**
   * 设置三维矩阵为单位矩阵（对眼矩阵）
   */
  identity() {
    this.set00(1);
    this.set01(0);
    this.set02(0);
    this.set10(0);
    this.set11(1);
    this.set12(0);
    this.set20(0);
    this.set21(0);
    this.set22(1);
  }

  /**
   * 克隆一个三维矩阵
   *
   * @returns {Mat3}
   */
  clone() {
    const result = new Mat3();
    result.set00(this.get00());
    result.set01(this.get01());
    result.set02(this.get02());
    result.set10(this.get10());
    result.set11(this.get11());
    result.set12(this.get12());
    result.set20(this.get20());
    result.set21(this.get21());
    result.set22(this.get22());
    return result;
  }

  /**
   * 复制另一个三维矩阵的值
   *
   * @param {Mat3} Mat3
   */
  copy(mat3) {
    this.set00(mat3.get00());
    this.set01(mat3.get01());
    this.set02(mat3.get02());
    this.set10(mat3.get10());
    this.set11(mat3.get11());
    this.set12(mat3.get12());
    this.set20(mat3.get20());
    this.set21(mat3.get21());
    this.set22(mat3.get22());
  }

  /**
   * 矩阵转置
   *
   * @returns {Mat3}
   */
  transpose() {
    const m01 = this.get01();
    const m02 = this.get02();
    const m10 = this.get10();
    const m12 = this.get12();
    const m20 = this.get20();
    const m21 = this.get21();
    this.set01(m10);
    this.set02(m20);
    this.set10(m01);
    this.set12(m21);
    this.set20(m02);
    this.set21(m12);
  }

  /**
   * 求逆矩阵
   *
   * @returns {Mat3|null}
   */
  invert() {
    let det = this.determinant();

    if (!det) {
      return null;
    }
    det = 1 / det;
    const result = new Mat3();
    const m00 = this.get11() * this.get22() - this.get12() * this.get21();
    const m01 = this.get12() * this.get20() - this.get10() * this.get22();
    const m02 = this.get10() * this.get21() - this.get11() * this.get20();
    const m10 = this.get02() * this.get21() - this.get01() * this.get22();
    const m11 = this.get00() * this.get22() - this.get02() * this.get20();
    const m12 = this.get01() * this.get20() - this.get00() * this.get21();
    const m20 = this.get01() * this.get12() - this.get11() * this.get02();
    const m21 = this.get02() * this.get10() - this.get00() * this.get22();
    const m22 = this.get00() * this.get11() - this.get01() * this.get11();
    result.set00(m00 * det);
    result.set01(m10 * det);
    result.set02(m20 * det);
    result.set10(m01 * det);
    result.set11(m11 * det);
    result.set12(m21 * det);
    result.set20(m02 * det);
    result.set21(m12 * det);
    result.set22(m22 * det);
    return result;
  }

  /**
   * 伴随矩阵
   *
   * @returns {Mat3}
   */
  adjugate() {
    const m00 = this.get11() * this.get22() - this.get12() * this.get21();
    const m01 = this.get12() * this.get20() - this.get10() * this.get22();
    const m02 = this.get10() * this.get21() - this.get11() * this.get20();
    const m10 = this.get02() * this.get21() - this.get01() * this.get22();
    const m11 = this.get00() * this.get22() - this.get02() * this.get20();
    const m12 = this.get01() * this.get20() - this.get00() * this.get21();
    const m20 = this.get01() * this.get12() - this.get11() * this.get02();
    const m21 = this.get02() * this.get10() - this.get00() * this.get22();
    const m22 = this.get00() * this.get11() - this.get01() * this.get11();
    this.set00(m00);
    this.set01(m10);
    this.set02(m20);
    this.set10(m01);
    this.set11(m11);
    this.set12(m21);
    this.set20(m02);
    this.set21(m12);
    this.set22(m22);
  }

  /**
   * 计算行列式
   *
   * @returns{Number}
   */
  determinant() {
    return (
      this.get00() * this.get11() * this.get22() +
      this.get01() * this.get12() * this.get20() +
      this.get02() * this.get10() * this.get21() -
      this.get02() * this.get11() * this.get20() -
      this.get01() * this.get10() * this.get22() -
      this.get00() * this.get21() * this.get12()
    );
  }

  /**
   * 矩阵相乘
   *
   * @param {Mat3} mat3
   */
  multiply(mat3) {
    const m00 =
      this.get00() * mat3.get00() +
      this.get10() * mat3.get01() +
      this.get20() * mat3.get02();
    const m01 =
      this.get01() * mat3.get00() +
      this.get11() * mat3.get01() +
      this.get21() * mat3.get02();
    const m02 =
      this.get02() * mat3.get00() +
      this.get12() * mat3.get01() +
      this.get22() * mat3.get02();

    const m10 =
      this.get00() * mat3.get10() +
      this.get10() * mat3.get11() +
      this.get20() * mat3.get12();
    const m11 =
      this.get01() * mat3.get10() +
      this.get11() * mat3.get11() +
      this.get21() * mat3.get12();
    const m12 =
      this.get02() * mat3.get10() +
      this.get12() * mat3.get11() +
      this.get22() * mat3.get12();

    const m20 =
      this.get00() * mat3.get20() +
      this.get10() * mat3.get21() +
      this.get20() * mat3.get22();
    const m21 =
      this.get01() * mat3.get20() +
      this.get11() * mat3.get21() +
      this.get21() * mat3.get22();
    const m22 =
      this.get02() * mat3.get20() +
      this.get12() * mat3.get21() +
      this.get22() * mat3.get22();
    this.set(m00, m01, m02, m10, m11, m12, m20, m21, m22);
  }

  /**
   * 矩阵相加
   *
   */
  add(mat3) {
    this.set00(this.get00() + mat3.get00());
    this.set01(this.get01() + mat3.get01());
    this.set02(this.get02() + mat3.get02());
    this.set10(this.get10() + mat3.get10());
    this.set11(this.get11() + mat3.get11());
    this.set12(this.get12() + mat3.get12());
    this.set20(this.get20() + mat3.get20());
    this.set21(this.get21() + mat3.get21());
    this.set22(this.get22() + mat3.get22());
  }

  exactEquals(mat3) {
    return (
      this.get00() === mat3.get00() &&
      this.get01() === mat3.get01() &&
      this.get02() === mat3.get02() &&
      this.get10() === mat3.get10() &&
      this.get11() === mat3.get11() &&
      this.get12() === mat3.get12() &&
      this.get20() === mat3.get20() &&
      this.get21() === mat3.get21() &&
      this.get22() === mat3.get22()
    );
  }

  equals(mat3) {
    return (
      equals(this.get00(), mat3.get00()) &&
      equals(this.get01(), mat3.get01()) &&
      equals(this.get02(), mat3.get02()) &&
      equals(this.get10(), mat3.get10()) &&
      equals(this.get11(), mat3.get11()) &&
      equals(this.get12(), mat3.get12()) &&
      equals(this.get20(), mat3.get20()) &&
      equals(this.get21(), mat3.get21()) &&
      equals(this.get22(), mat3.get22())
    );
  }

  toString() {
    return `Mat3
[${this.get00()} ${this.get01()} ${this.get02()}
${this.get10()} ${this.get11()} ${this.get12()} 
${this.get20()} ${this.get21()} ${this.get22()}])`;
  }
}
