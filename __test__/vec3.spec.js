const { Vec3 } = require("../dist/matrix");

describe("Vec3", () => {
  let vecA, vecB;

  beforeEach(() => {
    vecA = Vec3.fromValues(1, 2, 3);
    vecB = Vec3.fromValues(4, 5, 6);
  });

  describe("测试实例方法", () => {
    test("获取各个分量的值", () => {
      expect(vecA.toString()).toBe('Vec3(1, 2, 3)');
    });

    test("克隆一个二维向量", () => {
      const cloned = vecA.clone();
      cloned.set(0, 0, 0);
      expect(vecA.exactEquals(cloned)).toBe(false);
    });

    test('浮点数近似相等测试', () => {
      const vec1 = Vec3.fromValues(0.1 + 0.2, 0, 0);
      const vec3 = Vec3.fromValues(0.3, 0, 0);
      expect(vec1.equals(vec3)).toBe(true);
    })

    test("复制向量的值", () => {
      const target = new Vec3();
      target.copy(vecA);
      expect(target.exactEquals(vecA)).toBe(true);
    });
  });

  describe("数学运算", () => {
    test("向量相加", () => {
      vecA.add(vecB);
      expect(vecA.exactEquals(Vec3.fromValues(5, 7, 9))).toBe(true);
    });

    test("向量数乘", () => {
      vecA.scale(2);
      expect(vecA.exactEquals(Vec3.fromValues(2, 4, 6))).toBe(true);
    });

    test("与另外一个二维向量欧几米德距离的平方", () => {
      const distance = vecA.squaredDistance(vecB);
      expect(distance).toBe(27); 
    });

    test("与原点的欧几米德距离的平方", () => {
      const distance = vecA.squaredLength();
      expect(distance).toBe(14);
    });

    test("线性插值", () => {
      // (1,2,3), (4,5,6)
      const interpolated =  vecA.linerInterpolation(vecB, 0.5)
      expect(interpolated.get("x")).toBeCloseTo(2.5, 1);
      expect(interpolated.get("y")).toBeCloseTo(3.5, 1);
      expect(interpolated.get("z")).toBeCloseTo(4.5, 1);
    });

    test('归一化向量', () => {
      vecA.normalize();
      expect(vecA.length()).toBeCloseTo(1, 5);
    });
  });

  // 静态方法
  describe("测试非整数", () => {
    test("向上取整", () => {
      const result = Vec3.fromValues(1.2, 3.8, 4.6)
      result.ceil();
      expect(result.get("x")).toBe(2);
      expect(result.get("y")).toBe(4);
      expect(result.get("z")).toBe(5);
    });
    test("向下取整", () => {
      const result = Vec3.fromValues(1.2, 3.8, 4.6)
      result.floor();
      expect(result.get("x")).toBe(1);
      expect(result.get("y")).toBe(3);
      expect(result.get("z")).toBe(4);
    });
    test("四舍五入取整", () => {
      const result = Vec3.fromValues(1.2, 3.8, 4.5)
      result.round();
      expect(result.get("x")).toBe(1);
      expect(result.get("y")).toBe(4);
      expect(result.get("z")).toBe(5);
    });
  });

  describe("向量乘积", () => {

    test("点积", () => {
      const dot = vecA.dot(vecB);
      expect(dot).toBe(32);
    });

    test("叉积", () => {
      const cross = vecA.cross(vecB);
      expect(cross).toBeInstanceOf(Vec3);
      expect(cross.get("x")).toBe(-3);
      expect(cross.get("y")).toBe(6);
      expect(cross.get("z")).toBe(-3);
    });

  });

  describe("三维空间操作", () => {

    test("x轴旋转", () => {
      const point = Vec3.fromValues(0, 1, 0);
      point.rotateX(Vec3.fromValues(0, 0, 0), Math.PI/2);
      expect(point.get('y')).toBeCloseTo(0);
      expect(point.get('z')).toBeCloseTo(1);
    });

    test('y轴旋转', () => {
      const point = Vec3.fromValues(1, 0, 0);
      point.rotateY(Vec3.fromValues(0, 0, 1), Math.PI);
      expect(point.get('x')).toBeCloseTo(-1, 5);
      expect(point.get('z')).toBeCloseTo(2, 5);
    });

    test('z轴旋转', () => {
      const originalZ = vecA.get('z');
      vecA.rotateZ(Vec3.fromValues(0, 0, 0), Math.PI/4);
      expect(vecA.get('z')).toBe(originalZ);
    });

  });
});
