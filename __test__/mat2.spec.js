const { Vec2, Vec3 } = require("../dist/matrix");

describe("Vec2", () => {
  let vecA, vecB;

  beforeEach(() => {
    vecA = Vec2.fromValues(2, 3);
    vecB = Vec2.fromValues(4, 5);
  });

  describe("测试实例方法", () => {
    test("获取各个分量的值", () => {
      expect(vecA.get("x")).toBe(2);
      expect(vecA.get("y")).toBe(3);
    });

    test("克隆一个二维向量", () => {
      const cloned = vecA.clone();
      expect(cloned.exactEquals(vecA)).toBe(true);
    });

    test("复制向量的值", () => {
      const target = new Vec2();
      target.copy(vecA);
      expect(target.exactEquals(vecA)).toBe(true);
    });
  });

  describe("数学运算", () => {
    test("向量相加", () => {
      vecA.add(vecB);
      expect(vecA.get("x")).toBe(6);
      expect(vecA.get("y")).toBe(8);
    });

    test("向量数乘", () => {
      vecA.scale(2);
      expect(vecA.get("x")).toBe(4);
      expect(vecA.get("y")).toBe(6);
    });

    test("与另外一个二维向量欧几米德距离的平方", () => {
      const distance = vecA.squaredDistance(vecB);
      expect(distance).toBe(8);
    });

    test("与原点的欧几米德距离的平方", () => {
      const distance = vecA.squaredLength();
      expect(distance).toBe(13);
    });

    test("线性插值", () => {
      const interpolated =  vecA.linerInterpolation(vecB, 0.5)
      expect(interpolated.get("x")).toBe(3);
      expect(interpolated.get("y")).toBe(4);
    });
  });

  // 静态方法
  describe("测试非整数", () => {
    test("向上取整", () => {
      const result = Vec2.fromValues(1.2, 3.8)
      result.ceil();
      expect(result.get("x")).toBe(2);
      expect(result.get("y")).toBe(4);
    });
    test("向下取整", () => {
      const result = Vec2.fromValues(1.2, 3.8)
      result.floor();
      expect(result.get("x")).toBe(1);
      expect(result.get("y")).toBe(3);
    });
    test("四舍五入取整", () => {
      const result = Vec2.fromValues(1.2, 3.8)
      result.round();
      expect(result.get("x")).toBe(1);
      expect(result.get("y")).toBe(4);
    });
  });

  // 向量特性
  describe("向量乘积", () => {

    test("点积", () => {
      const dot = vecA.dot(vecB);
      expect(dot).toBe(23); // 8 + 15 = 23
    });

    test("叉积", () => {
      const cross = vecA.cross(vecB);
      expect(cross).toBeInstanceOf(Vec3);
      expect(cross.get("z")).toBe(-2);
    });

  });
});
