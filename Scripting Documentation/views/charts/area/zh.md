`AreaChart`（面积图）组件以填充曲线的形式展示数据，通过填充区域的大小来强调数值随时间或分类的变化趋势。适用于展示连续数据的趋势变化或累计值。

## 使用示例

```tsx
<Chart>
  <AreaChart
    labelOnYAxis={false}
    marks={[
      { label: "jan/22", value: 5 },
      { label: "feb/22", value: 4 },
      ...
    ]}
  />
</Chart>
```

## 属性说明

### `labelOnYAxis?: boolean`

是否将标签显示在 **Y 轴** 上。当设置为 `true` 时，图表将以横向方式绘制。
默认值为 `false`，表示标签显示在 X 轴，图表为纵向展示。

### `marks: Array<object>` **（必填）**

定义要在图表中显示的数据点数组。每个数据点包含以下字段：

* `label: string | Date`
  数据点的标签，用作横轴或纵轴的标识，具体取决于 `labelOnYAxis` 设置。

* `value: number`
  数据点对应的数值。

* `unit?: CalendarComponent`
  （可选）用于时间序列的单位，如 `"month"`、`"year"` 等。

* 其他可选的 `ChartMarkProps` 样式属性：
  `AreaChart` 支持通过 `ChartMarkProps` 进行进一步样式自定义，包括：

  * `foregroundStyle`（前景样式）
  * `opacity`（透明度）
  * `symbol`（标记符号）
  * `annotation`（注释）
  * `offset`（偏移）
  * 等更多样式设置

## 示例代码

```tsx
function Example() {
  const [labelOnYAxis, setLabelOnYAxis] = useState(false)

  return <NavigationStack>
    <VStack
      navigationTitle={"AreaChart"}
      navigationBarTitleDisplayMode={"inline"}
    >
      <Toggle
        title={"labelOnYAxis"}
        value={labelOnYAxis}
        onChanged={setLabelOnYAxis}
      />
      <Divider />
      <Chart>
        <AreaChart
          labelOnYAxis={labelOnYAxis}
          marks={[
            { label: "jan/22", value: 5 },
            { label: "feb/22", value: 4 },
            { label: "mar/22", value: 7 },
            { label: "apr/22", value: 15 },
            { label: "may/22", value: 14 },
            { label: "jun/22", value: 27 },
            { label: "jul/22", value: 27 },
          ]}
        />
      </Chart>
    </VStack>
  </NavigationStack>
}
```

## 运行示例

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

`AreaChart` 适合用于：

* 展示一段时间内的趋势变化（如月度数据）
* 显示累计增长或衰减
* 通过填充面积强调数据量级
