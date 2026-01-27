---
title: 一维柱状图（Bar1DChart）

---
        
`Bar1DChart` 是一种一维条形图组件，用于在多个离散分类之间直观比较数值大小。每一个条形代表一个分类及其对应的数值，适合用于构建简洁的横向或纵向柱状对比图。

## 使用示例

```tsx
<Chart
  padding={0}
  frame={{ height: 400 }}
>
  <Bar1DChart
    marks={[
      { category: "Gadgets", value: 3800 },
      { category: "Gizmos", value: 4400 },
      { category: "Widgets", value: 6500 },
    ]}
  />
</Chart>
```

## 属性说明

### `labelOnYAxis?: boolean`

是否在 Y 轴上显示分类标签。当设置为 `true` 时，条形将以横向方式排列。
默认为 `false`，即在 X 轴上显示标签，条形图为纵向排列。

### `marks: Array<object>` **（必填）**

定义要渲染的每一个条形的数据项。每个标记包含以下字段：

* `category: string`
  条形所对应的分类名称。

* `value: number`
  条形的数值，用于决定长度。

* 其他可选的 `ChartMarkProps` 样式属性：
  可通过 `ChartMarkProps` 自定义样式和行为，包括：

  * `foregroundStyle`（颜色样式）
  * `opacity`（透明度）
  * `symbol`（图形符号）
  * `annotation`（注释）
  * `offset`（偏移位置）
  * `zIndex`（显示层级）等

## 示例代码

```tsx
const data = [
  { type: "Gadgets", profit: 3800 },
  { type: "Gizmos", profit: 4400 },
  { type: "Widgets", profit: 6500 },
]

function Example() {
  return <NavigationStack>
    <VStack
      navigationTitle={"Bar1DChart"}
      navigationBarTitleDisplayMode={"inline"}
    >
      <Chart
        padding={0}
        frame={{ height: 400 }}
      >
        <Bar1DChart
          marks={data.map(item => ({
            category: item.type,
            value: item.profit,
          }))}
        />
      </Chart>
    </VStack>
  </NavigationStack>
}
```

## 运行图表示例

```tsx
async function run() {
  await Navigation.present({
    element: <Example />
  })

  Script.exit()
}

run()
```

## 使用场景

`Bar1DChart` 适用于：

* 比较多个分类项的数值差异
* 展示排行榜、排序结果等
* 以极简方式可视化清晰、有限的数据集
