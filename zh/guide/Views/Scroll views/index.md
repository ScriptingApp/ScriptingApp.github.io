# 可滚动视图

`ScrollView` 组件用于在可滚动区域中显示其内容。当用户执行滚动手势时，可视区域会随之更新。你可以通过 `axes` 属性控制滚动方向，支持垂直、水平或双向滚动。

## 类型定义

```ts
type ScrollViewProps = {
  axes?: AxisSet
  children?: VirtualNode | VirtualNode[] | (VirtualNode | undefined | null)[]
}
```

## 基本说明

- 滚动方向由 `axes` 属性控制。
- 内容通过 `children` 指定，通常使用如 `<VStack>`、`<HStack>` 等布局容器。
- 不支持缩放操作。

## 默认行为

- 默认滚动方向为 **垂直**。
- 滚动指示器根据平台默认行为自动显示，除非通过 modifier 显式设置。

## 示例

```tsx
<ScrollView>
  <VStack>
    {new Array(100).fill('').map((_, index) => (
      <Text>Row {index}</Text>
    ))}
  </VStack>
</ScrollView>
```

***

## ScrollView 修饰符说明

你可以使用以下视图修饰符配置滚动行为：

***

### `scrollIndicator`

控制滚动指示器的显示方式。

#### 类型定义

```ts
scrollIndicator?: ScrollScrollIndicatorVisibility | {
  visibility: ScrollScrollIndicatorVisibility
  axes: AxisSet
}
```

#### `ScrollScrollIndicatorVisibility` 可选值：

- `"automatic"`：遵循系统默认行为。
- `"visible"`：显示指示器，可能会自动隐藏。
- `"hidden"`：隐藏指示器，除非被系统强制显示。
- `"never"`：从不显示指示器。

#### 示例

```tsx
<ScrollView scrollIndicator="never">
  <VStack>{/* 内容 */}</VStack>
</ScrollView>
```

设置特定方向的指示器：

```tsx
<ScrollView
  scrollIndicator={{
    visibility: "hidden",
    axes: "vertical"
  }}
>
  <VStack>{/* 内容 */}</VStack>
</ScrollView>
```

***

### `scrollDisabled`

完全禁用滚动行为。

#### 类型定义

```ts
scrollDisabled?: boolean
```

#### 示例

```tsx
<ScrollView scrollDisabled>
  <Text>该滚动视图已被锁定。</Text>
</ScrollView>
```

***

### `scrollClipDisabled`

控制是否允许内容超出滚动视图边界显示。

#### 类型定义

```ts
scrollClipDisabled?: boolean
```

#### 示例

```tsx
<ScrollView scrollClipDisabled>
  {/* 内容可能会超出滚动区域边界 */}
</ScrollView>
```

***

### `scrollDismissesKeyboard`

指定滚动行为对软件键盘的影响。

#### 类型定义

```ts
scrollDismissesKeyboard?: ScrollDismissesKeyboardMode
```

#### 可选值

- `"automatic"`：根据上下文决定默认行为。
- `"immediately"`：滚动开始时立即关闭键盘。
- `"interactively"`：允许用户拖动关闭键盘。
- `"never"`：滚动不会影响键盘。

#### 示例

```tsx
<ScrollView scrollDismissesKeyboard="interactively">
  {/* 含有输入框的内容 */}
</ScrollView>
```

***

### `defaultScrollAnchor`

设置初始显示的内容锚点，或内容变化时保持该锚点对齐。

#### 类型定义

```ts
defaultScrollAnchor?: KeywordPoint | Point
```

#### `KeywordPoint` 关键词

如 `"top"`、`"bottom"`、`"leading"`、`"trailing"`、`"center"`、`"topLeading"`、`"bottomTrailing"` 等。

#### 示例

```tsx
<ScrollView defaultScrollAnchor="bottom">
  <VStack>
    {/* 新增内容会保持底部对齐 */}
  </VStack>
</ScrollView>
```

***

### `AxisSet`

定义滚动方向。

#### 类型定义

```ts
type AxisSet = 'vertical' | 'horizontal' | 'all'
```

#### 示例

```tsx
<ScrollView axes="horizontal">
  <HStack>{/* 横向滚动内容 */}</HStack>
</ScrollView>
```

***

### `scrollTargetLayout`

用于标记滚动区域中的主要布局容器，便于对齐与滚动控制。

#### 类型定义

```ts
scrollTargetLayout?: boolean
```

#### 示例

```tsx
<ScrollView axes="horizontal">
  <LazyHStack scrollTargetLayout>
    {items.map(item => <Text>{item.title}</Text>)}
  </LazyHStack>
</ScrollView>
```

***

### `scrollTargetBehavior`

定义滚动时如何对齐内容。

#### 类型定义

```ts
scrollTargetBehavior?: ScrollTargetBehavior
```

```ts
type ScrollTargetBehavior =
  | "paging"
  | "viewAligned"
  | "viewAlignedLimitAutomatic"
  | "viewAlignedLimitAlways"
  | "viewAlignedLimitNever"
  | "viewAlignedLimitAlwaysByFew"
  | "viewAlignedLimitAlwaysByOne"
```

#### 模式说明

- `"paging"`：分页滚动，以容器尺寸为单位。
- `"viewAligned"`：滚动时按视图边界对齐。
- `"viewAlignedLimitAutomatic"`：在紧凑横向环境下限制滚动数量，其他情况放开。
- `"viewAlignedLimitAlways"`：始终限制每次滚动的项目数量。
- `"viewAlignedLimitNever"`：不限制滚动范围。
- `"viewAlignedLimitAlwaysByFew"` _(仅 iOS 18.0+)_：每次滚动少量视图。
- `"viewAlignedLimitAlwaysByOne"` _(仅 iOS 18.0+)_：每次滚动一个视图。

#### 描述

用于配置内容滚动对齐策略，适用于横向滚动的列表、分页等场景。

***

### `scrollContentBackground`

指定滚动区域的默认背景是否显示。

#### 类型定义

```ts
scrollContentBackground?: Visibility
```

#### 可选值

- `"automatic"`：根据上下文自动决定是否显示背景。
- `"hidden"`：隐藏默认背景，可实现透明或自定义背景。
- `"visible"`：强制显示默认背景，即使已有自定义背景。

#### 示例

```tsx
<List scrollContentBackground="hidden">
  <Text>这里没有默认背景</Text>
</List>
```

***

## 总结

| 修饰符 / 属性                  | 说明                                      |
| ------------------------- | --------------------------------------- |
| `axes`                    | 设置滚动方向（`vertical`、`horizontal` 或 `all`） |
| `scrollIndicator`         | 控制滚动指示器的显示及滚动方向                         |
| `scrollDisabled`          | 设置为 `true` 时禁用滚动行为                      |
| `scrollClipDisabled`      | 允许内容超出滚动区域边界可见                          |
| `scrollDismissesKeyboard` | 滚动时控制是否关闭软件键盘                           |
| `defaultScrollAnchor`     | 设置初始锚点或内容变化时的锚点                         |
| `scrollTargetLayout`      | 标记布局容器为滚动对齐的目标区域                        |
| `scrollTargetBehavior`    | 设置内容滚动对齐方式（分页、视图对齐等）                    |
| `scrollContentBackground` | 控制是否显示默认背景（透明、自定义背景场景常用）                |
