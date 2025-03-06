import { ARRAY_TYPE, equals, round } from "./common";
export default class Vec4 {
  _value = null;
  constructor() {
    this._value = new ARRAY_TYPE(4);
    if (ARRAY_TYPE !== Float32Array) {
      this.set(0, 0, 0, 0);
    }
  }

  static fromValues(x, y, z, w) {
    let result = new Vec4();
    result.set(x, y, z, w);
    return result;
  }

  static ceil(vec4) {
    return Vec4.fromValues(
      Math.ceil(vec4.get("x")),
      Math.ceil(vec4.get("y")),
      Math.ceil(vec4.get("z")),
      Math.ceil(vec4.get("w"))
    );
  }

  static floor(vec4) {
    return Vec4.fromValues(
      Math.floor(vec4.get("x")),
      Math.floor(vec4.get("y")),
      Math.floor(vec4.get("z")),
      Math.floor(vec4.get("w"))
    );
  }

  static round(vec4) {
    return Vec4.fromValues(
      round(vec4.get("x")),
      round(vec4.get("y")),
      round(vec4.get("z")),
      round(vec4.get("w"))
    );
  }

  static linerInterpolation(vec4_1, vec4_2, t) {
    let result = new Vec4();
    const x = vec4_1.get("x") + (vec4_2.get("x") - vec4_1.get("x")) * t;
    const y = vec4_1.get("y") + (vec4_2.get("y") - vec4_1.get("y")) * t;
    const z = vec4_1.get("z") + (vec4_2.get("z") - vec4_1.get("z")) * t;
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
      case "4": 
        return this._value[3]
      default:
        throw Error("unknown vector component");
    }
  }

  set(x, y, z, w) {
    this._value[0] = x;
    this._value[1] = y;
    this._value[2] = z;
    this._value[4] = w;
  }

  clone() {
    let result = new Vec4();
    result.set(this.get("x"), this.get("y"), this.get("z"), this.get("w"));
    return result;
  }

  copy(vec4) {
    this.set(vec4.get("x"), vec4.get("y"), vec4.get("z"), vec4.get("w"));
  }

  add(vec4) {
    this.set(
      this.get("x") + vec4.get("x"),
      this.get("y") + vec4.get("y"),
      this.get("z") + vec4.get("z"),
      this.get("w") + vec4.get("w")
    );
  }

  subtract(vec4) {
    this.set(
      this.get("x") - vec4.get("x"),
      this.get("y") - vec4.get("y"),
      this.get("z") - vec4.get("z"),
      this.get("w") - vec4.get("w")
    );
  }

  multiply(vec4) {
    this.set(
      this.get("x") * vec4.get("x"),
      this.get("y") * vec4.get("y"),
      this.get("z") * vec4.get("z"),
      this.get("w") * vec4.get("w")
    );
  }

  divide(vec4) {
    this.set(
      this.get("x") / vec4.get("x"),
      this.get("y") / vec4.get("y"),
      this.get("z") / vec4.get("z"),
      this.get("w") / vec4.get("w")
    );
  }

  scale(ratio) {
    this.set(
      this.get("x") * ratio,
      this.get("y") * ratio,
      this.get("z") * ratio,
      this.get("w") * ratio
    );
  }

  squaredDistance(vec4) {
    const x = this.get("x") - vec4.get("x");
    const y = this.get("y") - vec4.get("y");
    const z = this.get("z") - vec4.get("z");
    const w = this.get("w") - vec4.get("w");
    return x * x + y * y + z * z + w * w;
  }

  distance(vec4) {
    return Math.sqrt(this.squaredDistance(vec4));
  }

  squaredLength() {
    const x = this.get("x");
    const y = this.get("y");
    const z = this.get("z");
    const w = this.get("w")
    return x * x + y * y + z * z + w * w;
  }

  length() {
    return Math.sqrt(this.squaredLength());
  }

  negate() {
    this.scale(-1);
  }

  inverse() {
    this.set(1 / this.get("x"), 1 / this.get("y"), 1 / this.get("z"), 1 / this.get("w"));
  }

  normalize() {
    let length = this.length();
    if (length != 0) {
      length = 1 / length;
    }
    this.scale(length);
  }

  dot(vec4) {
    return (
      this.get("x") * vec4.get("x") +
      this.get("y") * vec4.get("y") +
      this.get("z") * vec4.get("z") + 
      this.get("w") * vec4.get("w")
    );
  }

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
    return (
      "vec4(" +
      this.get("x") +
      ", " +
      this.get("y") +
      ", " +
      this.get("z") +
      ", " +
      this.get("w") +
      ")"
    );
  }
}
