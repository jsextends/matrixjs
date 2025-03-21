import { ARRAY_TYPE, equals } from "./common";
import Mat3 from "./mat3";

export default class Mat4 {
  /**
   * @property {ARRAY_TYPE} _value 分量的数据
   */
  _value = [];

  /**
   * 初始化一个四维矩阵
   *
   * [1,0,0,0
   *  0,1,0,0
   *  0,0,1,0
   *  0,0,0,1]
   */
  constructor() {
    this._value = new ARRAY_TYPE(16);
    this.identity();
  }

  /**
   * 使用16个值创建一个四维矩阵
   *
   * @param {Number} m00
   * @param {Number} m01
   * @param {Number} m02
   * @param {Number} m03
   * @param {Number} m10
   * @param {Number} m11
   * @param {Number} m12
   * @param {Number} m13
   * @param {Number} m20
   * @param {Number} m21
   * @param {Number} m22
   * @param {Number} m23
   * @param {Number} m30
   * @param {Number} m31
   * @param {Number} m32
   * @param {Number} m33
   *
   * @returns {Mat4}
   */
  static fromValues(
    m00,
    m01,
    m02,
    m03,
    m10,
    m11,
    m12,
    m13,
    m20,
    m21,
    m22,
    m23,
    m30,
    m31,
    m32,
    m33
  ) {
    const result = new Mat4();
    result.set(
      m00,
      m01,
      m02,
      m03,
      m10,
      m11,
      m12,
      m13,
      m20,
      m21,
      m22,
      m23,
      m30,
      m31,
      m32,
      m33
    );
    return result;
  }

  /**
   * 设置四维矩阵的值
   *
   * @param {Number} m00
   * @param {Number} m01
   * @param {Number} m02
   * @param {Number} m03
   * @param {Number} m10
   * @param {Number} m11
   * @param {Number} m12
   * @param {Number} m13
   * @param {Number} m20
   * @param {Number} m21
   * @param {Number} m22
   * @param {Number} m23
   * @param {Number} m30
   * @param {Number} m31
   * @param {Number} m32
   * @param {Number} m33
   */
  set(
    m00,
    m01,
    m02,
    m03,
    m10,
    m11,
    m12,
    m13,
    m20,
    m21,
    m22,
    m23,
    m30,
    m31,
    m32,
    m33
  ) {
    this.set00(m00);
    this.set01(m01);
    this.set02(m02);
    this.set03(m03);
    this.set10(m10);
    this.set11(m11);
    this.set12(m12);
    this.set13(m13);
    this.set20(m20);
    this.set21(m21);
    this.set22(m22);
    this.set23(m23);
    this.set30(m30);
    this.set31(m31);
    this.set32(m32);
    this.set33(m33);
  }

  /**
   * 设置四维矩阵的第一行第一列的值
   *
   * @param {Number} val
   */
  set00(val) {
    this._value[0] = val;
  }

  /**
   * 设置四维矩阵的第一行第二列的值
   *
   * @param {Number} val
   */
  set01(val) {
    this._value[1] = val;
  }

  /**
   * 设置四维矩阵的第一行第三列的值
   *
   * @param {Number} val
   */
  set02(val) {
    this._value[2] = val;
  }

  /**
   * 设置四维矩阵的第一行第四列的值
   *
   * @param {Number} val
   */
  set03(val) {
    this._value[3] = val;
  }

  /**
   * 设置四维矩阵的第二行第一列的值
   *
   * @param {Number} val
   */
  set10(val) {
    this._value[4] = val;
  }

  /**
   * 设置四维矩阵的第二行第二列的值
   *
   * @param {Number} val
   */
  set11(val) {
    this._value[5] = val;
  }

  /**
   * 设置四维矩阵的第二行第三列的值
   *
   * @param {Number} val
   */
  set12(val) {
    this._value[6] = val;
  }

  /**
   * 设置四维矩阵的第二行第四列的值
   *
   * @param {Number} val
   */
  set13(val) {
    this._value[7] = val;
  }

