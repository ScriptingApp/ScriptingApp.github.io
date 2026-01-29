---
title: MediaTime
description: 该类表示媒体时间。

---

`MediaTime` 用于表示音视频处理中的**精确时间点或时间长度**，是 Scripting 中 MediaComposer 时间系统的基础类型。
它在语义上对应于底层媒体框架中的“带时间基准的时间值”（如 AVFoundation 的 `CMTime`），但对脚本侧提供了更安全、可读、可计算的抽象。

`MediaTime` 既可以表示**确定的数值时间**，也可以表示**无效、无限或不确定时间**，并支持严格的时间运算与比较。

---

## 核心特性

* 使用 **value + timescale** 或 **seconds + preferredTimescale** 精确构造时间
* 支持时间缩放（convertScale）及多种舍入策略
* 支持加减运算与大小比较
* 明确区分有效时间、无效时间、无限时间和不确定时间
* 适用于时间线计算、剪辑、对齐、放置（at）、淡入淡出等所有时间相关场景

---

## 时间精度模型

`MediaTime` 的底层模型基于以下概念：

* **value**：整数时间值
* **timescale**：每秒的时间单位数
  例如：

  * `value = 300`, `timescale = 600` 表示 0.5 秒
  * `value = 18000`, `timescale = 600` 表示 30 秒

通过 timescale，`MediaTime` 可以精确表达帧级或采样级时间，而不依赖浮点数。

---

## 只读属性

### secondes

```ts
readonly secondes: number
```

当前时间对应的秒数（浮点数形式）。
这是一个**派生值**，主要用于展示或调试，不建议用于时间计算。

---

### isValid

```ts
readonly isValid: boolean
```

表示该时间是否是一个有效、可用于计算的时间值。
当时间为 `invalid`、`indefinite` 或无穷大时，该值为 `false`。

---

### isPositiveInfinity / isNegativeInfinity

```ts
readonly isPositiveInfinity: boolean
readonly isNegativeInfinity: boolean
```

表示该时间是否为正无穷或负无穷。
常用于内部边界标记或时间线计算中的极值判断。

---

### isIndefinite

```ts
readonly isIndefinite: boolean
```

表示该时间是否为“不确定时间”。
通常用于尚未解析出真实时长的媒体资源。

---

### isNumeric

```ts
readonly isNumeric: boolean
```

表示该时间是否是一个可参与数值计算的时间。
只有在该值为 `true` 时，才应进行加减或比较操作。

---

### hasBeenRounded

```ts
readonly hasBeenRounded: boolean
```

表示该时间是否在构造或转换过程中发生过舍入。
对于帧精度或采样精度要求较高的场景，该属性可用于调试或验证。

---

## 时间转换

### convertScale

```ts
convertScale(newTimescale: number, method: MediaTimeRoundingMethod): MediaTime
```

将当前时间转换为新的 timescale，并使用指定的舍入策略。

**典型用途：**

* 对齐视频帧时间（如 600、90000）
* 对齐音频采样时间（如 44100、48000）
* 避免不同时间基准混用导致的误差

---

## 时间值获取

### getSeconds

```ts
getSeconds(): number
```

返回当前时间对应的秒数（浮点数）。
该方法等价于读取 `secondes`，但在语义上更明确。

---

## 时间运算

### plus / minus

```ts
plus(other: MediaItem): MediaItem
minus(other: MediaItem): MediaItem
```

执行时间加法或减法运算，返回新的 `MediaTime`。

* 运算双方必须为可计算时间
* 不会修改原对象
* 运算结果遵循内部时间基准规则

---

## 时间比较

```ts
lt(other: MediaItem): boolean
gt(other: MediaItem): boolean
lte(other: MediaItem): boolean
gte(other: MediaItem): boolean
eq(other: MediaItem): boolean
neq(other: MediaItem): boolean
```

用于比较两个时间的大小或相等性。

* 支持严格比较
* 对无效或非数值时间的比较结果是确定性的
* 推荐在进行时间线排序、裁剪判断、边界检测时使用

---

## 静态构造方法

### make

```ts
static make(options: {
  value: number
  timescale: number
} | {
  seconds: number
  preferredTimescale: number
}): MediaTime
```

用于创建一个 `MediaTime` 实例。

#### 使用 value + timescale

```ts
MediaTime.make({
  value: 300,
  timescale: 600
})
```

适用于需要精确控制时间单位的场景。

#### 使用 seconds + preferredTimescale

```ts
MediaTime.make({
  seconds: 5,
  preferredTimescale: 600
})
```

适用于脚本层以“秒”为主的时间描述方式。

---

### zero

```ts
static zero(): MediaTime
```

返回一个表示 **0 秒** 的时间。

---

### invalid

```ts
static invalid(): MediaTime
```

返回一个无效时间。
用于显式表示错误、缺失或不可用的时间值。

---

### indefinite

```ts
static indefinite(): MediaTime
```

返回一个不确定时间。
通常用于媒体尚未加载完成、时长未知的状态。

---

### positiveInfinity / negativeInfinity

```ts
static positiveInfinity(): MediaTime
static negativeInfinity(): MediaTime
```

返回正无穷或负无穷时间。
主要用于内部时间线边界控制，不建议在普通脚本逻辑中使用。

---

## 使用建议与注意事项

* **避免直接使用浮点秒数进行时间计算**，应始终使用 `MediaTime`
* 不同媒体资源可能使用不同的 timescale，必要时显式调用 `convertScale`
* 在比较或运算前，建议检查 `isNumeric`
* 在构建时间线（如 `at`、`sourceTimeRange`）时，统一 timescale 可减少误差

---

## 在 MediaComposer 中的典型用途

* 指定音频或视频片段的放置时间（`AudioClip.at`）
* 定义剪辑的起点与时长（`TimeRange`）
* 计算最终导出视频的精确时长
* 控制淡入淡出、对齐、循环等时间行为
