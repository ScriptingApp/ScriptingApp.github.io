`GeometryReader` 是 Scripting 中与 SwiftUI 等效的几何布局读取组件。
它能够在视图构建阶段提供当前容器的尺寸、边距、安全区域和角落内边距等信息，使开发者可以根据环境动态布局内容。

当你需要根据父容器的大小进行自适应布局（响应式布局）时，`GeometryReader` 是非常重要的工具。

***

# GeometryProxy

当 `GeometryReader` 构建其子内容时，会将一个 `GeometryProxy` 实例传递给 `children` 回调。开发者可以使用此对象访问与当前容器相关的布局信息。

```ts
interface GeometryProxy {
  readonly size: Size;
  readonly safeAreaInsets: {
      leading: number;
      top: number;
      trailing: number;
      bottom: number;
  };
  /**
   * Requires iOS 26.0+.
   */
  readonly containerCornerInsets: {
      bottomLeading: Size;
      bottomTrailing: Size;
      topLeading: Size;
      topTrailing: Size;
  } | null;
}
```

***

# GeometryProxy 属性说明

## 1. size

```ts
readonly size: Size
```

当前容器在布局时的实际尺寸。

### Size 结构

```ts
type Size = {
  width: number
  height: number
}
```

### 示例

```tsx
proxy.size.width
proxy.size.height
```

用于动态计算子视图布局，例如宽高比、自适应排版等。

***

## 2. safeAreaInsets

```ts
readonly safeAreaInsets: {
  leading: number
  top: number
  trailing: number
  bottom: number
}
```

当前视图所处环境中的安全区域内边距，包括顶部、底部、左右侧的避让区域。
通常用于避免内容被刘海、Home Indicator 等遮挡。

### 示例用途：

- 内容距离屏幕底部安全区域以上对齐
- 自定义导航栏、工具栏时避免被遮挡
- 实现与设备 UI 边界一致的响应式布局

***

## 3. containerCornerInsets（iOS 26.0+）

```ts
readonly containerCornerInsets: {
  bottomLeading: Size
  bottomTrailing: Size
  topLeading: Size
  topTrailing: Size
} | null
```

该属性仅在 **iOS 26+** 提供，并在设备或容器具有物理圆角偏移时报告每个角落的内边距。

### 用途

- 为圆角窗口、Stage Manager 或分屏环境适配布局
- 在容器圆角内做精确的 UI 对齐

如果平台不支持，则为 `null`。

***

# GeometryReader

```ts
type GeometryReaderProps = {
  children: (proxy: GeometryProxy) => VirtualNode;
};
declare const GeometryReader: FunctionComponent<GeometryReaderProps>;
```

## Props 说明

| 属性名      | 类型                                      | 必须 | 说明                                     |
| -------- | --------------------------------------- | -- | -------------------------------------- |
| children | `(proxy: GeometryProxy) => VirtualNode` | 是  | 构建内容的回调函数，传入 `GeometryProxy` 用于读取布局信息。 |

***

# 工作机制

1. GeometryReader 占据父布局中的位置，并在布局阶段获取当前容器的尺寸与安全区域信息。
2. 将 `GeometryProxy` 注入给 `children(proxy)` 回调。
3. 回调返回的内容将根据读取的信息动态布局。

与 SwiftUI 一样，`GeometryReader` 默认会扩展到可用空间。

***

# 示例：居中布局

```tsx
import { GeometryReader, Text, VStack } from "scripting"

function View() {
  return <GeometryReader>
    {(proxy) => {
      return <VStack
        frame={{
          width: proxy.size.width,
          height: proxy.size.height,
          alignment: "center"
        }}
      >
        <Text>Hello Geometry</Text>
        <Text>
          width: {proxy.size.width}
        </Text>
        <Text>
          height: {proxy.size.height}
        </Text>
      </VStack>
    }}
  </GeometryReader>
}
```

***

# 示例：根据安全区域调整布局

```tsx
<GeometryReader>
  {(proxy) => {
    return <VStack
      padding={{
        top: proxy.safeAreaInsets.top,
        bottom: proxy.safeAreaInsets.bottom
      }}
    >
      <Text>Content inside safe area.</Text>
    </VStack>
  }}
</GeometryReader>
```

***

# 示例（iOS 26+）：读取 containerCornerInsets

```tsx
<GeometryReader>
  {(proxy) => {
    const corners = proxy.containerCornerInsets
    return <Text>
      {corners == null
        ? "Corner insets not available"
        : `Top Leading Corner: ${corners.topLeading.width}, ${corners.topLeading.height}`
      }
    </Text>
  }}
</GeometryReader>
```

***

# 使用建议

- 在需要响应容器尺寸时使用 GeometryReader，例如图片缩放、动态布局、等比布局。
- 避免将大量复杂布局放入 GeometryReader 内，可能影响性能（同 SwiftUI）。