  /**
 * 设置四维矩阵的第三行第一列的值
 * 
 * @param {Number} val
 */
  set20(val) {
    this._value[8] = val;
  }

  /**
 * 设置四维矩阵的第三行第二列的值
 * 
 * @param {Number} val
 */
  set21(val) {
    this._value[9] = val;
  }

  /**
 * 设置四维矩阵的第三行第三列的值
 * 
 * @param {Number} val
 */
  set22(val) {
    this._value[10] = val;
  }

  set23(val) {
    this._value[11] = val;
  }
  set30(val) {
    this._value[12] = val;
  }
  set31(val) {
    this._value[13] = val;
  }
  set32(val) {
    this._value[14] = val;
  }

  set33(val) {
    this._value[15] = val;
  }

  get00() {
    return this._value[0];
  }

  get01() {
    return this._value[1];
  }
  get02() {
    return this._value[2];
  }

  get03() {
    return this._value[3];
  }

  get10() {
    return this._value[4];
  }

  get11() {
    return this._value[5];
  }
  get12() {
    return this._value[6];
  }
  get13() {
    return this._value[7];
  }
  get20() {
    return this._value[8];
  }

  get21() {
    return this._value[9];
  }
  get22() {
    return this._value[10];
  }

  get23() {
    return this._value[11];
  }
  get30() {
    return this._value[12];
  }
  get31() {
    return this._value[13];
  }
  get32() {
    return this._value[14];
  }

  get33() {
    return this._value[15];
  }

  clone() {
    const result = new Mat4();
    result.set00(this.get00());
    result.set01(this.get01());
    result.set02(this.get02());
    result.set03(this.get03());
    result.set10(this.get10());
    result.set11(this.get11());
    result.set12(this.get12());
    result.set13(this.get13());
    result.set20(this.get20());
    result.set21(this.get21());
    result.set22(this.get22());
    result.set23(this.get23());
    result.set30(this.get30());
    result.set31(this.get31());
    result.set32(this.get32());
    result.set33(this.get33());
    return result;
  }

  copy(mat4) {
    this.set00(mat4.get00());
    this.set01(mat4.get01());
    this.set02(mat4.get02());
    this.set03(mat4.get03());
    this.set10(mat4.get10());
    this.set11(mat4.get11());
    this.set12(mat4.get12());
    this.set13(mat4.get13());
    this.set20(mat4.get20());
    this.set21(mat4.get21());
    this.set22(mat4.get22());
    this.set23(mat4.get23());
    this.set30(mat4.get30());
    this.set31(mat4.get31());
    this.set32(mat4.get32());
    this.set33(mat4.get33());
  }

  identity() {
    this.set00(1);
    this.set01(0);
    this.set02(0);
    this.set03(0);
    this.set10(0);
    this.set11(1);
    this.set12(0);
    this.set13(0);
    this.set20(0);
    this.set21(0);
    this.set22(1);
    this.set23(0);
    this.set30(0);
    this.set31(0);
    this.set32(0);
    this.set33(1);
  }

  transpose() {
    const m01 = this.get01();
    const m02 = this.get02();
    const m03 = this.get03();
    const m10 = this.get10();
    const m12 = this.get12();
    const m13 = this.get13();
    const m20 = this.get20();
    const m21 = this.get21();
    const m23 = this.get23();
    const m30 = this.get30();
    const m31 = this.get31();
    const m32 = this.get32();
    this.set01(m10);
    this.set02(m20);
    this.set03(m30);
    this.set10(m01);
    this.set12(m21);
    this.set13(m31);
    this.set20(m02);
    this.set21(m12);
    this.set23(m32);
    this.set30(m03);
    this.set31(m13);
    this.set32(m23);
  }

