---
outline: deep
---

# 四维矩阵

> Mat4 类型 **类**

## 初始化一个四维单位矩阵

```js
const mat4 = new Mat4()
```

## 私有属性

| 属性名 | 描述 | 类型 |
| - | - | - |
| _value | 存放四维矩阵各个分量的数据 | [ARRAY_TYPE](./common.md#ARRAY_TYPE) |

## 静态方法

### fromValues

```js
/**
 * 使用9个值创建一个四维矩阵
 * 
 * @param {Number} m00 
 * @param {Number} m01
 * @param {Number} m02
 * @param {Number} m03
 * @param {Number} m10 
 * @param {Number} m11 
 * @param {Number} m12
 * @param {Number} m13
 * @param {Number} m20
 * @param {Number} m21 
 * @param {Number} m22
 * @param {Number} m23
 * @param {Number} m30
 * @param {Number} m31 
 * @param {Number} m32
 * @param {Number} m33
 * @returns {Mat4}
 */
```

## 实例方法

### get00

```js
/**
 * 获取四维矩阵的第一行第一列的值
 * 
 * @returns {Number}
 */
```

### get01

```js
/**
 * 获取四维矩阵的第一行第二列的值
 * 
 * @returns {Number}
 */
```

### get02

```js
/**
 * 获取四维矩阵的第一行第三列的值
 * 
 * @returns {Number}
 */
```

### get04

```js
/**
 * 获取四维矩阵的第一行第四列的值
 * 
 * @returns {Number}
 */
```

### get10

```js
/**
 * 获取四维矩阵的第二行第一列的值
 * 
 * @returns {Number}
 */
```

### get11

```js
/**
 * 获取四维矩阵的第二行第二列的值
 * 
 * @returns {Number}
 */
```

### get12

```js
/**
 * 获取四维矩阵的第二行第三列的值
 * 
 * @returns {Number}
 */
```

### get13

```js
/**
 * 获取四维矩阵的第二行第四列的值
 * 
 * @returns {Number}
 */
```

### get20

```js
/**
 * 获取四维矩阵的第三行第一列的值
 * 
 * @returns {Number}
 */
```

### get21

```js
/**
 * 获取四维矩阵的第三行第二列的值
 * 
 * @returns {Number}
 */
```

### get22

```js
/**
 * 获取四维矩阵的第三行第三列的值
 * 
 * @returns {Number}
 */
```

### get23

```js
/**
 * 获取四维矩阵的第三行第四列的值
 * 
 * @returns {Number}
 */
```

### get30

```js
/**
 * 获取四维矩阵的第四行第一列的值
 * 
 * @returns {Number}
 */
```

### get31

```js
/**
 * 获取四维矩阵的第四行第二列的值
 * 
 * @returns {Number}
 */
```

### get32

```js
/**
 * 获取四维矩阵的第四行第三列的值
 * 
 * @returns {Number}
 */
```

### get33

```js
/**
 * 获取四维矩阵的第四行第四列的值
 * 
 * @returns {Number}
 */
```

### set00

```js
/**
 * 设置四维矩阵的第一行第一列的值
 * 
 * @param {Number} val
 */
```

### set01

```js
/**
 * 设置四维矩阵的第一行第二列的值
 * 
 * @param {Number} val
 */
```

### set02

```js
/**
 * 设置四维矩阵的第一行第三列的值
 * 
 * @param {Number} val
 */
```

### set03

```js
/**
 * 设置四维矩阵的第一行第四列的值
 * 
 * @param {Number} val
 */
```

### set10

```js
/**
 * 设置四维矩阵的第二行第一列的值
 * 
 * @param {Number} val
 */
```

### set11

```js
/**
 * 设置四维矩阵的第二行第二列的值
 * 
 * @param {Number} val
 */
```

### set12

```js
/**
 * 设置四维矩阵的第二行第三列的值
 * 
 * @param {Number} val
 */
```

### set13

```js
/**
 * 设置四维矩阵的第二行第四列的值
 * 
 * @param {Number} val
 */
```

### set20

```js
/**
 * 设置四维矩阵的第三行第一列的值
 * 
 * @param {Number} val
 */
```

### set21

```js
/**
 * 设置四维矩阵的第三行第二列的值
 * 
 * @param {Number} val
 */
```

### set22

```js
/**
 * 设置四维矩阵的第三行第三列的值
 * 
 * @param {Number} val
 */
```

### set23

```js
/**
 * 设置四维矩阵的第三行第四列的值
 * 
 * @param {Number} val
 */
```

### set30

```js
/**
 * 设置四维矩阵的第四行第一列的值
 * 
 * @param {Number} val
 */
```

### set31

```js
/**
 * 设置四维矩阵的第四行第二列的值
 * 
 * @param {Number} val
 */
```

### set32

```js
/**
 * 设置四维矩阵的第四行第三列的值
 * 
 * @param {Number} val
 */
```

### set33

```js
/**
 * 设置四维矩阵的第四行第四列的值
 * 
 * @param {Number} val
 */
```

### set

```js
/**
 * 设置四维矩阵的值
 * 
 * @param {Number} m00 
 * @param {Number} m01
 * @param {Number} m02
 * @param {Number} m03
 * @param {Number} m10 
 * @param {Number} m11 
 * @param {Number} m12
 * @param {Number} m13
 * @param {Number} m20
 * @param {Number} m21 
 * @param {Number} m22
 * @param {Number} m23
 * @param {Number} m30
 * @param {Number} m31 
 * @param {Number} m32
 * @param {Number} m33
 */
```

### identity

```js
/**
 * 设置四维矩阵为单位矩阵（对眼矩阵）
 * 
 */
```

### clone

```js
/**
 * 克隆一个四维矩阵
 * 
 * @returns {Mat4}
 */
```

### copy

```js
/**
 * 复制另一个四维矩阵的值
 * 
 * @param {Mat4} Mat4
 */
```

### transpose

```js
/**
 * 矩阵转置
 * 
 * @returns{Mat4|null}
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
 * @returns{Mat4|null}
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

> 对于四维矩阵，行列式的值为主对角线积减去副对角线的积


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
 * 判断2个四维矩阵是否严格相对
 * 
 * @param {Mat4} mat4 
 * @returns {Boolean}
 */
```

### equals

```js
/**
 * 判断2个四维矩阵是否相对相等，具体实现参考公共部分的equals方法
 * 
 * @param {Mat4} mat4 
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
