---
title: 甘特柱状图（BarGanttChart）
description: 一个将数据表示为水平条形的图表，通常用于表示项目进度或时间线。

---
        
`BarGanttChart`（甘特条形图）组件用于可视化多个分类下的时间区间，非常适合展示日程安排、任务持续时间或项目时间线。每条条形从 `start` 延伸至 `end`，表示某项任务或事件在时间轴上的跨度。

## 使用示例

```tsx
<Chart frame={{ height: 400 }}>
  <BarGanttChart
    labelOnYAxis
    marks={[
      { label: "Job 1", start: 0, end: 15 },
      { label: "Job 2", start: 5, end: 25 },
      ...
    ]}
  />
</Chart>
```

## 属性说明

### `labelOnYAxis?: boolean`

是否在 Y 轴显示分类标签。当为 `true` 时，图表将以横向方式绘制（即典型甘特图布局），条形沿 X 轴表示时间跨度。
默认为 `false`，即条形纵向排列，标签显示在 X 轴。

### `marks: Array<object>` **（必填）**

定义要渲染的时间区间。每个对象必须包含以下字段：

* `label: string`
  条形所代表的分类名称（例如任务名或工种）。

* `start: number`
  条形的起始位置，通常代表开始时间或起点值。

* `end: number`
  条形的结束位置，代表结束时间或终点值。图表将绘制一条从 `start` 到 `end` 的条形。

你也可以提供其他 `ChartMarkProps` 来自定义样式和行为。

## 示例代码

```tsx
const data = [
  { job: "Job 1", start: 0, end: 15 },
  { job: "Job 2", start: 5, end: 25 },
  { job: "Job 1", start: 20, end: 35 },
  { job: "Job 1", start: 40, end: 55 },
  { job: "Job 2", start: 30, end: 60 },
  { job: "Job 2", start: 30, end: 60 },
]

function Example() {
  return <NavigationStack>
    <VStack
      navigationTitle={"BarGanttChart"}
      navigationBarTitleDisplayMode={"inline"}
    >
      <Chart frame={{ height: 400 }}>
        <BarGanttChart
          labelOnYAxis
          marks={data.map(item => ({
            label: item.job,
            start: item.start,
            end: item.end,
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

`BarGanttChart` 非常适用于：

* 项目计划与任务排程
* 展示任务重叠与时间持续分布
* 表达资源在时间轴上的分配情况