  invert() {
    let det = this.determinant();

    if (!det) {
      return null;
    }
    det = 1 / det;
    const result = new Mat4();
    const m00 =
      Mat3.fromValues(
        this.get11(),
        this.get12(),
        this.get13(),
        this.get21(),
        this.get22(),
        this.get23(),
        this.get31(),
        this.get32(),
        this.get33()
      ).determinant() * det;
    const m01 =
      -Mat3.fromValues(
        this.get10(),
        this.get12(),
        this.get13(),
        this.get20(),
        this.get22(),
        this.get23(),
        this.get30(),
        this.get32(),
        this.get33()
      ).determinant() * det;
    const m02 =
      Mat3.fromValues(
        this.get10(),
        this.get11(),
        this.get13(),
        this.get20(),
        this.get21(),
        this.get23(),
        this.get30(),
        this.get31(),
        this.get33()
      ).determinant() * det;
    const m03 =
      -Mat3.fromValues(
        this.get10(),
        this.get11(),
        this.get12(),
        this.get20(),
        this.get21(),
        this.get21(),
        this.get30(),
        this.get31(),
        this.get32()
      ).determinant() * det;

    const m10 =
      -Mat3.fromValues(
        this.get01(),
        this.get02(),
        this.get03(),
        this.get21(),
        this.get22(),
        this.get23(),
        this.get31(),
        this.get32(),
        this.get33()
      ).determinant() * det;
    const m11 =
      Mat3.fromValues(
        this.get00(),
        this.get02(),
        this.get03(),
        this.get20(),
        this.get22(),
        this.get23(),
        this.get30(),
        this.get32(),
        this.get33()
      ).determinant() * det;
    const m12 =
      -Mat3.fromValues(
        this.get00(),
        this.get01(),
        this.get03(),
        this.get20(),
        this.get21(),
        this.get23(),
        this.get30(),
        this.get31(),
        this.get33()
      ).determinant() * det;
    const m13 =
      Mat3.fromValues(
        this.get00(),
        this.get02(),
        this.get13(),
        this.get20(),
        this.get21(),
        this.get21(),
        this.get30(),
        this.get31(),
        this.get32()
      ).determinant() * det;

    const m20 =
      Mat3.fromValues(
        this.get01(),
        this.get02(),
        this.get03(),
        this.get11(),
        this.get12(),
        this.get13(),
        this.get31(),
        this.get32(),
        this.get33()
      ).determinant() * det;
    const m21 =
      -Mat3.fromValues(
        this.get00(),
        this.get12(),
        this.get13(),
        this.get10(),
        this.get12(),
        this.get13(),
        this.get30(),
        this.get32(),
        this.get33()
      ).determinant() * det;
    const m22 =
      Mat3.fromValues(
        this.get00(),
        this.get01(),
        this.get03(),
        this.get10(),
        this.get11(),
        this.get13(),
        this.get30(),
        this.get31(),
        this.get33()
      ).determinant() * det;
    const m23 =
      -Mat3.fromValues(
        this.get00(),
        this.get01(),
        this.get02(),
        this.get10(),
        this.get11(),
        this.get12(),
        this.get00(),
        this.get31(),
        this.get32()
      ).determinant() * det;

    const m30 =
      -Mat3.fromValues(
        this.get00(),
        this.get01(),
        this.get02(),
        this.get10(),
        this.get11(),
        this.get12(),
        this.ge20(),
        this.get21(),
        this.get22()
      ).determinant() * det;
    const m31 =
      Mat3.fromValues(
        this.get00(),
        this.get02(),
        this.get03(),
        this.get10(),
        this.get12(),
        this.get13(),
        this.get20(),
        this.get22(),
        this.get23()
      ).determinant() * det;
    const m32 =
      -Mat3.fromValues(
        this.get00(),
        this.get01(),
        this.get03(),
        this.get10(),
        this.get11(),
        this.get13(),
        this.get20(),
        this.get21(),
        this.get23()
      ).determinant() * det;
    const m33 =
      Mat3.fromValues(
        this.get00(),
        this.get01(),
        this.get02(),
        this.get10(),
        this.get11(),
        this.get12(),
        this.get20(),
        this.get21(),
        this.get22()
      ).determinant() * det;
    result.set(
      m00,
      m01,
      m02,
      m03,
      m10,
      m11,
      m12,
      m13,
      m20,
      m21,
      m22,
      m23,
      m30,
      m31,
      m32,
      m33
    );
    result.transpose();
    return result;
  }

