---
outline: deep
---

# 四维向量

> Vec4 类型 **类**

## 初始化一个四维零向量

```js
const vec4 = new Vec4()
```

## 私有属性

| 属性名 | 描述 | 类型 |
| - | - | - |
| _value | 存放四维向量各个分量的数据 | [ARRAY_TYPE](./common.md#ARRAY_TYPE) |

## 静态方法

### fromValues

```js
/**
 * 使用四个值创建一个四维向量
 * 
 * @param {Number} x 
 * @param {Number} y 
 * @param {Number} z
 * @param {Number} w
 * @returns {Vec4}
 */
```

## 实例方法

### set

```js
/**
 * 设置四维向量的某个分量的值
 * 
 * @param {Number} x 
 * @param {Number} y 
 * @param {Number} z
 * @param {Number} w
 */
```

### get

```js
/**
 * 获取四维向量的某个分量的值
 * 
 * @param {String} component 有效值x|y|z|w
 * @returns {Number}
 */
```

### clone

```js
/**
 * 克隆一个四维向量
 * 
 * @returns {Vec4}
 */
```

### copy

```js
/**
 * 复制另一个四维向量的值
 * 
 * @param {Vec4} vec4
 */
```

### add

```js
/**
 * 两个四维向量的各个分量相加
 * 
 * @param {Vec4} vec4
 */
```

### subtract

```js
/**
 * 两个四维向量的各个分量相减
 * 
 * @param {Vec4} vec4
 */
```

### scale

```js
/**
 * 缩放一个四维向量
 * 
 * @param {Number} ratio
 */
```

### ceil

```js
/**
 * 将四维向量的各个分量向上取整
 */
```

### floor

```js
/**
 * 将四维向量的各个分量向下取整
 */
```

### round

```js
/**
 * 将四维向量的各个分量四舍五入取整
 */
```

### linerInterpolation

```js
/**
 * 在两个四维向量中线性插值获得一个四维向量
 * 
 * @param {vec4} vec4
 * @param {Number} t 
 * @returns {Vec4}
 */
```

### squaredDistance

```js
/**
 * 返回两个四维向量的欧几米德距离的平方
 * 
 * @param {Vec4} vec4
 * @returns {Number}
 */
```

### distance

```js
/**
 * 返回两个四维向量的欧几米德距离
 * 
 * @param {Vec4} vec4
 * @returns {Number}
 */
```

### squaredLength

```js
/**
 * 返回四维向量到坐标原点的欧几米德距离的平分
 * 
 * @returns {Number}
 */
```

### length

```js
/**
 * 返回四维向量到坐标原点的欧几米德距离
 * 
 * @returns {Vec4}
 */
```

### negate

```js
/**
 * 相反向量
 */
```

### inverse

```js
/**
 * 倒数向量 各个向量去倒数
 */
```

### normalize

```js
/**
 * 归一化向量,也就是四维向量的长度为1
 * 
 */
```

### dot

> 两个四维向量的点积返回一个数值

大小为$|\vec a| \times |\vec b| \times \cos\theta $转为坐标计算为$x_1 * y_1 + x_2 * y_2 + z_1 * z_2 + w_1 + w_2$

```js
/**
 * 计算两个向量的点积
 * 
 * @param {Vec4} vec4 
 * @returns {Number}
 */
```

### exactEquals

```js
/**
 * 判断2个四维向量是否严格相对
 * 
 * @param {Vec4} vec4 
 * @returns {boolean}
 */
```

### equals

```js
/**
 * 判断2个四维向量是否相对相等，具体实现参考公共部分的equals方法
 * 
 * @param {Vec4} vec4 
 * @returns {Boolean}
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
