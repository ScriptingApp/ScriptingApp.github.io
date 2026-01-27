---
title: 符号样式

---

这些修饰符用于配置 SF Symbols（系统符号图标）的显示样式和动画效果，常用于 `<Image systemName="...">` 组件。

---

### `symbolRenderingMode`

设置符号图像的 **渲染模式**。

#### 类型

```ts
symbolRenderingMode?: SymbolRenderingMode
```

#### 可选值（SymbolRenderingMode）：

* `"monochrome"`：单色模式，使用当前前景色绘制
* `"hierarchical"`：层次渲染，根据不同图层设置不透明度（适合语义着色）
* `"multicolor"`：使用符号内置颜色
* `"palette"`：分层渲染，可自定义每一层的颜色样式（需搭配 `foregroundStyle`）

#### 示例

```tsx
<Image
  systemName="star.fill"
  symbolRenderingMode="palette"
  foregroundStyle={{
    primary: "red",
    secondary: "orange",
    tertiary: "yellow"
  }}
/>
```

---

### `foregroundStyle`

设置符号或前景元素的颜色样式。

#### 类型

```ts
foregroundStyle?: 
  | ShapeStyle
  | DynamicShapeStyle
  | {
      primary: ShapeStyle | DynamicShapeStyle
      secondary: ShapeStyle | DynamicShapeStyle
      tertiary?: ShapeStyle | DynamicShapeStyle
    }
```

#### 说明：

* 在 `"monochrome"` 模式下使用单个颜色或渐变；
* 在 `"palette"` 模式下使用 `{ primary, secondary, tertiary }` 对象指定多层样式；
* `tertiary` 可选，仅在符号有三层图层时有效。

---

### `symbolVariant`

为符号添加特定的 **视觉变体**。

#### 类型

```ts
symbolVariant?: SymbolVariants
```

#### 可选值（SymbolVariants）：

* `"none"`：无变体，原始符号样式
* `"fill"`：填充样式
* `"circle"`：包裹在圆形轮廓中
* `"square"`：包裹在方形轮廓中
* `"rectangle"`：包裹在矩形轮廓中
* `"slash"`：斜杠样式，表示禁止/关闭等状态

#### 示例

```tsx
<Image
  systemName="wifi"
  symbolVariant="slash"
/>
```

---

### `symbolEffect`

为符号添加 **动画效果**，支持静态应用或绑定数值以触发动画。

#### 类型

```ts
symbolEffect?: SymbolEffect
```

#### 使用方式：

##### 1. 静态符号效果（SymbolEffect 简写字符串）

```tsx
<Image
  systemName="checkmark"
  symbolEffect="scaleUp"
/>
```

##### 2. 动态绑定符号效果（每次值变化时触发动画）

```tsx
<Image
  systemName="heart"
  symbolEffect={{
    effect: "bounce",
    value: isLiked
  }}
/>
```

每次 `isLiked` 状态变化时，图标会执行 bounce 动画。

---

### 可用 Symbol 动效分类（DiscreteSymbolEffect）

| 类别                 | 动效关键字                                                                                                                                                                                 |
| ------------------ | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| 弹跳 Bounce          | `bounce`, `bounceByLayer`, `bounceDown`, `bounceUp`, `bounceWholeSymbol`                                                                                                              |
| 呼吸 Breathe         | `breathe`, `breatheByLayer`, `breathePlain`, `breathePulse`, `breatheWholeSymbol`                                                                                                     |
| 脉冲 Pulse           | `pulse`, `pulseByLayer`, `pulseWholeSymbol`                                                                                                                                           |
| 旋转 Rotate          | `rotate`, `rotateByLayer`, `rotateClockwise`, `rotateCounterClockwise`, `rotateWholeSymbol`                                                                                           |
| 颜色变化 VariableColor | `variableColor`, `variableColorIterative`, `variableColorDimInactiveLayers`, `variableColorHideInactiveLayers`, `variableColorCumulative`                                             |
| 摇晃 Wiggle          | `wiggle`, `wiggleLeft`, `wiggleRight`, `wiggleUp`, `wiggleDown`, `wiggleForward`, `wiggleBackward`, `wiggleByLayer`, `wiggleWholeSymbol`, `wiggleClockwise`, `wiggleCounterClockwise` |

---

### 综合示例

```tsx
<Image
  systemName="bell.fill"
  symbolRenderingMode="hierarchical"
  symbolVariant="circle"
  foregroundStyle="indigo"
  symbolEffect={{
    effect: "breathePulse",
    value: isNotified
  }}
/>
```

上述示例中：

* 使用了分层渲染（hierarchical）；
* 添加了圆形变体（circle）；
* 设置了 `indigo` 颜色；
* 每当 `isNotified` 变化时，符号执行 `breathePulse` 动画。

---

## 修饰符汇总表

| 修饰符                   | 说明                        |
| --------------------- | ------------------------- |
| `symbolRenderingMode` | 设置符号图标的渲染模式（单色、多色、层次、调色板） |
| `foregroundStyle`     | 设置符号的颜色风格，可支持多图层配色        |
| `symbolVariant`       | 添加符号样式变体，如填充、圆形、斜杠等       |
| `symbolEffect`        | 添加符号动画，可静态或绑定值驱动          |