  adjugate() {
    const result = new Mat4();

    const m00 = Mat3.fromValues(
      this.get11(),
      this.get12(),
      this.get13(),
      this.get21(),
      this.get22(),
      this.get23(),
      this.get31(),
      this.get32(),
      this.get33()
    ).determinant();
    const m01 = -Mat3.fromValues(
      this.get10(),
      this.get12(),
      this.get13(),
      this.get20(),
      this.get22(),
      this.get23(),
      this.get30(),
      this.get32(),
      this.get33()
    ).determinant();
    const m02 = Mat3.fromValues(
      this.get10(),
      this.get11(),
      this.get13(),
      this.get20(),
      this.get21(),
      this.get23(),
      this.get30(),
      this.get31(),
      this.get33()
    ).determinant();
    const m03 = -Mat3.fromValues(
      this.get10(),
      this.get11(),
      this.get12(),
      this.get20(),
      this.get21(),
      this.get21(),
      this.get30(),
      this.get31(),
      this.get32()
    ).determinant();

    const m10 = -Mat3.fromValues(
      this.get01(),
      this.get02(),
      this.get03(),
      this.get21(),
      this.get22(),
      this.get23(),
      this.get31(),
      this.get32(),
      this.get33()
    ).determinant();
    const m11 = Mat3.fromValues(
      this.get00(),
      this.get02(),
      this.get03(),
      this.get20(),
      this.get22(),
      this.get23(),
      this.get30(),
      this.get32(),
      this.get33()
    ).determinant();
    const m12 = -Mat3.fromValues(
      this.get00(),
      this.get01(),
      this.get03(),
      this.get20(),
      this.get21(),
      this.get23(),
      this.get30(),
      this.get31(),
      this.get33()
    ).determinant();
    const m13 = Mat3.fromValues(
      this.get00(),
      this.get02(),
      this.get13(),
      this.get20(),
      this.get21(),
      this.get21(),
      this.get30(),
      this.get31(),
      this.get32()
    ).determinant();

    const m20 = Mat3.fromValues(
      this.get01(),
      this.get02(),
      this.get03(),
      this.get11(),
      this.get12(),
      this.get13(),
      this.get31(),
      this.get32(),
      this.get33()
    ).determinant();
    const m21 = -Mat3.fromValues(
      this.get00(),
      this.get12(),
      this.get13(),
      this.get10(),
      this.get12(),
      this.get13(),
      this.get30(),
      this.get32(),
      this.get33()
    ).determinant();
    const m22 = Mat3.fromValues(
      this.get00(),
      this.get01(),
      this.get03(),
      this.get10(),
      this.get11(),
      this.get13(),
      this.get30(),
      this.get31(),
      this.get33()
    ).determinant();
    const m23 = -Mat3.fromValues(
      this.get00(),
      this.get01(),
      this.get02(),
      this.get10(),
      this.get11(),
      this.get12(),
      this.get00(),
      this.get31(),
      this.get32()
    ).determinant();

    const m30 = -Mat3.fromValues(
      this.get00(),
      this.get01(),
      this.get02(),
      this.get10(),
      this.get11(),
      this.get12(),
      this.ge20(),
      this.get21(),
      this.get22()
    ).determinant();
    const m31 = Mat3.fromValues(
      this.get00(),
      this.get02(),
      this.get03(),
      this.get10(),
      this.get12(),
      this.get13(),
      this.get20(),
      this.get22(),
      this.get23()
    ).determinant();
    const m32 = -Mat3.fromValues(
      this.get00(),
      this.get01(),
      this.get03(),
      this.get10(),
      this.get11(),
      this.get13(),
      this.get20(),
      this.get21(),
      this.get23()
    ).determinant();
    const m33 = Mat3.fromValues(
      this.get00(),
      this.get01(),
      this.get02(),
      this.get10(),
      this.get11(),
      this.get12(),
      this.get20(),
      this.get21(),
      this.get22()
    ).determinant();
    result.set(
      m00,
      m01,
      m02,
      m03,
      m10,
      m11,
      m12,
      m13,
      m20,
      m21,
      m22,
      m23,
      m30,
      m31,
      m32,
      m33
    );
    return result;
  }

