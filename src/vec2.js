import { ARRAY_TYPE, equals, round } from "./common";
import Vec3 from "./vec3";

export default class Vec2 {
  _value = null;
  constructor() {
    this._value = new ARRAY_TYPE(2);
    if (ARRAY_TYPE !== Float32Array) {
      this.set(0,0)
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
    result.set(x,y)
    return result;
  }

  /**
   * 将二维向量的各个分量取整
   * @method ceil
   * @param {Vec2} vec2 
   * @returns {Vec2}
   */
  static ceil(vec2) {
    return Vec2.fromValues(
      Math.ceil(vec2.get("x")),
      Math.ceil(vec2.get("y"))
    );
  }

  static floor(vec2) {
    return Vec2.fromValues(
      Math.floor(vec2.get("x")),
      Math.floor(vec2.get("y"))
    );
  }

  static round(vec2) {
    return Vec2.fromValues(round(vec2.get("x")), round(vec2.get("y")));
  }

  static linerInterpolation(vec2_1, vec2_2, t){
    let result = new Vec2();
    const x = vec2_1.get("x") +  (vec2_2.get("x") - vec2_1.get("x")) * t;
    const y = vec2_1.get("y") +  (vec2_2.get("y") - vec2_1.get("y")) * t;
    result.set(x,y)
    return result
  }

  clone() {
    let result = new Vec2();
    result.set(this.get("x"), this.get("y"))
    return result;
  }

  copy(vec2) {
    this.set(vec2.get("x"), vec2.get("y"));
  }

  get(component){
    switch(component){
      case "x":
        return this._value[0];
      case "y":
        return this._value[1];
      default:
        throw Error("unknown vector component")
    }
  }

  set(x, y) {
    this._value[0] = x;
    this._value[1] = y;
  }

  add(vec2) {
    this.set(this.get("x") + vec2.get("x"), this.get("y") + vec2.get("y"))
  }

  subtract(vec2) {
    this.set(this.get("x") - vec2.get("x"), this.get("y") - vec2.get("y"))
  }

  multiply(vec2) {
    this.set(this.get("x") * vec2.get("x"), this.get("y") * vec2.get("y"))
  }

  divide(vec2) {
    this.set(this.get("x") / vec2.get("x"), this.get("y") / vec2.get("y"))
  }

  scale(ratio) {
    this.set(this.get("x") * ratio, this.get("y") * ratio)
  }

  squaredDistance(vec2) {
    const x = this.get("x") - vec2.get("x");
    const y = this.get("y") - vec2.get("y");
    return x * x + y * y;
  }

  distance(vec2) {
    return Math.sqrt(this.squaredDistance(vec2));
  }

  squaredLength() {
    const x = this.get("x");
    const y = this.get("y");
    return x * x + y * y;
  }

  length() {
    return Math.sqrt(this.squaredLength);
  }

  negate() {
    this.scale(-1);
  }

  inverse() {
    this.set(1 / this.get("x"),  1 / this.get("y"))
  }

  normalize() {
    let length = this.length();
    if (length != 0) {
      length = 1 / length;
    }
    this.scale(length);
  }

  dot(vec2) {
    return this.get("x") * vec2.get("x") + this.get("y") * vec2.get("y");
  }

  cross(vec2) {
    const z = this.get("x") * vec2.get("y") - this.get("y") * vec2.get("x");
    const result = new Vec3();
    result.set(0, 0, z);
    return result;
  }

  rotate(vec2, rad){
    let x = this.get("x") - vec2.get("x")
    let y = this.get("y") - vec2.get("y")
    const sinC = Math.sin(rad)
    const cosC = Math.cos(rad)
    x = x * cosC - y * sinC + vec2.get("x");
    y  = y * sinC + x * cosC + vec2.get("y");
    let result = new Vec2();
    result.set(x, y)
    return result
  }

  /**
   * 获取两个向量之间的夹角
   * 
   * @param {Vec2} vec2 
   * @returns {Number}
   */
  angle(vec2){
    const mag = Math.sqrt(this.squaredLength() * vec2.squaredLength());
    cosine = mag && this.dot(vec2) / mag;
    return Math.acos(Math.min(Math.max(cosine, -1), 1));
  }

  exactEquals(vec2){
    return this.get("x") === vec2.get("x") && this.get("y") === vec2.get("y")
  }

  /**
   * 判断2个二维向量是否相对相等，具体实现参考公共部分的equals方法
   * 
   * @param {Vec2} vec2 
   * 
   * @returns {vec2}
   */
  equals(vec2){
    return equals(this.get("x"), vec2.get("x")) && equals(this.get("y"), vec2.get("y"))
  }

  /**
   * 返回vec2的字符串描述
   * 
   * @returns {string}
   */
  toString(){
    return "vec2(" + this.get("x") + ", " + this.get("y")  + ")";
  }
}
