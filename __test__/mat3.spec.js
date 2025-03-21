const { Mat3, Common } = require("../dist/matrix");

describe("Mat3", () => {
  describe("矩阵运算", () => {
    let m1, m2;

    beforeEach(() => {
      m1 = Mat3.fromValues(1, 0, 0, 0, 1, 0, 0, 0, 1);
      m2 = Mat3.fromValues(2, 3, 4, 5, 6, 7, 8, 9, 1);
    });

    test("矩阵转置", () => {
      const m = Mat3.fromValues(1, 2, 3, 4, 5, 6, 7, 8, 9);
      m.transpose();
      expect(m.exactEquals(Mat3.fromValues(1, 4, 7, 2, 5, 8, 3, 6, 9))).toBe(
        true
      );
    });

    test("求矩阵的行列式", () => {
      const m = Mat3.fromValues(1, 2, 3, 4, 5, 6, 7, 8, 9);
      expect(m.determinant()).toBe(0); // Singular matrix
    });

    test("求逆矩阵", () => {
      const singular = Mat3.fromValues(1, 2, 3, 4, 5, 6, 7, 8, 9);
      expect(singular.invert()).toBeNull();
    });

    test("求伴随矩阵", () => {
      const singular = Mat3.fromValues(1, 2, 3, 4, 5, 6, 7, 8, 9);
      singular.adjugate()
      const mat = Mat3.fromValues(-3, 6, -3, 6, -12, 6, -3, 6, -3);
      expect(singular.equals(mat)).toBe(true);
    });

    test("逆矩阵和原矩阵相乘等于单位矩阵", () => {
      const original = Mat3.fromValues(4, 3, 2, 1, 3, 1, 2, 4, 2);
      const inverse = original.invert();
      original.multiply(inverse);
      expect(original.equals(new Mat3().identity())).toBe(true);
    });

    test("矩阵乘法不满足交换律", () => {
      const m3 = m1.clone();
      m3.multiply(m2);
      const m4 = m2.clone();
      m4.multiply(m1);
      expect(m3.equals(m4)).toBe(false); // Matrix multiplication is not commutative
    });

    test("矩阵乘法", () => {
      const a = Mat3.fromValues(1, 2, 3, 4, 5, 6, 7, 8, 9);
      const b = Mat3.fromValues(9, 8, 7, 6, 5, 4, 3, 2, 1);
      a.multiply(b);
      expect(
        a.exactEquals(Mat3.fromValues(30, 24, 18, 84, 69, 54, 138, 114, 90))
      ).toBe(true);
    });
  });

  describe("相等检测", () => {
    test("exactEquals", () => {
      const a = Mat3.fromValues(1, 2, 3, 4, 5, 6, 7, 8, 9);
      const b = Mat3.fromValues(1, 2, 3, 4, 5, 6, 7, 8, 9.00300001);
      expect(a.exactEquals(b)).toBe(false);
    });

    test("浮点数相等检测", () => {
      const a = Mat3.fromValues(1, 2, 3, 4, 5, 6, 7, 8, 9);
      const b = Mat3.fromValues(
        1 + Common.EPSILON / 2,
        2 - Common.EPSILON / 2,
        3 + Common.EPSILON / 2,
        4 - Common.EPSILON / 2,
        5 + Common.EPSILON / 2,
        6 - Common.EPSILON / 2,
        7 + Common.EPSILON / 2,
        8 - Common.EPSILON / 2,
        9 + Common.EPSILON / 2
      );
      expect(a.equals(b)).toBe(true);
    });

    test("矩阵相加", () => {
      const m = Mat3.fromValues(2, 0, 0, 0, 2, 0, 0, 0, 2);
      const inv = m.invert();
      m.add(inv);
      expect(m.equals(Mat3.fromValues(2.5, 0, 0, 0, 2.5, 0, 0, 0, 2.5))).toBe(
        true
      );
    });
  });

  describe("转字符串", () => {
    test("toString", () => {
      const m = Mat3.fromValues(1, 2, 3, 4, 5, 6, 7, 8, 9);
      expect(m.toString()).toBe(`Mat3
[1 2 3
4 5 6 
7 8 9])`);
    });
  });
});
