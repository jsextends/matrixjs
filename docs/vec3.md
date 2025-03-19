---
outline: deep
---

# 三维向量

> Vec3 类型 **类**

## 初始化一个三维零向量

```js
const vec3 = new Vec3()
```

## 私有属性

| 属性名 | 描述 | 类型 |
| - | - | - |
| _value | 存放三维向量各个分量的数据 | [ARRAY_TYPE](./common.md#ARRAY_TYPE) |

## 静态方法

### fromValues

```js
/**
 * 使用2个值创建一个三维向量
 * 
 * @param {Number} x 
 * @param {Number} y 
 * @param {Number} z
 * @returns {Vec3}
 */
```

### ceil

```js
/**
 * 将三维向量的各个分量向上取整
 * 
 * @param {Vec3} vec3 
 * @returns {Vec3}
 */
```

### floor

```js
/**
 * 将三维向量的各个分量向下取整
 * 
 * @param {Vec3} vec3 
 * @returns {Vec3}
 */
```

### round

```js
/**
 * 将三维向量的各个分量四舍五入取整
 * 
 * @param {Vec3} vec3 
 * @returns {Vec3}
 */
```

### linerInterpolation

```js
/**
 * 在两个三维向量中线性插值获得一个三维向量
 * 
 * @param {vec3} vec3_1
 * @param {vec3} vec3_2
 * @param {Number} t 
 * @returns {Vec3}
 */
```

## 实例方法

### get

```js
/**
 * 获取三维向量的某个分量的值
 * 
 * @param {string} component 有效值x|y|z 
 * @returns {Number}
 */
```

### set

```js
/**
 * 设置三维向量的某个分量的值
 * 
 * @param {Number} x 
 * @param {Number} y 
 * @param {Number} z
 */
```

### clone

```js
/**
 * 克隆一个三维向量
 * 
 * @returns {Vec3}
 */
```

### copy

```js
/**
 * 复制另一个三维向量的值
 * 
 * @param {Vec3} vec3
 */
```

### add

```js
/**
 * 两个三维向量的各个分量相加
 * 
 * @param {Vec3} vec3
 */
```

### subtract

```js
/**
 * 两个三维向量的各个分量相减
 * 
 * @param {Vec3} vec3
 */
```

### multiply

```js
/**
 * 两个三维向量的各个分量相乘
 * 
 * @param {Vec3} vec3
 */
```

### divide

```js
/**
 * 两个三维向量的各个分量相除
 * 
 * @param {Vec3} vec3
 */
```

### scale

```js
/**
 * 缩放一个三维向量
 * 
 * @param {Number} ratio
 */
```

### distance

```js
/**
 * 返回两个三维向量的欧几米德距离
 * 
 * @param {Vec3} vec3
 * @returns {Number}
 */
```

### squaredDistance

```js
/**
 * 返回两个三维向量的欧几米德距离的平方
 * 
 * @param {Vec3} vec3
 * @returns {Number}
 */
```

### length

```js
/**
 * 返回三维向量到坐标原点的欧几米德距离
 * 
 * @returns {Number}
 */
```

### squaredLength

```js
/**
 * 返回三维向量到坐标原点的欧几米德距离的平分
 * 
 * @returns {Number}
 */
```

### negate

```js
/**
 * 负向量
 * 
 */
```

### inverse

```js
/**
 * 各个向量去倒数
 * 
 */
```

### normalize

```js
/**
 * 归一化向量,也就是三维向量的长度为1
 * 
 */
```

### dot

> 两个三维向量的点积返回一个数值

大小为$|\vec a| \times |\vec b| \times \cos\theta $转为坐标计算为$x_1 * y_1 + x_2 * y_2 + z_1 * z_2$

```js
/**
 * 计算两个向量的点积
 * 
 * @param {Vec3} vec3 
 * @returns {Number}
 */
```

### cross

> 两个三维向量的叉积返回一个三维向量，向量垂直于原来的两个向量，

$x = y_1 * z_2 - x_2 * y_1$
$y = z_1 * x_2 - x_2 * z_1$
$z = x_1 * y_2 - y_2 * x_1$

```js
/**
 * 计算两个向量的叉积
 * 
 * @param {Vec3} vec3 
 * @returns {Vec3}
 */
```

### rotateX

```js
/**
 * 向三维向量vec3为坐标原点将向量沿x轴偏移一个角度
 * 
 * @param {Vec3} vec3 
 * @param {Number} rad
 * 
 */
```

关于x轴的旋转矩阵
$$
\bold{R_x} =
\begin{bmatrix}
1 & 0 & 0 & 0 \\
1 & \cos\theta & -\sin\theta & 0 \\
1 & \sin\theta & \cos\theta & 0 \\
0 & 0 & 0 & 1
\end{bmatrix}
$$

### rotateY

```js
/**
 * 向三维向量vec3为坐标原点将向量沿y轴偏移一个角度
 * 
 * @param {Vec3} vec3 
 * @param {Number} rad
 * 
 */
```

关于y轴的旋转矩阵
$$
\bold{R_y}=
\begin{bmatrix}
\cos\theta & 0 & \sin\theta & 0  \\
0 & 1 & 0 & 0 \\
-\sin\theta & 0 & \cos\theta & 0 \\
0 & 0 & 0 & 1
\end{bmatrix}
$$

### rotateZ

```js
/**
 * 向三维向量vec3为坐标原点将向量沿z轴偏移一个角度
 * 
 * @param {Vec3} vec3 
 * @param {Number} rad
 * 
 */
```

关于z轴的旋转矩阵

$$
\bold{R_z}=
\begin{bmatrix}
\cos\theta &  -\sin\theta & 0 & 0  \\
\sin\theta & \cos\theta & 0 & 0 \\
0 & 0 & 1 & 0 \\
0 & 0 & 0 & 1
\end{bmatrix}
$$

### angle

```js
/**
 * 获取两个向量之间的夹角
 * 
 * @param {Vec3} vec3 
 * @returns {Number}
 */
```

> 两向量的夹角的余弦为两向量的点积和两向量的模长积的比值

$$
\cos \theta = \frac{\vec a \cdot \vec b}{|\vec a||\vec b|}
$$

> 注意: 在实现时由于模长的计算需要去平方根为了减少精度值丢失，先用两个模长的模长的平方乘积在取平分根

### exactEquals

```js
/**
 * 判断2个三维向量是否严格相对
 * 
 * @param {Vec3} vec3 
 * @returns {Boolean}
 */
```

### equals

```js
/**
 * 判断2个三维向量是否相对相等，具体实现参考公共部分的equals方法
 * 
 * @param {Vec3} vec3 
 * @returns {Boolean}
 */
```

### toString

```js
/**
 * 返回vec3的字符串描述
 * 
 * @returns {string}
 */
```
