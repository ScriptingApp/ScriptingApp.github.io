---
title: 惰性水平布局（LazyHStack）

---
        
`LazyHStack` 组件是 **Scripting** 应用程序用户界面库的一部分。它将其子元素排列在水平堆栈中，仅在需要时创建和显示元素，从而提高了处理大型数据集时的性能。

## LazyHStack

## 类型：`FunctionComponent<LazyHStackProps>`

`LazyHStack` 将其子元素按横向排列在一条线上。与普通的水平堆栈不同，它会懒加载和显示视图，仅在它们即将出现在屏幕上时才创建。这使其非常适合处理大型或动态数据的场景。

---

## LazyHStackProps

| 属性            | 类型                                                                                        | 默认值              | 描述                                                                                                                                                            |
|-----------------|-------------------------------------------------------------------------------------------|---------------------|----------------------------------------------------------------------------------------------------------------------------------------------------------------|
| `alignment`     | `VerticalAlignment`                                                                       | `undefined`         | 决定子元素在堆栈中的垂直对齐方式。所有子视图共享相同的垂直屏幕坐标。                                                                                        |
| `spacing`       | `number`                                                                                  | `undefined`（默认间距） | 邻近子视图之间的间距。如果设置为 `undefined`，堆栈将使用默认的间距值。                                                                                      |
| `pinnedViews`   | `'sectionHeaders'` \| `'sectionFooters'` \| `'sectionHeadersAndFooters'`                  | `undefined`         | 指定哪些子视图在滚动过程中固定在滚动视图的边界内。                                                                                                           |
| `children`      | `(VirtualNode \| undefined \| null \| (VirtualNode \| undefined \| null)[])[] \| VirtualNode` | `undefined`         | 要在堆栈中显示的内容。可接受一个或多个 `VirtualNode` 元素，包括数组以及可选的 `null` 或 `undefined` 值。                                                     |

---

## PinnedScrollViews

`PinnedScrollViews` 类型定义了哪些子视图可以在滚动时固定在滚动视图的边界内：

- `'sectionHeaders'`：仅固定节头部。
- `'sectionFooters'`：仅固定节尾部。
- `'sectionHeadersAndFooters'`：同时固定节头部和尾部。

---

## 使用示例

```tsx
import { LazyHStack, Text, ScrollView, Section } from 'scripting'

const Example = () => {
  return (
    <ScrollView
      axes="horizontal"
    >
      <LazyHStack
        alignment="center"
        spacing={10}
        pinnedViews="sectionHeaders"
      >
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
      </LazyHStack>
    </ScrollView>
  )
}
```

### 说明：

- 堆栈以 `10` 点的间距水平排列 `Section` 视图。
- `alignment` 属性使项目在堆栈中垂直居中。
- `pinnedViews` 属性确保节头部在滚动视图滚动时固定在顶部。

---

## 注意事项

- 懒加载通过仅在视图可见时创建视图来提高性能。
- 使用 `spacing` 调整项目之间的距离，使用 `alignment` 控制垂直对齐方式。
- `pinnedViews` 属性特别适用于类似表格的布局，其中头部或尾部需要在滚动时保持可见。

此 API 使您能够高效地处理水平增长的内容，同时提供布局和滚动行为的自定义选项。