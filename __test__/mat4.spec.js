const { Vec4 } = require("../dist/matrix");

describe("Vec4", () => {
  let vecA, vecB;

  beforeEach(() => {
    vecA = Vec4.fromValues(1, 2, 3, 4);
    vecB = Vec4.fromValues(5, 6, 7, 8);
  });

  describe("测试实例方法", () => {
    test("获取各个分量的值", () => {
      expect(vecA.toString()).toBe('Vec4(1,2,3,4)');
      const vec = new Vec4();
      vec.set(0.1, 0.2, 0.3, 0.4);
      expect(vec.get('x')).toBeCloseTo(0.1);
      expect(vec.get('w')).toBeCloseTo(0.4);
    });

    test("克隆一个二维向量", () => {
      const cloned = vecA.clone();
      cloned.set(0, 0, 0, 0);
      expect(vecA.exactEquals(cloned)).toBe(false);
    });

    test("复制向量的值", () => {
      const target = new Vec4();
      target.copy(vecA);
      expect(target.exactEquals(vecA)).toBe(true);
    });

    test('浮点数近似相等测试', () => {
      const vec1 = Vec4.fromValues(0.1 + 0.2, 0, 0, 0);
      const vec3 = Vec4.fromValues(0.3, 0, 0, 0);
      expect(vec1.equals(vec3)).toBe(true);
    })
  });

  describe("数学运算", () => {
    test("向量相加", () => {
      vecA.add(vecB);
      expect(vecA.exactEquals(Vec4.fromValues(6, 8, 10, 12))).toBe(true);
    });

    test("向量数乘", () => {
      vecA.scale(2);
      expect(vecA.exactEquals(Vec4.fromValues(2, 4, 6, 8))).toBe(true);
    });

    test("与另外一个二维向量欧几米德距离的平方", () => {
      const distance = vecA.squaredDistance(vecB);
      expect(distance).toBe(64); 
    });

    test("与原点的欧几米德距离的平方", () => {
      const distance = vecA.squaredLength();
      expect(distance).toBe(30);
    });

    test("线性插值", () => {
      const result = vecA.linerInterpolation(vecB, 0.5);
      expect(result.exactEquals(Vec4.fromValues(3, 4, 5, 6))).toBe(true);
    });

    test('归一化向量', () => {
      vecA.normalize();
      expect(vecA.length()).toBeCloseTo(1, 5);
    });

    test('倒数向量', () => {
      vecA.inverse();
      expect(vecA.get('x')).toBe(1);
      expect(vecA.get('y')).toBe(0.5);
      expect(vecA.get('z')).toBeCloseTo(0.3333, 4);
      expect(vecA.get('w')).toBe(0.25);
    });
  });

  // 静态方法
  describe("测试非整数", () => {
    test("浮点数相等", () => {
      const vec1 = Vec4.fromValues(0.1 + 0.2, 0, 0, 0.3 + 0.4);
      const vec2 = Vec4.fromValues(0.3, 0, 0, 0.7);
      expect(vec1.equals(vec2)).toBe(true);
    });
    test("四舍五入取整", () => {
      const vec = Vec4.fromValues(1.2, 2.5, 3.7, 4.4);
      vec.round();
      expect(vec.exactEquals(Vec4.fromValues(1, 3, 4, 4))).toBe(true);
    });
  });

  describe("向量乘积", () => {

    test("点积", () => {
      const dot = vecA.dot(vecB);
      expect(dot).toBe(70);
    });

  });
});
