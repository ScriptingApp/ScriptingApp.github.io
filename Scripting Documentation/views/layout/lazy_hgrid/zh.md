`LazyHGrid` 组件是 **Scripting** 应用用户界面库的一部分。它通过可自定义的大小和对齐选项将其子元素排列在网格布局中，仅根据需要创建和显示项目，从而为大型或动态数据集提供了性能优化。

---

## LazyHGrid

### 类型: `FunctionComponent<LazyHGridProps>`

`LazyHGrid` 将其子元素排列在一个水平扩展的网格中。与普通网格不同，它以懒加载方式加载和显示项目，仅在项目即将出现在屏幕上时创建它们。这使其非常适合处理包含大量或动态内容的网格。

---

## LazyHGridProps

| 属性            | 类型                                                                                       | 默认值              | 描述                                                                                                                                                           |
|-----------------|--------------------------------------------------------------------------------------------|---------------------|-----------------------------------------------------------------------------------------------------------------------------------------------------------------|
| `rows`          | `GridItem[]`                                                                              | **必需**            | 定义网格中行的配置，包括其大小和对齐方式。                                                                                                                      |
| `alignment`     | `VerticalAlignment`                                                                       | `undefined`         | 控制网格在其父视图中的垂直对齐方式。                                                                                                                            |
| `spacing`       | `number`                                                                                   | `undefined`（默认间距） | 网格与其父视图中下一个项目之间的距离。                                                                                                                           |
| `pinnedViews`   | `'sectionHeaders'` \| `'sectionFooters'` \| `'sectionHeadersAndFooters'`                   | `undefined`         | 指定哪些子视图会固定在父滚动视图的边界内。                                                                                                                      |
| `children`      | `(VirtualNode \| undefined \| null \| (VirtualNode \| undefined \| null)[])[] \| VirtualNode` | `undefined`         | 要在网格中显示的内容。接受一个或多个 `VirtualNode` 元素，包括数组以及可选的 `null` 或 `undefined` 值。                                                       |

---

## GridItem

定义网格中单行的属性。

| 属性            | 类型                                                                                       | 默认值              | 描述                                                                                                                                                           |
|-----------------|--------------------------------------------------------------------------------------------|---------------------|-----------------------------------------------------------------------------------------------------------------------------------------------------------------|
| `alignment`     | `Alignment`                                                                               | `undefined`         | 指定在此行中放置每个子视图时使用的对齐方式。                                                                                                                    |
| `spacing`       | `number`                                                                                   | `undefined`（默认间距） | 此行与下一行之间的间距。                                                                                                                                        |
| `size`          | `GridSize`                                                                                | **必需**            | 定义行的大小。可以是固定大小，也可以是基于内容的灵活/自适应大小。                                                                                               |

---

## GridSize

定义网格布局中行或列的大小。

| 类型            | 属性                                                                                       | 描述                                                                                                                                                           |
|-----------------|--------------------------------------------------------------------------------------------|-----------------------------------------------------------------------------------------------------------------------------------------------------------------|
| `number`        | _无_                                                                                      | 行或列的固定大小。                                                                                                                                              |
| `adaptive`      | `min: number`, `max?: number \|'infinity'`                                                | 指定一个灵活大小，根据内容进行调整，带有最小值和可选的最大值限制。                                                                                              |
| `flexible`      | `min?: number`, `max?: number \| 'infinity'`                                              | 指定一个动态调整的灵活大小，可以使用可选的最小值和最大值约束。                                                                                                   |

---

## PinnedScrollViews

定义网格中哪些视图会固定在父滚动视图的边界内：

- `'sectionHeaders'`：仅固定节标题
- `'sectionFooters'`：仅固定节页脚
- `'sectionHeadersAndFooters'`：同时固定节标题和页脚

---

## 示例用法

```tsx
import { LazyHGrid, Text } from 'scripting'

const Example = () => {
  const rows = [
    { size: 50 },
    { size: { type: 'adaptive', min: 30, max: 80 } },
    { size: { type: 'flexible', min: 20, max: 'infinity' } }
  ]
  
  return (
    <ScrollView
      axes="horizontal"
    >
      <LazyHGrid 
        rows={rows} 
        alignment="center" 
        spacing={12} 
      >
        <Text>项目 1</Text>
        <Text>项目 2</Text>
        <Text>项目 3</Text>
      </LazyHGrid>
    </ScrollView>
  )
}
```

### 说明：

- 定义了三个具有不同大小的行：
  - 一个大小为 50 的固定行
  - 一个最小大小为 30，最大大小为 80 的自适应行
  - 一个最小大小为 20，无最大大小的灵活行
- 网格在其父视图中垂直居中排列，项目之间的间距为 12 点

---

## 注意事项

- `LazyHGrid` 非常适合处理包含大量或动态内容的水平扩展网格布局
- 使用 `GridSize` 定义基于可用空间的灵活或自适应布局
- `pinnedViews` 属性确保关键视图（如标题或页脚）在滚动过程中始终可见

此 API 为基于网格的水平布局提供了灵活性和性能优化。