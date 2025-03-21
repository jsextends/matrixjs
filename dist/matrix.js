(function (global, factory) {
  typeof exports === 'object' && typeof module !== 'undefined' ? factory(exports) :
  typeof define === 'function' && define.amd ? define(['exports'], factory) :
  (global = typeof globalThis !== 'undefined' ? globalThis : global || self, factory(global.matrix = {}));
})(this, (function (exports) { 'use strict';

  /**
   * EPSILON 判断两个数近似相等的误差范围
   */
  const EPSILON = 1e-5;

  /**
   * ARRAY_TYPE 实现矩阵或者向量的内部使用类型
   */
  const ARRAY_TYPE = typeof Float32Array !== "undefined" ? Float32Array : Array;

  /**
   * 对称四舍五入
   * https://www.npmjs.com/package/round-half-up-symmetric#user-content-detailed-background
   * @param {Number} a
   * @returns {Number}
   */
  function round(a) {
    if (a > 0) {
      return Math.round(a);
    }
    return a % 0.5 === 0 ? Math.floor(a) : Math.round(a);
  }

  const degree = Math.PI / 180;

  const radian = 180 / Math.PI;

  /**
   * 弧度转为角度
   *
   * @param {Number} a
   */
  function toRadian(a) {
    return a * degree;
  }

  /**
   * 角度转为弧度
   * @param {Number} a
   */
  function toDegree(a) {
    return a * radian;
  }

  /**
   * 判断2个数是否在允许的误差范围内近似相等
   * @param {Number} a 
   * @param {Number} b 
   * @returns {Boolean}
   */
  function equals(a, b) {
    // Math.max(1.0, Math.abs(a), Math.abs(b)) 是为了动态调整允许的误差范围，确保在不同量级的数值比较中保持合理精度
    return Math.abs(a - b) <= EPSILON * Math.max(1.0, Math.abs(a), Math.abs(b));
  }

  var common = /*#__PURE__*/Object.freeze({
    __proto__: null,
    ARRAY_TYPE: ARRAY_TYPE,
    EPSILON: EPSILON,
    equals: equals,
    round: round,
    toDegree: toDegree,
    toRadian: toRadian
  });

  class Vec3 {
    /**
     * @property {ARRAY_TYPE} _value 分量的数据
     */
    _value = null;

    constructor() {
      this._value = new ARRAY_TYPE(3);
      if (ARRAY_TYPE !== Float32Array) {
        this.set(0, 0, 0);
      }
    }

    /**
     * 使用2个值创建一个三维向量
     *
     * @param {Number} x
     * @param {Number} y
     * @param {Number} z
     * @returns {Vec3}
     */
    static fromValues(x, y, z) {
      let result = new Vec3();
      result.set(x, y, z);
      return result;
    }

    /**
     * 设置三维向量的某个分量的值
     *
     * @param {Number} x
     * @param {Number} y
     * @param {Number} z
     */
    set(x, y, z) {
      this._value[0] = x;
      this._value[1] = y;
      this._value[2] = z;
    }

    /**
     * 获取三维向量的某个分量的值
     *
     * @param {String} component 有效值x|y|z
     * @returns {Number}
     */
    get(component) {
      switch (component) {
        case "x":
          return this._value[0];
        case "y":
          return this._value[1];
        case "z":
          return this._value[2];
        default:
          throw Error("unknown vector component");
      }
    }

    /**
     * 克隆一个三维向量
     *
     * @returns {Vec3}
     */
    clone() {
      return Vec3.fromValues(this.get("x"), this.get("y"), this.get("z"));
    }

    /**
     * 复制另一个三维向量的值
     *
     * @param {Vec3} vec3
     */
    copy(vec3) {
      this.set(vec3.get("x"), vec3.get("y"), vec3.get("z"));
    }

    /**
     * 将三维向量的各个分量向上取整
     */
    ceil() {
      this.set(
        Math.ceil(this.get("x")),
        Math.ceil(this.get("y")),
        Math.ceil(this.get("z"))
      );
    }

    /**
     * 将三维向量的各个分量向下取整
     */
    floor() {
      this.set(
        Math.floor(this.get("x")),
        Math.floor(this.get("y")),
        Math.floor(this.get("z"))
      );
    }

    /**
     * 将三维向量的各个分量四舍五入取整
     */
    round() {
      this.set(round(this.get("x")), round(this.get("y")), round(this.get("z")));
    }

    /**
     * 在两个三维向量中线性插值获得一个三维向量
     *
     * @param {vec3} vec3
     * @param {Number} t
     * @returns {Vec3}
     */
    linerInterpolation(vec3, t) {
      const x = this.get("x") + (vec3.get("x") - this.get("x")) * t;
      const y = this.get("y") + (vec3.get("y") - this.get("y")) * t;
      const z = this.get("z") + (vec3.get("z") - this.get("z")) * t;
      return Vec3.fromValues(x, y, z);
    }

    /**
     * 两个三维向量的各个分量相加
     *
     * @param {Vec3} vec3
     */
    add(vec3) {
      this.set(
        this.get("x") + vec3.get("x"),
        this.get("y") + vec3.get("y"),
        this.get("z") + vec3.get("z")
      );
    }

    /**
     * 两个三维向量的各个分量相减
     *
     * @param {Vec3} vec3
     */
    subtract(vec3) {
      this.set(
        this.get("x") - vec3.get("x"),
        this.get("y") - vec3.get("y"),
        this.get("z") - vec3.get("z")
      );
    }

    /**
     * 缩放一个三维向量
     *
     * @param {Number} ratio
     */
    scale(ratio) {
      this.set(
        this.get("x") * ratio,
        this.get("y") * ratio,
        this.get("z") * ratio
      );
    }

    /**
     * 返回与另一个三维向量的欧几米德距离的平方
     *
     * @param {Vec3} vec3
     * @returns {Number}
     */
    squaredDistance(vec3) {
      const x = this.get("x") - vec3.get("x");
      const y = this.get("y") - vec3.get("y");
      const z = this.get("z") - vec3.get("z");
      return x * x + y * y + z * z;
    }

    /**
     * 返回与另一个三维向量的欧几米德距离的
     *
     * @param {Vec3} vec3
     * @returns {Number}
     */
    distance(vec3) {
      return Math.sqrt(this.squaredDistance(vec3));
    }

    /**
     * 返回三维向量到坐标原点的欧几米德距离的平分
     *
     * @returns {Number}
     */
    squaredLength() {
      const x = this.get("x");
      const y = this.get("y");
      const z = this.get("z");
      return x * x + y * y + z * z;
    }

    /**
     * 返回三维向量到坐标原点的欧几米德距离
     *
     * @returns {Number}
     */
    length() {
      return Math.sqrt(this.squaredLength());
    }

    /**
     * 相反向量
     */
    negate() {
      this.scale(-1);
    }

    /**
     * 倒数向量 各个向量去倒数
     */
    inverse() {
      this.set(1 / this.get("x"), 1 / this.get("y"), 1 / this.get("z"));
    }

    /**
     * 归一化向量,也就是三维向量的长度为1
     */
    normalize() {
      let length = this.length();
      if (length != 0) {
        length = 1 / length;
        this.scale(length);
      } else {
        throw Error("devide zero");
      }
    }

    /**
     * 计算两个向量的点积
     *
     * @param {Vec3} vec3
     * @returns {Number}
     */
    dot(vec3) {
      return (
        this.get("x") * vec3.get("x") +
        this.get("y") * vec3.get("y") +
        this.get("z") * vec3.get("z")
      );
    }

    /**
     * 计算两个向量的叉积
     *
     * @param {Vec3} vec3
     * @returns {Vec3}
     */
    cross(vec3) {
      const x = this.get("y") * vec3.get("z") - this.get("z") * vec3.get("y");
      const y = this.get("z") * vec3.get("x") - this.get("x") * vec3.get("z");
      const z = this.get("x") * vec3.get("y") - this.get("y") * vec3.get("x");
      const result = new Vec3();
      result.set(x, y, z);
      return result;
    }

    /**
     * 向三维向量vec3为坐标原点将向量沿x轴偏移一个角度
     *
     * @param {Vec3} vec3
     * @param {Number} rad
     */
    rotateX(vec3, rad) {
      let p = [];
      let r = [];
      p[0] = this.get("x") - vec3.get("x"); 
      p[1] = this.get("y") - vec3.get("y"); 
      p[2] = this.get("z") - vec3.get("z"); 

      r[0] = p[0]; 
      r[1] = p[1] * Math.cos(rad) - p[2] * Math.sin(rad);
      r[2] = p[1] * Math.sin(rad) + p[2] * Math.cos(rad);
      this.set(r[0] + vec3.get("x"), r[1] + vec3.get("y"), r[2] + vec3.get("z"));
    }

    /**
     * 向三维向量vec3为坐标原点将向量沿y轴偏移一个角度
     *
     * @param {Vec3} vec3
     * @param {Number} rad
     */
    rotateY(vec3, rad) {
      let p = [];
      let r = [];
      p[0] = this.get("x") - vec3.get("x");
      p[1] = this.get("y") - vec3.get("y");
      p[2] = this.get("z") - vec3.get("z");

      r[0] = p[2] * Math.sin(rad) + p[0] * Math.cos(rad);
      r[1] = p[1];
      r[2] = p[2] * Math.cos(rad) - p[0] * Math.sin(rad);

      this.set(r[0] + vec3.get("x"), r[1] + vec3.get("y"), r[2] + vec3.get("z"));
    }

    /**
     * 向三维向量vec3为坐标原点将向量沿z轴偏移一个角度
     *
     * @param {Vec3} vec3
     * @param {Number} rad
     *
     */
    rotateZ(vec3, rad) {
      let p = [];
      let r = [];
      p[0] = this.get("x") - vec3.get("x");
      p[1] = this.get("y") - vec3.get("y");
      p[2] = this.get("z") - vec3.get("z");

      r[0] = p[0] * Math.cos(rad) - p[1] * Math.sin(rad);
      r[1] = p[0] * Math.sin(rad) + p[1] * Math.cos(rad);
      r[2] = p[2];

      this.set(r[0] + vec3.get("x"), r[1] + vec3.get("y"), r[2] + vec3.get("z"));
    }

    /**
     * 获取两个向量之间的夹角
     *
     * @param {Vec3} vec3
     * @returns {Number}
     */
    angle(vec3) {
      const mag = Math.sqrt(this.squaredLength() * vec3.squaredLength());
      const cosine = mag && this.dot(vec3) / mag;
      return Math.acos(Math.min(Math.max(cosine, -1), 1));
    }

    /**
     * 判断两个三维向量是否严格相对
     *
     * @param {Vec3} vec3
     * @returns {Boolean}
     */
    exactEquals(vec3) {
      return (
        this.get("x") === vec3.get("x") &&
        this.get("y") === vec3.get("y") &&
        this.get("z") === vec3.get("z")
      );
    }

    /**
     * 判断两个三维向量是否相对相等，具体实现参考公共部分的equals方法
     *
     * @param {Vec3} vec3
     * @returns {Boolean}
     */
    equals(vec3) {
      return (
        equals(this.get("x"), vec3.get("x")) &&
        equals(this.get("y"), vec3.get("y")) &&
        equals(this.get("z"), vec3.get("z"))
      );
    }

    /**
     * 返回vec3的字符串描述
     *
     * @returns {string}
     */
    toString() {
      return `Vec3(${this.get("x")}, ${this.get("y")}, ${this.get("z")})`;
    }
  }

  class Vec2 {
    /**
     * @property {ARRAY_TYPE} _value 分量的数据
     */
    _value = null;
    constructor() {
      this._value = new ARRAY_TYPE(2);
      if (ARRAY_TYPE !== Float32Array) {
        this.set(0, 0);
      }
    }

    /**
     * 使用2个值创建一个二维向量
     *
     * @method fromValues
     * @param {Number} x
     * @param {Number} y
     * @returns {Vec2}
     */
    static fromValues(x, y) {
      let result = new Vec2();
      result.set(x, y);
      return result;
    }
    /**
     * 设置二维向量的某个分量的值
     *
     * @param {Number} x
     * @param {Number} y
     */
    set(x, y) {
      this._value[0] = x;
      this._value[1] = y;
    }

    /**
     * 获取二维向量的某个分量的值
     *
     * @param {String} component 有效值x|y
     * @returns {Number}
     */
    get(component) {
      switch (component) {
        case "x":
          return this._value[0];
        case "y":
          return this._value[1];
        default:
          throw Error("unknown vector component");
      }
    }
    /**
     * 克隆一个二维向量
     *
     * @returns {Vec2}
     */
    clone() {
      let result = new Vec2();
      result.set(this.get("x"), this.get("y"));
      return result;
    }

    /**
     * 复制另一个二维向量的值
     *
     * @param {Vec2} vec2
     */
    copy(vec2) {
      this.set(vec2.get("x"), vec2.get("y"));
    }

    /**
     * 将二维向量的各个分量取整
     */
    ceil() {
      this.set(Math.ceil(this.get("x")), Math.ceil(this.get("y")));
    }

    /**
     * 将二维向量的各个分量向下取整
     */
    floor() {
      this.set(Math.floor(this.get("x")), Math.floor(this.get("y")));
    }

    /**
     * 将二维向量的各个分量四舍五入取整
     */
    round() {
      this.set(round(this.get("x")), round(this.get("y")));
    }

    /**
     * 在两个二维向量中线性插值获得一个二维向量
     *
     * @param {vec2} vec2
     * @param {Number} t
     * @returns {Vec2}
     */
    linerInterpolation(vec2, t) {
      let result = this.clone();
      result.add(
        Vec2.fromValues(
          (vec2.get("x") - this.get("x")) * t,
          (vec2.get("y") - this.get("y")) * t
        )
      );
      return result;
    }

    /**
     * 两个二维向量的各个分量相加
     * @param {Vec2} vec2
     */
    add(vec2) {
      this.set(this.get("x") + vec2.get("x"), this.get("y") + vec2.get("y"));
    }

    /**
     * 两个二维向量的各个分量相减
     * @param {Vec2} vec2
     */
    subtract(vec2) {
      this.set(this.get("x") - vec2.get("x"), this.get("y") - vec2.get("y"));
    }

    /**
     * 二维向量的数乘运算
     *
     * @param {Number} ratio
     */
    scale(ratio) {
      this.set(this.get("x") * ratio, this.get("y") * ratio);
    }

    /**
     * 返回与另外一个二维向量的欧几米德距离的平方
     *
     * @param {Vec2} vec2
     * @returns {Number}
     */
    squaredDistance(vec2) {
      const x = this.get("x") - vec2.get("x");
      const y = this.get("y") - vec2.get("y");
      return x * x + y * y;
    }

    /**
     * 返回与另外一个二维向量的欧几米德距离
     *
     * @param {Vec2} vec2
     * @returns {Number}
     */
    distance(vec2) {
      return Math.sqrt(this.squaredDistance(vec2));
    }

    /**
     * 返回二维向量到坐标原点的欧几米德距离的平方
     *
     * @returns {Number}
     */
    squaredLength() {
      const x = this.get("x");
      const y = this.get("y");
      return x * x + y * y;
    }

    /**
     * 返回二维向量到坐标原点的欧几米德距离
     *
     * @returns {Number}
     */
    length() {
      return Math.sqrt(this.squaredLength());
    }

    /**
     * 相反向量
     */
    negate() {
      this.scale(-1);
    }

    /**
     * 分量倒数向量 各个向量取倒数
     */
    inverse() {
      if (this.get("x") && this.get("y")) {
        this.set(1 / this.get("x"), 1 / this.get("y"));
      } else {
        throw Error("devide zero");
      }
    }

    /**
     * 归一化向量,也就是二维向量的模长为1
     */
    normalize() {
      let length = this.length();
      if (length != 0) {
        length = 1 / length;
        this.scale(length);
      } else {
        throw Error("devide zero");
      }
    }

    /**
     * 计算两个向量的点积
     *
     * @param {Vec2} vec2
     * @returns {Number}
     */
    dot(vec2) {
      return this.get("x") * vec2.get("x") + this.get("y") * vec2.get("y");
    }

    /**
     * 计算两个向量的叉积
     *
     * @param {Vec2} vec2
     * @returns {Vec3}
     */
    cross(vec2) {
      const z = this.get("x") * vec2.get("y") - this.get("y") * vec2.get("x");
      const result = new Vec3();
      result.set(0, 0, z);
      return result;
    }

    /**
     * 向二维向量vec2为坐标原点将向量偏移一个角度
     *
     * @param {Vec2} vec2
     * @param {Number} rad
     */
    rotate(vec2, rad) {
      let x = this.get("x") - vec2.get("x");
      let y = this.get("y") - vec2.get("y");
      const sinC = Math.sin(rad);
      const cosC = Math.cos(rad);
      x = x * cosC - y * sinC + vec2.get("x");
      y = y * sinC + x * cosC + vec2.get("y");
      let result = new Vec2();
      result.set(x, y);
      return result;
    }

    /**
     * 获取两个向量之间的夹角
     *
     * @param {Vec2} vec2
     * @returns {Number}
     */
    angle(vec2) {
      const mag = Math.sqrt(this.squaredLength() * vec2.squaredLength());
      const cosine = mag && this.dot(vec2) / mag;
      return Math.acos(Math.min(Math.max(cosine, -1), 1));
    }

    /**
     * 判断2个二维向量是否严格相对
     *
     * @param {Vec2} vec2
     * @returns {Boolean}
     */
    exactEquals(vec2) {
      return this.get("x") === vec2.get("x") && this.get("y") === vec2.get("y");
    }

    /**
     * 判断2个二维向量是否相对相等，具体实现参考公共部分的equals方法
     *
     * @param {Vec2} vec2
     * @returns {Boolean}
     */
    equals(vec2) {
      return (
        equals(this.get("x"), vec2.get("x")) &&
        equals(this.get("y"), vec2.get("y"))
      );
    }

    /**
     * 返回vec2的字符串描述
     *
     * @returns {string}
     */
    toString() {
      return `Vec2(${this.get("x")},${this.get("y")})`;
    }
  }

  class Vec4 {
    /**
     * @property {ARRAY_TYPE} _value 分量的数据
     */
    _value = null;

    constructor() {
      this._value = new ARRAY_TYPE(4);
      if (ARRAY_TYPE !== Float32Array) {
        this.set(0, 0, 0, 0);
      }
    }

    /**
     * 使用四个值创建一个四维向量
     *
     * @param {Number} x
     * @param {Number} y
     * @param {Number} z
     * @param {Number} w
     * @returns {Vec4}
     */
    static fromValues(x, y, z, w) {
      let result = new Vec4();
      result.set(x, y, z, w);
      return result;
    }

    /**
     * 设置四维向量的某个分量的值
     *
     * @param {Number} x
     * @param {Number} y
     * @param {Number} z
     * @param {Number} w
     */
    set(x, y, z, w) {
      this._value[0] = x;
      this._value[1] = y;
      this._value[2] = z;
      this._value[3] = w;
    }
    /**
     * 获取四维向量的某个分量的值
     *
     * @param {String} component 有效值x|y|z|w
     * @returns {Number}
     */
    get(component) {
      switch (component) {
        case "x":
          return this._value[0];
        case "y":
          return this._value[1];
        case "z":
          return this._value[2];
        case "w":
          return this._value[3];
        default:
          throw Error("unknown vector component");
      }
    }

    /**
     * 克隆一个四维向量
     *
     * @returns {Vec4}
     */
    clone() {
      return Vec4.fromValues(
        this.get("x"),
        this.get("y"),
        this.get("z"),
        this.get("w")
      );
    }

    /**
     * 复制另一个四维向量的值
     *
     * @param {Vec4} vec4
     */
    copy(vec4) {
      this.set(vec4.get("x"), vec4.get("y"), vec4.get("z"), vec4.get("w"));
    }

    /**
     * 两个四维向量的各个分量相加
     *
     * @param {Vec4} vec4
     */
    add(vec4) {
      this.set(
        this.get("x") + vec4.get("x"),
        this.get("y") + vec4.get("y"),
        this.get("z") + vec4.get("z"),
        this.get("w") + vec4.get("w")
      );
    }

    /**
     * 两个四维向量的各个分量相减
     *
     * @param {Vec4} vec4
     */
    subtract(vec4) {
      this.set(
        this.get("x") - vec4.get("x"),
        this.get("y") - vec4.get("y"),
        this.get("z") - vec4.get("z"),
        this.get("w") - vec4.get("w")
      );
    }

    /**
     * 缩放一个四维向量
     *
     * @param {Number} ratio
     */
    scale(ratio) {
      this.set(
        this.get("x") * ratio,
        this.get("y") * ratio,
        this.get("z") * ratio,
        this.get("w") * ratio
      );
    }

    /**
     * 将四维向量的各个分量向上取整
     */
    ceil() {
      this.set(
        Math.ceil(this.get("x")),
        Math.ceil(this.get("y")),
        Math.ceil(this.get("z")),
        Math.ceil(this.get("w"))
      );
    }

    /**
     * 将四维向量的各个分量向下取整
     */
    floor() {
      this.set(
        Math.floor(this.get("x")),
        Math.floor(this.get("y")),
        Math.floor(this.get("z")),
        Math.floor(this.get("w"))
      );
    }

    /**
     * 将四维向量的各个分量四舍五入取整
     */
    round() {
      this.set(
        round(this.get("x")),
        round(this.get("y")),
        round(this.get("z")),
        round(this.get("w"))
      );
    }

    /**
     * 在两个四维向量中线性插值获得一个四维向量
     *
     * @param {vec4} vec4
     * @param {Number} t
     * @returns {Vec4}
     */
    linerInterpolation(vec4, t) {
      const x = this.get("x") + (vec4.get("x") - this.get("x")) * t;
      const y = this.get("y") + (vec4.get("y") - this.get("y")) * t;
      const z = this.get("z") + (vec4.get("z") - this.get("z")) * t;
      const w = this.get("w") + (vec4.get("w") - this.get("w")) * t;
      return Vec4.fromValues(x, y, z, w);
    }

    /**
     * 返回两个四维向量的欧几米德距离的平方
     *
     * @param {Vec4} vec4
     * @returns {Number}
     */
    squaredDistance(vec4) {
      const x = this.get("x") - vec4.get("x");
      const y = this.get("y") - vec4.get("y");
      const z = this.get("z") - vec4.get("z");
      const w = this.get("w") - vec4.get("w");
      return x * x + y * y + z * z + w * w;
    }

    /**
     * 返回两个四维向量的欧几米德距离
     *
     * @param {Vec4} vec4
     * @returns {Number}
     */
    distance(vec4) {
      return Math.sqrt(this.squaredDistance(vec4));
    }

    /**
     * 返回四维向量到坐标原点的欧几米德距离的平分
     *
     * @returns {Vec4}
     */
    squaredLength() {
      const x = this.get("x");
      const y = this.get("y");
      const z = this.get("z");
      const w = this.get("w");
      return x * x + y * y + z * z + w * w;
    }

    /**
     * 返回四维向量到坐标原点的欧几米德距离
     *
     * @returns {Vec4}
     */
    length() {
      return Math.sqrt(this.squaredLength());
    }

    /**
     * 相反向量
     */
    negate() {
      this.scale(-1);
    }

    /**
     * 倒数向量 各个向量去倒数
     */
    inverse() {
      this.set(
        1 / this.get("x"),
        1 / this.get("y"),
        1 / this.get("z"),
        1 / this.get("w")
      );
    }

    normalize() {
      let length = this.length();
      if (length != 0) {
        length = 1 / length;
        this.scale(length);
      } else {
        throw Error("devide zero");
      }
    }

    /**
     * 计算两个向量的点积
     *
     * @param {Vec4} vec4
     * @returns {Number}
     */
    dot(vec4) {
      return (
        this.get("x") * vec4.get("x") +
        this.get("y") * vec4.get("y") +
        this.get("z") * vec4.get("z") +
        this.get("w") * vec4.get("w")
      );
    }

    /**
     * 判断2个四维向量是否严格相对
     *
     * @param {Vec4} vec4
     * @returns {boolean}
     */
    exactEquals(vec4) {
      return (
        this.get("x") === vec4.get("x") &&
        this.get("y") === vec4.get("y") &&
        this.get("z") === vec4.get("z") &&
        this.get("w") === vec4.get("w")
      );
    }

    /**
     * 判断2个二维向量是否相对相等，具体实现参考公共部分的equals方法
     *
     * @param {Vec4} vec4
     * @returns {Vec4}
     */
    equals(vec4) {
      return (
        equals(this.get("x"), vec4.get("x")) &&
        equals(this.get("y"), vec4.get("y")) &&
        equals(this.get("z"), vec4.get("z")) &&
        equals(this.get("w"), vec4.get("w"))
      );
    }

    /**
     * 返回vec4的字符串描述
     *
     * @returns {string}
     */
    toString() {
      return `Vec4(${this.get("x")},${this.get("y")},${this.get("z")},${this.get(
      "w"
    )})`;
    }
  }

  let Mat2$1 = class Mat2 {
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
  };

  class Mat3 {
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

    static fromValues(m00, m01, m02, m10, m11, m12, m20, m21, m22) {
      const result = new Mat3();
      this.set(m00, m01, m02, m10, m11, m12, m20, m21, m22);
      return result;
    }

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

    set00(val) {
      this._value[0] = val;
    }

    set01(val) {
      this._value[1] = val;
    }
    set02(val) {
      this._value[2] = val;
    }

    set10(val) {
      this._value[3] = val;
    }

    set11(val) {
      this._value[4] = val;
    }
    set12(val) {
      this._value[5] = val;
    }
    set20(val) {
      this._value[6] = val;
    }

    set21(val) {
      this._value[7] = val;
    }
    set22(val) {
      this._value[8] = val;
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
    get10() {
      return this._value[3];
    }
    get11() {
      return this._value[4];
    }
    get12() {
      return this._value[5];
    }
    get20() {
      return this._value[6];
    }
    get21() {
      return this._value[7];
    }
    get22() {
      return this._value[8];
    }

    clone() {
      const result = new Mat2();
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

    copy(mat2) {
      this.set00(mat2.get00());
      this.set01(mat2.get01());
      this.set02(mat2.get02());
      this.set10(mat2.get10());
      this.set11(mat2.get11());
      this.set12(mat2.get12());
      this.set20(mat2.get20());
      this.set21(mat2.get21());
      this.set22(mat2.get22());
    }

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
      result.set00(m00 * det );
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

    adjugate() {
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
      this.set00(m00);
      this.set01(m10);
      this.set02(m20);
      this.set10(m01);
      this.set11(m11);
      this.set12(m21);
      this.set20(m02);
      this.set21(m12);
      this.set22(m22);
      return result;
    }

    determinant() {
      return (
        this.get00() * this.get11() * this.get22() +
          this.get01() * this.get12() * this.get20() +
          this.get02() * this.get10() * this.get21() -  
          this.get02() * this.get11() * this.get20() -
          this.get01() * this.get10() * this.get21() -
          this.get00() * this.get21() * this.get12()
      );
    }

    multiply(mat3) {
      const m00 = this.get00() * mat3.get00() + this.get10() * mat3.get01() + this.get20() * mat3.get02();
      const m01 = this.get01() * mat3.get00() + this.get11() * mat3.get01() + this.get21() * mat3.get02();
      const m02 = this.get02() * mat2.get00() + this.get12() * mat2.get01() + this.get22() * mat3.get02();
      
      const m10 = this.get00() * mat3.get10() + this.get10() * mat3.get11() + this.get20() * mat3.get12();
      const m11 = this.get01() * mat3.get10() + this.get11() * mat3.get11() + this.get21() * mat3.get12();
      const m12 = this.get02() * mat2.get10() + this.get12() * mat2.get11() + this.get22() * mat3.get12();

      const m20 = this.get00() * mat3.get20() + this.get10() * mat3.get21() + this.get20() * mat3.get22();
      const m21 = this.get01() * mat3.get20() + this.get11() * mat3.get21() + this.get21() * mat3.get22();
      const m22 = this.get02() * mat2.get20() + this.get12() * mat2.get21() + this.get22() * mat3.get22();
      const result = new Mat3();
      result.set(m00, m01, m02, m10, m11, m12, m20, m21, m22);
      return result;
    }

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

    subtract(mat3) {
      this.set00(this.get00() - mat3.get00());
      this.set01(this.get01() - mat3.get01());
      this.set02(this.get02() - mat3.get02());
      this.set10(this.get10() - mat3.get10());
      this.set11(this.get11() - mat3.get11());
      this.set12(this.get12() - mat3.get12());
      this.set20(this.get20() - mat3.get20());
      this.set21(this.get21() - mat3.get21());
      this.set22(this.get22() - mat3.get22());
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

    equals(mat2) {
      return (
        equals(this.get00(), mat2.get00()) &&
        equals(this.get01(), mat2.get01()) &&
        equals(this.get02(), mat2.get02()) &&
        equals(this.get10(), mat2.get10()) &&
        equals(this.get11(), mat2.get11()) &&
        equals(this.get12(), mat2.get12()) &&
        equals(this.get20(), mat2.get20()) &&
        equals(this.get21(), mat2.get21()) &&
        equals(this.get22(), mat2.get22())
      );
    }

    toString() {
      return `Mat3(${this.get00()},${this.get01()},${this.get02()},${this.get10()},${this.get11()},${this.get12()},${this.get20()},${this.get21()},${this.get22()}})`;
    }
  }

  class Mat4 {
    _value = [];

    /**
     * 初始化一个三维矩阵
     *
     * [1,0,0
     *  0,1,0,
     *  0,0,1]
     */
    constructor() {
      this._value = new ARRAY_TYPE(16);
      this.identity();
    }

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
      this.set(
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

    set00(val) {
      this._value[0] = val;
    }

    set01(val) {
      this._value[1] = val;
    }
    set02(val) {
      this._value[2] = val;
    }

    set03(val) {
      this._value[3] = val;
    }

    set10(val) {
      this._value[4] = val;
    }

    set11(val) {
      this._value[5] = val;
    }
    set12(val) {
      this._value[6] = val;
    }
    set13(val) {
      this._value[7] = val;
    }
    set20(val) {
      this._value[8] = val;
    }

    set21(val) {
      this._value[9] = val;
    }
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
      const m00 = Mat3.fromValues(this.get11(), this.get12(), this.get13(), this.get21(), this.get22(), this.get23(),this.get31(), this.get32(), this.get33()).determinant() * det;
      const m01 = -Mat3.fromValues(this.get10(), this.get12(), this.get13(), this.get20(), this.get22(), this.get23(),this.get30(), this.get32(), this.get33()).determinant()* det;
      const m02 = Mat3.fromValues(this.get10(), this.get11(), this.get13(), this.get20(), this.get21(), this.get23(),this.get30(), this.get31(), this.get33()).determinant()* det;
      const m03 = -Mat3.fromValues(this.get10(), this.get11(), this.get12(), this.get20(), this.get21(), this.get21(),this.get30(), this.get31(), this.get32()).determinant()* det;
      
      const m10 = -Mat3.fromValues(this.get01(), this.get02(), this.get03(), this.get21(), this.get22(), this.get23(),this.get31(), this.get32(), this.get33()).determinant()* det;
      const m11 = Mat3.fromValues(this.get00(), this.get02(), this.get03(), this.get20(), this.get22(), this.get23(),this.get30(), this.get32(), this.get33()).determinant()* det;
      const m12 = -Mat3.fromValues(this.get00(), this.get01(), this.get03(), this.get20(), this.get21(), this.get23(),this.get30(), this.get31(), this.get33()).determinant()* det;
      const m13 = Mat3.fromValues(this.get00(), this.get02(), this.get13(), this.get20(), this.get21(), this.get21(),this.get30(), this.get31(), this.get32()).determinant()* det;
     
      const m20 = Mat3.fromValues(this.get01(), this.get02(), this.get03(), this.get11(), this.get12(), this.get13(),this.get31(), this.get32(), this.get33()).determinant()* det;
      const m21 = -Mat3.fromValues(this.get00(), this.get12(), this.get13(), this.get10(), this.get12(), this.get13(),this.get30(), this.get32(), this.get33()).determinant()* det;
      const m22 = Mat3.fromValues(this.get00(), this.get01(), this.get03(), this.get10(), this.get11(), this.get13(),this.get30(), this.get31(), this.get33()).determinant()* det;
      const m23 = -Mat3.fromValues(this.get00(), this.get01(), this.get02(), this.get10(), this.get11(), this.get12(),this.get00(), this.get31(), this.get32()).determinant()* det;
      
      const m30 = -Mat3.fromValues(this.get00(), this.get01(), this.get02(), this.get10(), this.get11(), this.get12(),this.ge20(), this.get21(), this.get22()).determinant()* det;
      const m31 = Mat3.fromValues(this.get00(), this.get02(), this.get03(), this.get10(), this.get12(), this.get13(),this.get20(), this.get22(), this.get23()).determinant()* det;
      const m32 = -Mat3.fromValues(this.get00(), this.get01(), this.get03(), this.get10(), this.get11(), this.get13(),this.get20(), this.get21(), this.get23()).determinant()* det;
      const m33 = Mat3.fromValues(this.get00(), this.get01(), this.get02(), this.get10(), this.get11(), this.get12(),this.get20(), this.get21(), this.get22()).determinant()* det;
      result.set( m00, m01, m02, m03, m10, m11, m12, m13, m20, m21, m22, m23, m30, m31, m32, m33);
      result.transpose();
      return result;
    }

    adjugate() {
      const result = new Mat4();

      const m00 = Mat3.fromValues(this.get11(), this.get12(), this.get13(), this.get21(), this.get22(), this.get23(),this.get31(), this.get32(), this.get33()).determinant();
      const m01 = -Mat3.fromValues(this.get10(), this.get12(), this.get13(), this.get20(), this.get22(), this.get23(),this.get30(), this.get32(), this.get33()).determinant();
      const m02 = Mat3.fromValues(this.get10(), this.get11(), this.get13(), this.get20(), this.get21(), this.get23(),this.get30(), this.get31(), this.get33()).determinant();
      const m03 = -Mat3.fromValues(this.get10(), this.get11(), this.get12(), this.get20(), this.get21(), this.get21(),this.get30(), this.get31(), this.get32()).determinant();
      
      const m10 = -Mat3.fromValues(this.get01(), this.get02(), this.get03(), this.get21(), this.get22(), this.get23(),this.get31(), this.get32(), this.get33()).determinant();
      const m11 = Mat3.fromValues(this.get00(), this.get02(), this.get03(), this.get20(), this.get22(), this.get23(),this.get30(), this.get32(), this.get33()).determinant();
      const m12 = -Mat3.fromValues(this.get00(), this.get01(), this.get03(), this.get20(), this.get21(), this.get23(),this.get30(), this.get31(), this.get33()).determinant();
      const m13 = Mat3.fromValues(this.get00(), this.get02(), this.get13(), this.get20(), this.get21(), this.get21(),this.get30(), this.get31(), this.get32()).determinant();
     
      const m20 = Mat3.fromValues(this.get01(), this.get02(), this.get03(), this.get11(), this.get12(), this.get13(),this.get31(), this.get32(), this.get33()).determinant();
      const m21 = -Mat3.fromValues(this.get00(), this.get12(), this.get13(), this.get10(), this.get12(), this.get13(),this.get30(), this.get32(), this.get33()).determinant();
      const m22 = Mat3.fromValues(this.get00(), this.get01(), this.get03(), this.get10(), this.get11(), this.get13(),this.get30(), this.get31(), this.get33()).determinant();
      const m23 = -Mat3.fromValues(this.get00(), this.get01(), this.get02(), this.get10(), this.get11(), this.get12(),this.get00(), this.get31(), this.get32()).determinant();
      
      const m30 = -Mat3.fromValues(this.get00(), this.get01(), this.get02(), this.get10(), this.get11(), this.get12(),this.ge20(), this.get21(), this.get22()).determinant();
      const m31 = Mat3.fromValues(this.get00(), this.get02(), this.get03(), this.get10(), this.get12(), this.get13(),this.get20(), this.get22(), this.get23()).determinant();
      const m32 = -Mat3.fromValues(this.get00(), this.get01(), this.get03(), this.get10(), this.get11(), this.get13(),this.get20(), this.get21(), this.get23()).determinant();
      const m33 = Mat3.fromValues(this.get00(), this.get01(), this.get02(), this.get10(), this.get11(), this.get12(),this.get20(), this.get21(), this.get22()).determinant();
      result.set( m00, m01, m02, m03, m10, m11, m12, m13, m20, m21, m22, m23, m30, m31, m32, m33);
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

  exports.Common = common;
  exports.Mat2 = Mat2$1;
  exports.Mat3 = Mat3;
  exports.Mat4 = Mat4;
  exports.Vec2 = Vec2;
  exports.Vec3 = Vec3;
  exports.Vec4 = Vec4;

}));
