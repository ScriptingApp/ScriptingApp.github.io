---
title: 内容过渡动画

---

`contentTransition` 修饰符用于指定当视图 **内容发生变化** 时所应用的动画过渡效果。不同于 `.transition(...)` 这种控制视图出现或消失的动画，`contentTransition` 仅作用于视图内部内容的更新，例如 `Text` 文本变化、`Image` 图标替换等。

适用于需要在数据变化时提供平滑视觉过渡的场景，增强界面响应性和用户体验。

---

## 类型定义

```ts
contentTransition?: ContentTransition
```

---

## 可选值说明（`ContentTransition`）

\| 值 | 说明 |

---

### `"identity"`

* 默认行为，不进行任何动画处理。
* 内容会直接更新，无任何过渡效果。

```tsx
<Text contentTransition="identity">{value}</Text>
```

---

### `"interpolate"`

* 尝试在旧内容与新内容之间进行插值动画。
* 适用于颜色、形状、可插值视图等类型。

```tsx
<Rectangle fill={color} contentTransition="interpolate" />
```

---

### `"opacity"`

* 使用透明度进行过渡：旧内容淡出，新内容淡入。
* 通用型过渡动画，适用于各种视图。

```tsx
<Text contentTransition="opacity">{message}</Text>
```

---

### `"numericText"`

* 专为数字文本（`Text`）设计的过渡动画。
* 适用于数字更新场景，如统计数字或分数显示。

```tsx
<Text contentTransition="numericText">{score}</Text>
```

---

### `"numericTextCountsUp"`

* 适用于 **数字递增** 的动画优化。
* 类似计数器的上升效果。

```tsx
<Text contentTransition="numericTextCountsUp">{level}</Text>
```

---

### `"numericTextCountsDown"`

* 适用于 **数字递减** 的动画优化。
* 常用于倒计时、剩余时间等场景。

```tsx
<Text contentTransition="numericTextCountsDown">{remainingTime}</Text>
```

---

### `"symbolEffect"`

* 针对 SF Symbols 图标（如 `Image(systemName)`）的默认动画。
* 仅对符号图标生效，其他视图不受影响。

```tsx
<Image
  systemName={isOn ? "lightbulb.fill" : "lightbulb"}
  contentTransition="symbolEffect"
/>
```

---

### `"symbolEffectAutomatic"`

* 系统自动选择合适的符号动画方式。
* 常用于上下文自适应的图标切换。

```tsx
<Image
  systemName={icon}
  contentTransition="symbolEffectAutomatic"
/>
```

---

### `"symbolEffectReplace"`

* 以过渡方式替换符号图层。
* 提供比直接替换更平滑的过渡效果。

```tsx
<Image
  systemName={currentSymbol}
  contentTransition="symbolEffectReplace"
/>
```

---

### `"symbolEffectAppear"` / `"symbolEffectDisappear"`

* 控制符号图标的显现或消失动画。
* 通常结合条件渲染（`if`）使用。

```tsx
{isShown
  ? <Image
    systemName="checkmark"
    contentTransition="symbolEffectAppear"
  />
  : null
}
```

---

### `"symbolEffectScale"`

* 内容变化时应用缩放动画。
* 常用于状态切换或强调某个图标时使用。

```tsx
<Image
  systemName={statusIcon}
  contentTransition="symbolEffectScale"
/>
```

---

## 用法总结

| 过渡类型                               | 使用场景              |
| ---------------------------------- | ----------------- |
| `identity`                         | 无动画，直接更新内容        |
| `interpolate`                      | 可插值类型（颜色、形状）之间的过渡 |
| `opacity`                          | 通用型淡入淡出           |
| `numericText`                      | 数字变动过渡            |
| `numericTextCountsUp`              | 数字递增动画（计数器）       |
| `numericTextCountsDown`            | 数字递减动画（倒计时）       |
| `symbolEffect`                     | SF Symbols 图标切换动画 |
| `symbolEffectAutomatic`            | 系统自动选择图标过渡方式      |
| `symbolEffectReplace`              | 符号图层替换过渡          |
| `symbolEffectAppear` / `Disappear` | 控制符号显现或消失动画       |
| `symbolEffectScale`                | 缩放动画，用于状态变更反馈     |

---

## 说明

* 该修饰符不会影响视图的布局或层级，仅作用于“内部内容”的视觉表现。
* 对于 SF Symbols 图标变化，推荐使用符号专属的过渡类型以获得最佳动画效果。
