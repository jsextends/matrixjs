const { Mat2, Common } = require("../dist/matrix");

describe("Mat2", () => {
  describe("矩阵运算", () => {
    let m1, m2;

    beforeEach(() => {
      m1 = Mat2.fromValues(1, 2, 3, 4);
      m2 = Mat2.fromValues(5, 6, 7, 8);
    });

    test("矩阵转置", () => {
      m1.transpose();
      expect(m1.exactEquals(Mat2.fromValues(1, 3, 2, 4))).toBe(true);
    });

    test("求矩阵的行列式", () => {
      expect(m1.determinant()).toBe(1 * 4 - 2 * 3); // 1*4 - 2*3 = -2
    });

    test("求逆矩阵", () => {
      const singular = Mat2.fromValues(1, 2, 2, 4);
      expect(singular.invert()).toBeNull();
    });

    test("求伴随矩阵", () => {
      const singular = Mat2.fromValues(2, 1, 1, 2).adjugate();
      const mat = Mat2.fromValues(2, -1,-1,2)
      expect(singular.equals(mat)).toBe(true);
    });

    test("逆矩阵和原矩阵相乘等于单位矩阵", () => {
      const original = Mat2.fromValues(4, 3, 3, 2);
      const inverse = original.invert();
      original.multiply(inverse);
      expect(original.equals(new Mat2())).toBe(true);
    });

    test("矩阵乘法不满足交换律", () => {
      const m3 = m1.clone();
      m3.multiply(m2)
      const m4 = m2.clone();
      m4.multiply(m1)
      expect(m3.equals(m4)).toBe(false); // Matrix multiplication is not commutative
    });
  });

  describe("相等检测", () => {
    test("exactEquals", () => {
      const a = Mat2.fromValues(1, 2, 3, 4);
      const b = Mat2.fromValues(1, 2, 3, 4.000300004);
      expect(a.exactEquals(b)).toBe(false);
    });

    test("浮点数相等检测", () => {
      const a = Mat2.fromValues(1, 2, 3, 4);
      const b = Mat2.fromValues(
        1 + Common.EPSILON / 2,
        2 - Common.EPSILON / 2,
        3 + Common.EPSILON / 2,
        4 - Common.EPSILON / 2
      );
      expect(a.equals(b)).toBe(true);
    });

    test("矩阵相加", () => {
      const m = Mat2.fromValues(2, 1, 1, 2);
      const inv = m.invert();
      m.add(inv);
      expect(m.get00()).toBeCloseTo(2 + 2 / 3);
      expect(m.get11()).toBeCloseTo(2 + 2 / 3);
    });
  });

  describe("转字符串", () => {
    test("toString", () => {
      const m = Mat2.fromValues(1, 2, 3, 4);
      expect(m.toString()).toBe(`Mat2
[1 2
3 4]`);
    });
  });
});
