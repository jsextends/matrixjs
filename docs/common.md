---
outline: deep
---

# 通用

## 属性

### EPSILON

> 判断两个数近似相等的相对误差范围

```js
const EPSILON = 1e-5;
```

## 方法

### round

> 对称四舍五入， 更多解释见[round-half-up-symmetric](https://www.npmjs.com/package/round-half-up-symmetric#user-content-detailed-background)

```js
round(-20.5)
```

### toRadian

> 弧度转为角度

```js
toRadian(3)
```

### toDegree

> 角度转为弧度

```js
toDegree(Math.PI / 3)
```

### equals

> 判断2个数是否在允许的相对误差范围内近似相等

```JS
export function equals(a, b) {
  // Math.max(1.0, Math.abs(a), Math.abs(b)) 是为了动态调整允许的误差范围，确保在不同量级的数值比较中保持合理精度
  return Math.abs(a - b) <= EPSILON * Math.max(1.0, Math.abs(a), Math.abs(b));
}
```

## 类

### ARRAY_TYPE

> 实现矩阵或者向量的内部使用类型

```js
const ARRAY_TYPE = typeof Float32Array !== "undefined" ? Float32Array : Array;
```
