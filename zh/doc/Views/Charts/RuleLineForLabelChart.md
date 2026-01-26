# 标签线图（RuleLineForLabelChart）

`RuleLineForLabelChart` 用于在图表中根据标签（或日期）位置绘制垂直或水平的参考线。通常与其他图表类型（如 `BarChart` 或 `LineChart`）配合使用，用于高亮特定的分类或时间点。

***

## 类型定义

```ts
declare const RuleLineForLabelChart: FunctionComponent<{
  /**
   * 是否在 Y 轴显示标签。如果为 true，则参考线将水平绘制。默认为 false（垂直绘制）。
   */
  labelOnYAxis?: boolean;

  /**
   * 参考线标记数组，每个标记表示在哪个标签或日期处绘制参考线。
   */
  marks: Array<{
    /**
     * 要绘制参考线的位置，可以是字符串标签或 Date 类型。
     */
    label: string | Date;

    /**
     * 可选，仅在 label 为 Date 类型时有效，指定日期单位（如 'month', 'day'）。
     */
    unit?: CalendarComponent;
  } & ChartMarkProps>;
}>;
```

***

## 属性说明

| 属性名            | 类型        | 说明                                         |
| -------------- | --------- | ------------------------------------------ |
| `labelOnYAxis` | `boolean` | 是否在 Y 轴绘制标签。为 `true` 时参考线为 **水平线**，默认为垂直线。 |
| `marks`        | `Array`   | 包含多个参考线定义的数组，每个参考线可以包含样式配置，如颜色、不透明度等。      |

每个 `marks` 项支持以下属性：

- `label`：要绘制参考线的位置（字符串或日期）。
- `unit`：可选，仅用于日期类型。
- `foregroundStyle`：可选，线条颜色。
- `opacity`：可选，线条透明度。
- `lineStyle`：可选，自定义虚线样式（如 `[3, 2]` 表示3个点的实线和2个点的空格交替）。

***

## 示例：在柱状图中标记关键分类

```tsx
import {
  Chart,
  RuleLineForLabelChart,
  BarChart,
  Navigation,
  NavigationStack,
  Script,
  VStack
} from "scripting"

const data = [
  { label: "Q1", value: 1500 },
  { label: "Q2", value: 2300 },
  { label: "Q3", value: 1800 },
  { label: "Q4", value: 2700 },
]

const referenceLines = [
  { label: "Q2", foregroundStyle: "blue", lineStyle: { dash: [3, 2] } },
  { label: "Q4", foregroundStyle: "red", opacity: 0.5 },
]

function Example() {
  return (
    <NavigationStack>
      <VStack
        navigationTitle="带参考线的柱状图"
        navigationBarTitleDisplayMode="inline"
      >
        <Chart frame={{ height: 300 }}>
          <BarChart marks={data} />
          <RuleLineForLabelChart marks={referenceLines} />
        </Chart>
      </VStack>
    </NavigationStack>
  )
}

async function run() {
  await Navigation.present({ element: <Example /> })
  Script.exit()
}

run()
```

***

## 典型用途

- 在时间轴中高亮关键事件或时间点。
- 在分类图中划分视觉区域。
- 表示特殊标签、阈值或比较基准。
