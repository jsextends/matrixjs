/**
 * EPSILON 判断两个数近似相等的误差范围
 */
export const EPSILON = 1e-5;

/**
 * ARRAY_TYPE 实现矩阵或者向量的内部使用类型
 */
export const ARRAY_TYPE = typeof Float32Array !== "undefined" ? Float32Array : Array;

/**
 * 对称四舍五入
 * https://www.npmjs.com/package/round-half-up-symmetric#user-content-detailed-background
 * @param {Number} a
 * @returns {Number}
 */
export function round(a) {
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
export function toRadian(a) {
  return a * degree;
}

/**
 * 角度转为弧度
 * @param {Number} a
 */
export function toDegree(a) {
  return a * radian;
}

/**
 * 判断2个数是否在允许的误差范围内近似相等
 * @param {Number} a 
 * @param {Number} b 
 * @returns {Boolean}
 */
export function equals(a, b) {
  // Math.max(1.0, Math.abs(a), Math.abs(b)) 是为了动态调整允许的误差范围，确保在不同量级的数值比较中保持合理精度
  return Math.abs(a - b) <= EPSILON * Math.max(1.0, Math.abs(a), Math.abs(b));
}
