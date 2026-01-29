---
title: 同心圆矩形（ConcentricRectangle）
description: 它是用于创建逐步缩进（浓缩）角几何形状的矩形，适合现代 UI 设计。

---

`ConcentricRectangle` 是 iOS 26+ 引入的一种**同心矩形（Concentric Rectangle）形状视图**，用于创建具有“向内递进圆角”特性的矩形结构。
该形状特别适合用于：

* 现代玻璃风格按钮
* 卡片容器背景
* 交互裁剪区域（命中测试形状）
* 玻璃过渡动画遮罩
* 动态层级 UI 结构

在 Scripting 中，`ConcentricRectangle` 既可以作为一个**独立 Shape 视图渲染**，也可以作为：

* `clipShape`
* `background`
* `contentShape`

中的**专用形状类型使用**。

---

## 一、ConcentricRectangle 基本定义

```ts
type ConcentricRectangleProps = ShapeProps & ConcentricRectangleShape

/**
 * A concentric rectangle aligned inside the frame of the view containing it.
 * @available iOS 26+.
 */
declare const ConcentricRectangle: FunctionComponent<ConcentricRectangleProps>
```

### 说明

* `ConcentricRectangle` 是一个标准 `Shape` 组件
* 同时支持：

  * 填充（fill）
  * 描边（stroke）
  * 路径裁剪（trim）
  * 复杂角样式控制（ConcentricRectangleShape）
* 该视图始终在其父视图的 `frame` 内部进行布局与渲染
* 仅支持 iOS 26 及以上系统

---

## 二、角样式系统：EdgeCornerStyle

`ConcentricRectangle` 的核心能力来自其角样式系统 `EdgeCornerStyle`，用于描述单个角的行为方式。

```ts
type EdgeCornerStyle =
  | {
      style: "fixed"
      radius: number
    }
  | {
      style: "concentric"
      minimum: number
    }
  | "concentric"
```

---

### 1. 固定圆角模式（fixed）

```ts
{
  style: "fixed"
  radius: number
}
```

用于创建传统固定半径圆角矩形。

参数说明：

| 参数       | 说明            |
| -------- | ------------- |
| `radius` | 固定圆角半径，单位为 pt |

该模式适合传统静态卡片、按钮等场景。

---

### 2. 同心递进圆角模式（concentric）

```ts
{
  style: "concentric"
  minimum: number
}
```

用于创建随尺寸递进变化的“同心圆角效果”。

参数说明：

| 参数        | 说明                       |
| --------- | ------------------------ |
| `minimum` | 最小内层圆角半径，系统会根据实际尺寸自动向外递进 |

该模式适用于：

* 玻璃按钮
* 动态尺寸卡片
* 层级叠加组件
* 动态动画遮罩

---

### 3. 简写模式

```ts
"concentric"
```

等价于：

```ts
{
  style: "concentric"
  minimum: 系统默认最小值
}
```

适用于无需手动控制最小值的快速使用场景。

---

## 三、ConcentricRectangleShape（角分布规则）

`ConcentricRectangleShape` 用于描述 **每个角是否统一控制，或分别控制**。
该类型支持 7 种结构组合模式。

---

### 1. 全角统一模式（最常用）

```ts
{
  corners: EdgeCornerStyle
  isUniform?: boolean
}
```

参数说明：

| 参数          | 说明                |
| ----------- | ----------------- |
| `corners`   | 应用于全部角的样式         |
| `isUniform` | 是否强制完全一致，默认 false |

示例：

```tsx
<ConcentricRectangle
  corners={{
    style: "concentric",
    minimum: 8
  }}
  fill="red"
/>
```

---

### 2. 四个角完全独立定义

```ts
{
  topLeadingCorner?: EdgeCornerStyle
  topTrailingCorner?: EdgeCornerStyle
  bottomLeadingCorner?: EdgeCornerStyle
  bottomTrailingCorner?: EdgeCornerStyle
}
```

适用于：

* 不规则异形卡片
* 特殊边角 UI
* 半圆角容器

---

### 3. 底部统一角

```ts
{
  uniformBottomCorners?: EdgeCornerStyle
  topLeadingCorner?: EdgeCornerStyle
  topTrailingCorner?: EdgeCornerStyle
}
```

适用于：