  determinant() {
    return (
      (this.get00() * this.get11() +
        this.get22() +
        this.get01() * this.get12() * this.get20() +
        this.get02() * this.get10()) &
      (this.get21() -
        this.get02() * this.get11() * this.get20() -
        this.get01() * this.get10() * this.get21() -
        this.get00() * this.get21() * this.get12())
    );
  }

  add(mat4) {
    this.set00(this.get00() + mat4.get00());
    this.set01(this.get01() + mat4.get01());
    this.set02(this.get02() + mat4.get02());
    this.set03(this.get03() + mat4.get03());
    this.set10(this.get10() + mat4.get10());
    this.set11(this.get11() + mat4.get11());
    this.set12(this.get12() + mat4.get12());
    this.set13(this.get12() + mat4.get13());
    this.set20(this.get20() + mat4.get20());
    this.set21(this.get21() + mat4.get21());
    this.set22(this.get22() + mat4.get22());
    this.set23(this.get23() + mat4.get23());
    this.set30(this.get30() + mat4.get30());
    this.set31(this.get31() + mat4.get31());
    this.set32(this.get32() + mat4.get32());
    this.set33(this.get33() + mat4.get33());
  }

  subtract(mat4) {
    this.set00(this.get00() - mat4.get00());
    this.set01(this.get01() - mat4.get01());
    this.set02(this.get02() - mat4.get02());
    this.set03(this.get03() - mat4.get03());
    this.set10(this.get10() - mat4.get10());
    this.set11(this.get11() - mat4.get11());
    this.set12(this.get12() - mat4.get12());
    this.set13(this.get12() - mat4.get13());
    this.set20(this.get20() - mat4.get20());
    this.set21(this.get21() - mat4.get21());
    this.set22(this.get22() - mat4.get22());
    this.set23(this.get23() - mat4.get23());
    this.set30(this.get30() - mat4.get30());
    this.set31(this.get31() - mat4.get31());
    this.set32(this.get32() - mat4.get32());
    this.set33(this.get33() - mat4.get33());
  }

  exactEquals(mat4) {
    return (
      this.get00() === mat4.get00() &&
      this.get01() === mat4.get01() &&
      this.get02() === mat4.get02() &&
      this.get03() === mat4.get03() &&
      this.get10() === mat4.get10() &&
      this.get11() === mat4.get11() &&
      this.get12() === mat4.get12() &&
      this.get13() === mat4.get13() &&
      this.get20() === mat4.get20() &&
      this.get21() === mat4.get21() &&
      this.get22() === mat4.get22() &&
      this.get23() === mat4.get23() &&
      this.get30() === mat4.get30() &&
      this.get31() === mat4.get31() &&
      this.get32() === mat4.get32() &&
      this.get33() === mat4.get33()
    );
  }

  equals(mat4) {
    return (
      equals(this.get00(), mat4.get00()) &&
      equals(this.get01(), mat4.get01()) &&
      equals(this.get02(), mat4.get02()) &&
      equals(this.get03(), mat4.get03()) &&
      equals(this.get10(), mat4.get10()) &&
      equals(this.get11(), mat4.get11()) &&
      equals(this.get12(), mat4.get12()) &&
      equals(this.get13(), mat4.get13()) &&
      equals(this.get20(), mat4.get20()) &&
      equals(this.get21(), mat4.get21()) &&
      equals(this.get22(), mat4.get22()) &&
      equals(this.get23(), mat4.get23()) &&
      equals(this.get30(), mat4.get30()) &&
      equals(this.get31(), mat4.get31()) &&
      equals(this.get32(), mat4.get32()) &&
      equals(this.get33(), mat4.get33())
    );
  }

  toString() {
    return `Mat4(${this.get00()},${this.get01()},${this.get02()},${this.get03()},${this.get10()},${this.get11()},${this.get12()},${this.get13()},${this.get20()},${this.get21()},${this.get22()}${this.get23()},${this.get30()},${this.get31()},${this.get32()}${this.get33()}})`;
  }
}
