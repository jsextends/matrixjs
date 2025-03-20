import { ARRAY_TYPE, equals, round } from "./common";
export default class Vec4 {
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