* 上直角，下圆角卡片
* 底部弹出面板背景

---

### 4. 顶部统一角

```ts
{
  uniformTopCorners?: EdgeCornerStyle
  bottomLeadingCorner?: EdgeCornerStyle
  bottomTrailingCorner?: EdgeCornerStyle
}
```

适用于：

* 顶部弹窗
* 顶部玻璃标题栏

---

### 5. 顶部与底部统一组合

```ts
{
  uniformTopCorners?: EdgeCornerStyle
  uniformBottomCorners?: EdgeCornerStyle
}
```

---

### 6. 左侧统一角

```ts
{
  uniformLeadingCorners?: EdgeCornerStyle
  topTrailingCorner?: EdgeCornerStyle
  bottomTrailingCorner?: EdgeCornerStyle
}
```

---

### 7. 左右统一组合

```ts
{
  uniformLeadingCorners?: EdgeCornerStyle
  uniformTrailingCorners?: EdgeCornerStyle
}
```

---

## 四、通用 Shape 属性（ShapeProps）

```ts
type ShapeProps = {
  trim?: {
    from: number
    to: number
  }

  fill?: ShapeStyle | DynamicShapeStyle

  stroke?: ShapeStyle | DynamicShapeStyle | {
    shapeStyle: ShapeStyle | DynamicShapeStyle
    strokeStyle: StrokeStyle
  }
}
```

---

### 1. trim（路径裁剪）

```ts
trim={{
  from: 0.0,
  to: 0.5
}}
```

用于路径绘制动画、环形裁剪、渐进描边等效果。

---

### 2. fill（填充）

```ts
fill="red"
fill="ultraThinMaterial"
```

支持：

* 纯色
* 动态材质
* 渐变样式

---

### 3. stroke（描边）

```ts
stroke="blue"

stroke={{
  shapeStyle: "blue",
  strokeStyle: {
    lineWidth: 2
  }
}}
```

---

## 五、ConcentricRectangle 在 View Modifiers 中的使用

### 1. 作为 clipShape 使用

```ts
clipShape?: Shape | "concentricRect" | ({
  type: "concentricRect"
} & ConcentricRectangleShape)
```

示例：

```tsx
<VStack
  clipShape={{
    type: "concentricRect",
    corners: {
      style: "concentric",
      minimum: 10
    }
  }}
/>
```

用于：

* 裁剪真实内容显示区域
* 玻璃过渡遮罩
* 动态蒙版

---

### 2. 作为 background 使用

```ts
background?: ShapeStyle | DynamicShapeStyle | {
  style: ShapeStyle | DynamicShapeStyle
  shape: Shape | "concentricRect" | ({
    type: "concentricRect"
  } & ConcentricRectangleShape)
} | VirtualNode | {
  content: VirtualNode
  alignment: Alignment
}
```

示例：

```tsx
<VStack
  background={{
    style: "ultraThinMaterial",
    shape: {
      type: "concentricRect",
      corners: "concentric"
    }
  }}
/>
```

---

### 3. 作为 contentShape 使用（命中测试区域）

```ts
contentShape?: Shape | {
  kind: ContentShapeKinds
  shape: Shape | "concentricRect" | ({
    type: "concentricRect"
  } & ConcentricRectangleShape)
}
```

用于控制点击、悬停、拖拽等交互命中区域。

---

## 六、完整示例解析

示例代码：

```tsx
<ZStack
  frame={{
    width: 300,
    height: 200
  }}
  containerShape={{
    type: "rect",
    cornerRadius: 32
  }}
>
  <ConcentricRectangle
    corners={{
      style: "concentric",
      minimum: 8
    }}
    fill="red"
  />
</ZStack>
```

该示例实现了：

* 外部容器为固定圆角矩形
* 内部使用同心递进圆角矩形
* 内外形成层级差异与视觉纵深感
* 红色填充用于强调 ConcentricRectangle 的实际形态

---

## 七、设计与实现注意事项

1. `minimum` 不应超过实际高度或宽度的一半
2. 同心圆角更适合与：

   * `glass`
   * `material`
   * `blur`
   * `opacity`
     等视觉效果配合使用
3. 作为 `contentShape` 使用时，仅影响点击区域，不影响视觉裁剪
4. 作为 `clipShape` 使用时，会真实裁剪子视图渲染内容
