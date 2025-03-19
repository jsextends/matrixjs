---
outline: deep
---

# 三维矩阵

> Mat3 类型 **类**

## 初始化一个三维单位矩阵

```js
const mat3 = new Mat3()
```

## 私有属性

| 属性名 | 描述 | 类型 |
| - | - | - |
| _value | 存放三维矩阵各个分量的数据 | [ARRAY_TYPE](./common.md#ARRAY_TYPE) |

## 静态方法

### fromValues

```js
/**
 * 使用9个值创建一个三维矩阵
 * 
 * @param {Number} m00 
 * @param {Number} m01
 * @param {Number} m02 
 * @param {Number} m10 
 * @param {Number} m11 
 * @param {Number} m12
 * @param {Number} m20
 * @param {Number} m21 
 * @param {Number} m22
 * @returns {Mat3}
 */
```

## 实例方法

### get00

```js
/**
 * 获取三维矩阵的第一行第一列的值
 * 
 * @returns {Number}
 */
```

### get01

```js
/**
 * 获取三维矩阵的第一行第二列的值
 * 
 * @returns {Number}
 */
```

### get02

```js
/**
 * 获取三维矩阵的第一行第三列的值
 * 
 * @returns {Number}
 */
```

### get10

```js
/**
 * 获取三维矩阵的第二行第一列的值
 * 
 * @returns {Number}
 */
```

### get11

```js
/**
 * 获取三维矩阵的第二行第二列的值
 * 
 * @returns {Number}
 */
```

### get12

```js
/**
 * 获取三维矩阵的第二行第三列的值
 * 
 * @returns {Number}
 */
```

### get20

```js
/**
 * 获取三维矩阵的第三行第一列的值
 * 
 * @returns {Number}
 */
```

### get21

```js
/**
 * 获取三维矩阵的第三行第二列的值
 * 
 * @returns {Number}
 */
```

### get22

```js
/**
 * 获取三维矩阵的第三行第三列的值
 * 
 * @returns {Number}
 */
```

### set00

```js
/**
 * 设置三维矩阵的第一行第一列的值
 * 
 * @param {Number} val
 */
```

### set01

```js
/**
 * 设置三维矩阵的第一行第二列的值
 * 
 * @param {Number} val
 */
```

### set02

```js
/**
 * 设置三维矩阵的第一行第三列的值
 * 
 * @param {Number} val
 */
```

### set10

```js
/**
 * 设置三维矩阵的第二行第一列的值
 * 
 * @param {Number} val
 */
```

### set11

```js
/**
 * 设置三维矩阵的第二行第二列的值
 * 
 * @param {Number} val
 */
```

### set12

```js
/**
 * 设置三维矩阵的第二行第三列的值
 * 
 * @param {Number} val
 */
```

### set20

```js
/**
 * 设置三维矩阵的第三行第一列的值
 * 
 * @param {Number} val
 */
```

### set21

```js
/**
 * 设置三维矩阵的第三行第二列的值
 * 
 * @param {Number} val
 */
```

### set22

```js
/**
 * 设置三维矩阵的第三行第三列的值
 * 
 * @param {Number} val
 */
```

### set

```js
/**
 * 设置三维矩阵的值
 * 
 * @param {Number} m00 
 * @param {Number} m01
 * @param {Number} m02 
 * @param {Number} m10 
 * @param {Number} m11 
 * @param {Number} m12
 * @param {Number} m20
 * @param {Number} m21 
 * @param {Number} m22
 */
```

### identity

```js
/**
 * 设置三维矩阵为单位矩阵（对眼矩阵）
 * 
 */
```

### clone

```js
/**
 * 克隆一个三维矩阵
 * 
 * @returns {Mat3}
 */
```

### copy

```js
/**
 * 复制另一个三维矩阵的值
 * 
 * @param {Mat3} Mat3
 */
```

### transpose

```js
/**
 * 矩阵转置
 * 
 * @returns{Mat3|null}
 */
```

> 之前的行转为列，列转为行

### invert

```js
/**
 * 求逆矩阵
 * 
 */
```

### adjugate

```js
/**
 * 伴随矩阵
 * 
 * @returns{Mat3|null}
 */
```

### determinant

```js
/**
 * 计算行列式
 * 
 * @returns{Number}
 */
```

> 对于三维矩阵，行列式的值为主对角线积减去副对角线的积

### multiply

```js
/**
 * 矩阵相乘
 * 
 * @param {Mat3} mat3
 */
```

### subtract

```js
/**
 * 矩阵相减
 * 
 */
```

### add

```js
/**
 * 矩阵相加
 * 
 */
```

### exactEquals

```js
/**
 * 判断2个三维矩阵是否严格相对
 * 
 * @param {Mat3} mat3 
 * @returns {Boolean}
 */
```

### equals

```js
/**
 * 判断2个三维矩阵是否相对相等，具体实现参考公共部分的equals方法
 * 
 * @param {Mat3} mat3 
 * @returns {Boolean}
 */
```

### toString

```js
/**
 * 以字符串显示
 * 
 * @returns{String}
 */
```
