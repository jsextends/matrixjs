import { ARRAY_TYPE, equals, round } from "./common";
export default class Vec3 {
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
