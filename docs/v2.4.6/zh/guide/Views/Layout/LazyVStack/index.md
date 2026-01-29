---
title: 惰性垂直布局（LazyVStack）
description: 一个按照垂直方向扩展，并在需要时才创建子视图的容器视图。

---
        
`LazyVStack` 组件是 **Scripting** 应用用户界面库的一部分。它将子元素排列在垂直堆叠中，仅根据需要创建和显示项目，从而为大型数据集提供了性能优化。

---

## LazyVStack

### 类型: `FunctionComponent<LazyVStackProps>`

`LazyVStack` 将其子元素排列成一个垂直扩展的线性布局。与普通垂直堆叠不同，它仅在视图即将出现在屏幕上时懒加载和显示内容。这使其非常适合处理列表或动态生成的大量内容。

---

## LazyVStackProps

| 属性            | 类型                                                                                       | 默认值              | 描述                                                                                                                                                           |
|-----------------|--------------------------------------------------------------------------------------------|---------------------|-----------------------------------------------------------------------------------------------------------------------------------------------------------------|
| `alignment`     | `HorizontalAlignment`                                                                     | `undefined`         | 确定子元素在堆叠中如何水平对齐。所有子视图共享相同的水平屏幕坐标。                                                                                             |
| `spacing`       | `number`                                                                                   | `undefined`（默认间距） | 相邻子视图之间的距离。如果设置为 `undefined`，堆叠将使用默认间距值。                                                                                           |
| `pinnedViews`   | `'sectionHeaders'` \| `'sectionFooters'` \| `'sectionHeadersAndFooters'`                   | `undefined`         | 指定哪些子视图在滚动期间固定在滚动视图的边界内。                                                                                                                |
| `children`      | `(VirtualNode \| undefined \| null \| (VirtualNode \| undefined \| null)[])[] \| VirtualNode` | `undefined`         | 要在堆叠中显示的内容。接受一个或多个 `VirtualNode` 元素，包括数组以及可选的 `null` 或 `undefined` 值。                                                       |

---

## PinnedScrollViews

`PinnedScrollViews` 类型定义了哪些类型的子视图可以在滚动期间固定在滚动视图的边界内：

- `'sectionHeaders'`：仅固定节标题
- `'sectionFooters'`：仅固定节页脚
- `'sectionHeadersAndFooters'`：同时固定节标题和页脚

---

## 示例用法

```tsx
import { LazyVStack, Text, ScrollView, Section } from 'scripting'

const Example = () => {
  return (
    <ScrollView>
      <LazyVStack alignment="leading" spacing={12} pinnedViews="sectionHeaders">
        {list.map(item => 
          <Section
            key={item.id}
            header={
              <Text>{item.title}</Text>
            }
          >
            <ItemView
              item={item}
            />
          </Section>
        )}
      </LazyVStack>
    </ScrollView>
  )
}
```

### 说明：

- 堆叠以 `12` 点的间距将 `Section` 视图垂直排列
- `alignment` 属性将项目对齐到堆叠的起始边
- `pinnedViews` 属性确保节标题在滚动视图顶部保持固定状态

---

## 注意事项

- 懒加载确保仅在视图变得可见时创建视图，从而提高大型内容的性能
- 使用 `spacing` 控制项目之间的垂直距离，使用 `alignment` 自定义水平对齐
- `pinnedViews` 属性对于具有粘性标题或页脚的表格或列表布局特别有用

此 API 允许您高效管理垂直增长的内容，同时提供布局和滚动行为的定制选项。