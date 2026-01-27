---
title: 弹出视图修饰符（Presentation

---

这些修饰符用于配置通过 `sheet` 呈现的视图的行为和外观，包括在不同尺寸环境下的适配方式、拖拽指示器、支持的尺寸（detents）、背景交互、滚动与调整优先级等。

> 这些修饰符应作用于 **被 sheet 弹出显示的根视图**（例如 `<VStack>`、`<NavigationStack>` 或 `<List>`）。

---

## `presentationCompactAdaptation`

定义当设备处于 **横向或纵向紧凑尺寸类（Compact Size Class）** 时，sheet 的适配方式。

### 类型

```ts
presentationCompactAdaptation?: PresentationAdaptation | {
  horizontal: PresentationAdaptation
  vertical: PresentationAdaptation
}
```

### `PresentationAdaptation` 可选值：

* `"automatic"`：系统默认行为
* `"fullScreenCover"`：使用全屏显示
* `"sheet"`：使用普通 sheet 弹出样式
* `"popover"`：使用气泡样式（部分平台支持）
* `"none"`：不进行适配（尽可能维持原样）

### 示例

```tsx
<NavigationStack
  presentationCompactAdaptation={{
    horizontal: "fullScreenCover",
    vertical: "sheet"
  }}
>
  {/* 弹出内容 */}
</NavigationStack>
```

---

## `presentationDragIndicator`

控制 sheet 顶部是否显示 **拖拽指示器**（即小横条）。

### 类型

```ts
presentationDragIndicator?: "visible" | "hidden" | "automatic"
```

### 示例

```tsx
<VStack presentationDragIndicator="visible">
  <Text>可以拖动顶部指示器来改变高度</Text>
</VStack>
```

---

## `presentationDetents`

定义 sheet 支持的 **高度位置（detents）**，用户可以通过拖拽在这些高度间切换。

### 类型

```ts
presentationDetents?: PresentationDetent[]
```

### `PresentationDetent` 可选值：

* `"medium"`：大约为屏幕高度的一半（在紧凑纵向尺寸下无效）
* `"large"`：占满整个屏幕高度
* `number > 1`：表示固定的高度（单位为 pt）
* `0 < number <= 1`：表示按屏幕高度的百分比（例如 `0.5` 表示 50% 高度）

### 示例

```tsx
<VStack presentationDetents={[200, "medium", "large"]}>
  <Text>拖动可在不同高度之间切换</Text>
</VStack>
```

---

## `presentationBackgroundInteraction`

定义在弹出页面显示时，用户是否可以与 **底层视图交互**。

### 类型

```ts
presentationBackgroundInteraction?:
  | "automatic"
  | "enabled"
  | "disabled"
  | { enabledUpThrough: PresentationDetent }
```

### 示例：仅在 sheet 高度较小时允许背景交互

```tsx
<VStack presentationBackgroundInteraction={{
  enabledUpThrough: "medium"
}}>
  <Text>当 sheet 为中等高度时，背景可交互</Text>
</VStack>
```

---

## `presentationContentInteraction`

控制在向上滑动手势中，sheet 是优先 **调整高度** 还是 **滚动内容**。

### 类型

```ts
presentationContentInteraction?: "automatic" | "resizes" | "scrolls"
```

### 说明

* `"resizes"`：优先调整 detent 高度，滚动内容居后
* `"scrolls"`：立即滚动内部内容（如 ScrollView）
* `"automatic"`：系统默认行为（通常优先调整 detent）

### 示例

```tsx
<ScrollView presentationContentInteraction="scrolls">
  {/* 向上滑时会立即滚动，而不会先调整 sheet 高度 */}
</ScrollView>
```

---

## `presentationCornerRadius`

设置 sheet 背景的 **圆角半径**。

### 类型

```ts
presentationCornerRadius?: number
```

### 示例

```tsx
<VStack presentationCornerRadius={16}>
  <Text>该 sheet 具有圆角背景</Text>
</VStack>
```

---

## 完整使用示例

```tsx
function SheetPage({ onDismiss }: {
  onDismiss: () => void
}) {
  return <NavigationStack>
    <List navigationTitle="弹出页">
      <Text font="title" padding={50}>
        拖动指示器可改变 sheet 高度。
      </Text>
      <Button
        title="关闭"
        action={onDismiss}
      />
    </List>
  </NavigationStack>
}

<Button
  title="显示"
  action={() => setIsPresented(true)}
  sheet={{
    isPresented: isPresented,
    onChanged: setIsPresented,
    content: <SheetPage
      presentationDragIndicator="visible"
      presentationDetents={[200, "medium", "large"]}
      onDismiss={() => setIsPresented(false)}
    />
  }}
/>
```

---

## 修饰符汇总

| 修饰符                                 | 功能说明                  |
| ----------------------------------- | --------------------- |
| `presentationCompactAdaptation`     | 设置在紧凑尺寸类下的适配方式        |
| `presentationDragIndicator`         | 控制是否显示拖拽指示器           |
| `presentationDetents`               | 定义 sheet 可拖拽的高度（支持多个） |
| `presentationBackgroundInteraction` | 设置是否允许与背景内容交互         |
| `presentationContentInteraction`    | 控制是优先滚动还是优先调整高度       |
| `presentationCornerRadius`          | 设置 sheet 的圆角大小        |
