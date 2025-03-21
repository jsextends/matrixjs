const { Common } = require("../dist/matrix");

describe("Common", () => {

  describe("round", () => {
    test('整数', () => {
      expect(Common.round(1.4)).toBe(1);
      expect(Common.round(1.5)).toBe(2);
      expect(Common.round(2.5)).toBe(3);
    });

    test('负数', () => {
      expect(Common.round(-1.4)).toBe(-1);
      expect(Common.round(-1.5)).toBe(-2);
      expect(Common.round(-2.5)).toBe(-3);
      expect(Common.round(-1.6)).toBe(-2);
    });

    test("边界", () => {
      expect(Common.round(0)).toBe(0);
      expect(Common.round(-0.5)).toBe(-1);
      expect(Common.round(0.5)).toBe(1);
    });
  });

  describe("toRadian", () => {
    test('弧度转角度', () => {
      expect(Common.toRadian(180)).toBe(Math.PI);
      expect(Common.toRadian(90)).toBeCloseTo(Math.PI / 2);
      expect(Common.toRadian(45)).toBeCloseTo(Math.PI / 4);
      expect(Common.toRadian(0)).toBe(0);
    });
  });

  describe('toDegree', () => {
    test('角度转弧度', () => {
      expect(Common.toDegree(Math.PI)).toBe(180);
      expect(Common.toDegree(Math.PI / 2)).toBeCloseTo(90);
      expect(Common.toDegree(Math.PI / 4)).toBeCloseTo(45);
      expect(Common.toDegree(0)).toBe(0);
    });
  });

  describe('相等', () => {
    test('对于epsilon内的相等值返回true', () => {
      expect(Common.equals(1.0, 1.0)).toBe(true);
      expect(Common.equals(1.0, 1.0 + 0.9e-5)).toBe(true);
      expect(Common.equals(1.0, 1.0 - 0.9e-5)).toBe(true);
      expect(Common.equals(10000, 10000.1)).toBe(true);
      expect(Common.equals(0, 1e-5)).toBe(true); // 0 vs 0.00001 within 1e-5 tolerance
    });
  
    test('对于超过epsilon的值返回false', () => {
      expect(Common.equals(1.0, 1.0 + 1.1e-5)).toBe(false);
      expect(Common.equals(1.0, 1.0 - 1.1e-5)).toBe(false);
      expect(Common.equals(10000, 10000.2)).toBe(false);
      expect(Common.equals(0, 1.1e-5)).toBe(false);
    });
  
    test('处理小值', () => {
      expect(Common.equals(0.00001, 0.00002)).toBe(true); // 0.00001 difference <= 1e-5
      expect(Common.equals(0.000001, 0.000002)).toBe(true); // 0.000001 difference <= 1e-5
    });
  
    test('处理大值', () => {
      const largeValue = 1e6;
      expect(Common.equals(largeValue, largeValue + 10)).toBe(true); // 10 <= 1e-5 * 1e6 = 10
      expect(Common.equals(largeValue, largeValue + 10.1)).toBe(false); // 10.1 > 10
    });
  });
});
