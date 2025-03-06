import { ARRAY_TYPE, equals, round } from "./common";
export default class Vec3 {
  _value = null;
  constructor() {
    this._value = new ARRAY_TYPE(3);
    if (ARRAY_TYPE !== Float32Array) {
      this.set(0, 0, 0);
    }
  }

  static fromValues(x, y, z) {
    let result = new Vec3();
    result.set(x, y, z);
    return result;
  }

  static ceil(vec3) {
    return Vec3.fromValues(
      Math.ceil(vec3.get("x")),
      Math.ceil(vec3.get("y")),
      Math.ceil(vec3.get("z"))
    );
  }

  static floor(vec3) {
    return Vec3.fromValues(
      Math.floor(vec3.get("x")),
      Math.floor(vec3.get("y")),
      Math.floor(vec3.get("z"))
    );
  }

  static round(vec3) {
    return Vec3.fromValues(
      round(vec3.get("x")),
      round(vec3.get("y")),
      round(vec3.get("z"))
    );
  }

  static linerInterpolation(vec3_1, vec3_2, t) {
    let result = new Vec3();
    const x = vec3_1.get("x") + (vec3_2.get("x") - vec3_1.get("x")) * t;
    const y = vec3_1.get("y") + (vec3_2.get("y") - vec3_1.get("y")) * t;
    const z = vec3_1.get("z") + (vec3_2.get("z") - vec3_1.get("z")) * t;
    result.set(x, y, z);
    return result;
  }

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

  set(x, y, z) {
    this._value[0] = x;
    this._value[1] = y;
    this._value[2] = z;
  }

  clone() {
    let result = new Vec3();
    result.set(this.get("x"), this.get("y"), this.get("z"));
    return result;
  }

  copy(vec3) {
    this.set(vec3.get("x"), vec3.get("y"), vec3.get("z"));
  }

  add(vec3) {
    this.set(
      this.get("x") + vec3.get("x"),
      this.get("y") + vec3.get("y"),
      this.get("z") + vec3.get("z")
    );
  }

  subtract(vec3) {
    this.set(
      this.get("x") - vec3.get("x"),
      this.get("y") - vec3.get("y"),
      this.get("z") - vec3.get("z")
    );
  }

  multiply(vec3) {
    this.set(
      this.get("x") * vec3.get("x"),
      this.get("y") * vec3.get("y"),
      this.get("z") * vec3.get("z")
    );
  }

  divide(vec3) {
    this.set(
      this.get("x") / vec3.get("x"),
      this.get("y") / vec3.get("y"),
      this.get("z") / vec3.get("z")
    );
  }

  scale(ratio) {
    this.set(
      this.get("x") * ratio,
      this.get("y") * ratio,
      this.get("z") * ratio
    );
  }

  squaredDistance(vec3) {
    const x = this.get("x") - vec3.get("x");
    const y = this.get("y") - vec3.get("y");
    const z = this.get("z") - vec3.get("z");
    return x * x + y * y + z * z;
  }

  distance(vec3) {
    return Math.sqrt(this.squaredDistance(vec3));
  }

  squaredLength() {
    const x = this.get("x");
    const y = this.get("y");
    const z = this.get("z");
    return x * x + y * y + z * z;
  }

  length() {
    return Math.sqrt(this.squaredLength());
  }

  negate() {
    this.scale(-1);
  }

  inverse() {
    this.set(1 / this.get("x"), 1 / this.get("y"), 1 / this.get("z"));
  }

  normalize() {
    let length = this.length();
    if (length != 0) {
      length = 1 / length;
    }
    this.scale(length);
  }

  dot(vec3) {
    return (
      this.get("x") * vec3.get("x") +
      this.get("y") * vec3.get("y") +
      this.get("z") * vec3.get("z")
    );
  }

  cross(vec3) {
    const x = this.get("y") * vec3.get("z") - this.get("z") * vec3.get("y");
    const y = this.get("z") * vec3.get("x") - this.get("x") * vec3.get("z");
    const z = this.get("x") * vec3.get("y") - this.get("y") * vec3.get("x");
    const result = new Vec3();
    result.set(x, y, z);
    return result;
  }

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

  angle(vec3) {
    const mag = Math.sqrt(this.squaredLength() * vec3.squaredLength());
    cosine = mag && this.dot(vec3) / mag;
    return Math.acos(Math.min(Math.max(cosine, -1), 1));
  }

  exactEquals(vec3) {
    return (
      this.get("x") === vec3.get("x") &&
      this.get("y") === vec3.get("y") &&
      this.get("z") === vec3.get("z")
    );
  }

  /**
   * 判断2个二维向量是否相对相等，具体实现参考公共部分的equals方法
   *
   * @param {Vec3} vec3
   * @returns {Vec3}
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
    return (
      "vec3(" +
      this.get("x") +
      ", " +
      this.get("y") +
      ", " +
      this.get("z") +
      ")"
    );
  }
}
