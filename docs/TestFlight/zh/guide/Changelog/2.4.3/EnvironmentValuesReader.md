---
title: EnvironmentValuesReader
description: 它允许脚本在视图层级中访问当前环境的上下文信息，例如颜色模式、尺寸类别、是否正在搜索、是否被呈现、编辑模式等。
---

`EnvironmentValuesReader` 是 Scripting 提供的一个组件，用于读取 SwiftUI 风格的环境值（Environment Values）。
它允许脚本在视图层级中访问当前环境的上下文信息，例如颜色模式、尺寸类别、是否正在搜索、是否被呈现、编辑模式等。

该组件的定位与 SwiftUI 中的 `@Environment` 类似，但设计上更加明确：
**你必须指定要读取的 environment keys，系统仅在渲染时读取这些值并传入回调函数。**

---

##EnvironmentValues 类型

```ts
type EnvironmentValues = {
  colorScheme: ColorScheme;
  colorSchemeContrast: ColorSchemeContrast;
  displayScale: number;
  horizontalSizeClass: UserInterfaceSizeClass | null;
  verticalSizeClass: UserInterfaceSizeClass | null;
  dismiss: () => void;
  dismissSearch: () => void;
  editMode: EditMode | null;
  widgetRenderingMode: WidgetRenderingMode;
  showsWidgetContainerBackground: boolean;
  isSearching: boolean;
  isPresented: boolean;
  activityFamily: "small" | "medium";
  tabViewBottomAccessoryPlacement: "expanded" | "inline";
};
```

以下为每个字段的说明：

---

## 字段说明

### 1. colorScheme

类型：`ColorScheme`
说明：当前系统的颜色模式，例如 `light` 或 `dark`。

---

### 2. colorSchemeContrast

类型：`ColorSchemeContrast`
说明：颜色对比度模式，例如 `standard`、`increased`。

---

### 3. displayScale

类型：`number`
说明：设备屏幕的像素缩放比例，例如 **2.0**, **3.0**。

---

### 4. horizontalSizeClass

类型：`UserInterfaceSizeClass | null`
说明：横向尺寸类别，可用于响应式布局。
可能值：`compact` / `regular`。

---

### 5. verticalSizeClass

类型：`UserInterfaceSizeClass | null`
说明：纵向尺寸类别，行为同上。

---

### 6. dismiss

类型：`() => void`
说明：用于关闭当前呈现的界面，等价于 SwiftUI 的 `dismiss()`。

---

### 7. dismissSearch

类型：`() => void`
说明：关闭当前的搜索 UI（如果 `searchable` 处于激活状态）。

---

### 8. editMode

类型：`EditMode | null`
说明：当前视图是否处于编辑模式（例如 List 的编辑状态）。

---

### 9. widgetRenderingMode

类型：`WidgetRenderingMode`
说明：Widget 渲染模式，例如 `fullColor`、`accented` 等。

---

### 10. showsWidgetContainerBackground

类型：`boolean`
说明：指示 widget 是否显示系统容器背景。

---

### 11. isSearching

类型：`boolean`
说明：当前 view 是否处于搜索状态（来自 `searchable`）。

---

### 12. isPresented

类型：`boolean`
说明：当前 view 是否已呈现，和 `onAppear` 回调不同，不像 `onAppear` 会多次触发。

---

### 13. activityFamily

类型：`"small" | "medium"`
说明：当前LiveActivity的尺寸，同 SwiftUI 中的 `activityFamily`，用于根据些大小渲染 LiveActivity UI。

---

### 14. tabViewBottomAccessoryPlacement

类型：`'expanded' | 'inline'`
说明：当前 TabView 的底部辅助栏的显示方式，同 SwiftUI 中的 `tabViewBottomAccessoryPlacement`。

##EnvironmentValuesReader 组件

```ts
type EnvironmentValuesReaderProps = {
  /**
   * The keys to read from the environment values.
   */
  keys: Array<keyof EnvironmentValues>;
  /**
   * The callback function to render the children, it will be called with the environment values.
   */
  children: (values: EnvironmentValues) => VirtualNode;
};
```

---

##Props 说明

## keys

类型：`Array<keyof EnvironmentValues>`
说明：指定需要读取的 environment key 列表。

只有指定的 key 才会被 read 并传入 children。

---

## children(values)

类型：`(values: EnvironmentValues) => VirtualNode`
说明：用于渲染子节点的回调。
系统会收集你请求的 environment key，并将其值合并成一个对象传入。

---

##组件定义

```ts
declare const EnvironmentValuesReader: FunctionComponent<EnvironmentValuesReaderProps>;
```

---

##使用示例

## 示例：读取 colorScheme 和 displayScale

```tsx
import { EnvironmentValuesReader, Text, VStack } from "scripting";

function View() {
  return (
    <EnvironmentValuesReader keys={["colorScheme", "displayScale"]}>
      {(env) => {
        return (
          <VStack>
            <Text>Color Scheme: {env.colorScheme}</Text>
            <Text>Scale: {env.displayScale}</Text>
          </VStack>
        );
      }}
    </EnvironmentValuesReader>
  );
}
```

---

## 示例：读取 dismiss

```tsx
<EnvironmentValuesReader keys={["dismiss"]}>
  {(env) => {
    return <Button title="Close" action={() => env.dismiss()} />;
  }}
</EnvironmentValuesReader>
```

---

## 示例：根据 sizeClass 动态布局

```tsx
<EnvironmentValuesReader keys={["horizontalSizeClass"]}>
  {(env) => {
    const compact = env.horizontalSizeClass === "compact";
    return compact ? <Text>Compact Layout</Text> : <Text>Regular Layout</Text>;
  }}
</EnvironmentValuesReader>
```

---

##使用注意事项

1. **必须显式指定 keys**，否则不会读取任何 environment 值。
2. 每次所指定的 environment key 发生变化时，`children()` 会重新渲染。
3. `dismiss` 和 `dismissSearch` 是实际可调用的操作，与 SwiftUI 一致。
4. environment 的来源来自父视图树，包括 `Navigation`, `searchable`, `editMode`, `Widget` 等组件。
5. 未在 keys 中声明的字段不会出现在 values 对象中。
6. 不用于替代全局状态，适用于读取系统环境或父组件传递的上下文信息。
