---
outline: deep
---

# 四元数

> Quat 类型 **类**

## 初始化一个四元数

```js
const mat4 = new Quat()
```

## 私有属性

| 属性名 | 描述 | 类型 |
| - | - | - |
| _value | 存放四维矩阵各个分量的数据 | [ARRAY_TYPE](./common.md#ARRAY_TYPE) |

## 实例方法

### get

```js
/**
 * 获取四维向量的某个分量的值
 * 
 * @param {string} component 有效值i|j|k|r
 * @returns {Number}
 */
```

### set

```js
/**
 * 设置四维向量的某个分量的值
 * 
 * @param {Number} r 
 * @param {Number} i 
 * @param {Number} j
 * @param {Number} k
 */
```

### identity

```js
/**
 * 标准化四元数
 * 
 */
```

### toString

```js
/**
 * 返回vec4的字符串描述
 * 
 * @returns {string}
 */
```
