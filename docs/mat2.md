---
outline: deep
---

# 二维矩阵

> Mat2 类型 **类**

## 初始化一个二维单位矩阵

```js
const mat2 = new Mat2()
```

## 私有属性

| 属性名 | 描述 | 类型 |
| - | - | - |
| _value | 存放二维矩阵各个分量的数据 | [ARRAY_TYPE](./common.md#ARRAY_TYPE) |

## 静态方法

### fromValues

```js
/**
 * 使用4个值创建一个二维矩阵
 * 
 * @param {Number} m00 
 * @param {Number} m01
 * @param {Number} m10 
 * @param {Number} m11 
 * @returns {Mat2}
 */
```

## 实例方法

### get00

```js
/**
 * 获取二维矩阵的第一行第一列的值
 * 
 * @returns {Number}
 */
```

### get01

```js
/**
 * 获取二维矩阵的第一行第二列的值
 * 
 * @returns {Number}
 */
```

### get10

```js
/**
 * 获取二维矩阵的第二行第一列的值
 * 
 * @returns {Number}
 */
```

### get11

```js
/**
 * 获取二维矩阵的第二行第二列的值
 * 
 * @returns {Number}
 */
```

### set00

```js
/**
 * 设置二维矩阵的第一行第一列的值
 * 
 * @param {Number} val
 */
```

### set01

```js
/**
 * 设置二维矩阵的第一行第二列的值
 * 
 * @param {Number} val
 */
```

### set10

```js
/**
 * 设置二维矩阵的第二行第一列的值
 * 
 * @param {Number} val
 */
```

### set11

```js
/**
 * 设置二维矩阵的第二行第二列的值
 * 
 * @param {Number} val
 */
```

### set

```js
/**
 * 设置二维矩阵的值
 * 
 * @param {Number} m00 
 * @param {Number} m01
 * @param {Number} m10 
 * @param {Number} m11 
 */
```

### identity

```js
/**
 * 设置二维矩阵为单位矩阵（对眼矩阵）
 * 
 */
```

### clone

```js
/**
 * 克隆一个二维矩阵
 * 
 * @returns {Mat2}
 */
```

### copy

```js
/**
 * 复制另一个二维矩阵的值
 * 
 * @param {Mat2} Mat2
 */
```

### transpose

```js
/**
 * 矩阵转置
 * 
 * @returns{Mat2|null}
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

> 首先需要确保矩阵是可逆的，这取决于其行列式是否为零。如果行列式不为零，则可以计算其逆矩阵

$$
\text{A=}
\begin{bmatrix}
a & b \\
c & d
\end{bmatrix}
$$

$det(A)=ad - bc$

$$
A^{-1}=
\begin{bmatrix}
\frac{a}{det(A)} & -\frac{b}{det(A)} \\
-\frac{c}{det(A)} & \frac{d}{det(A)}
\end{bmatrix}
$$

### adjugate

```js
/**
 * 伴随矩阵
 * 
 * @returns{Mat2|null}
 */
```

$$
\text{A=}
\begin{bmatrix}
a & b \\
c & d
\end{bmatrix}
$$

$$
\text{adj(A)}
\begin{bmatrix}
d & -b \\
-c & a
\end{bmatrix}
$$

### determinant

```js
/**
 * 计算行列式
 * 
 * @returns{Number}
 */
```

> 对于二维矩阵，行列式的值为主对角线积减去副对角线的积

### multiply

```js
/**
 * 矩阵相乘
 * 
 * @param {Mat2} mat2
 */
```

### rotate

```js
/**
 * 旋转一定角度
 * 
 * @param {Number} rad
 */
```

### scale

```js
/**
 * 通过一个二维向量缩放矩阵
 * 
 * @param {Vec2} vec2
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
 * 判断2个二维矩阵是否严格相对
 * 
 * @param {Mat2} mat2 
 * @returns {Boolean}
 */
```

### equals

```js
/**
 * 判断2个二维矩阵是否相对相等，具体实现参考公共部分的equals方法
 * 
 * @param {Mat2} mat2 
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
