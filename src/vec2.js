import { ARRAY_TYPE, equals, round } from "./common";
import Vec3 from "./vec3";

export default class Vec2 {
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
