# 多个图表示例

本示例展示了如何在同一个图表中结合多种图表类型（折线图、面积图、参考线图），并根据用户交互动态展示注解内容，打造具有交互性的可视化图表。

## 示例代码

```tsx
const data = [
  { sales: 1200, year: '2020', growth: 0.14, },
  { sales: 1400, year: '2021', growth: 0.16, },
  { sales: 2000, year: '2022', growth: 0.42, },
  { sales: 2500, year: '2023', growth: 0.25, },
  { sales: 3600, year: '2024', growth: 0.44, },
]

function Example() {
  const [chartSelection, setChartSelection] = useState<string | null>()
  const selectedItem = useMemo(() => {
    if (chartSelection == null) {
      return null
    }
    return data.find(item => item.year === chartSelection)
  }, [chartSelection])

  return <NavigationStack>
    <VStack
      navigationTitle={"Multiple Charts"}
      navigationBarTitleDisplayMode={"inline"}
    >
      <Text>
        Press and move on the chart to view the details.
      </Text>
      <Chart
        frame={{
          height: 300,
        }}
        chartXSelection={{
          value: chartSelection,
          onChanged: setChartSelection,
          valueType: "string"
        }}
      >
        <LineChart
          marks={data.map(item => ({
            label: item.year,
            value: item.sales,
            interpolationMethod: "catmullRom",
            symbol: "circle",
          }))}
        />
        <AreaChart
          marks={data.map(item => ({
            label: item.year,
            value: item.sales,
            interpolationMethod: "catmullRom",
            foregroundStyle: ["rgba(255,100,0,1)", "rgba(255,100,0,0.2)"]
          }))}
        />
        {selectedItem != null
          ? <RuleLineForLabelChart
            marks={[{
              label: selectedItem.year,
              foregroundStyle: { color: "gray", opacity: 0.5 },
              annotation: {
                position: "top",
                overflowResolution: {
                  x: "fit",
                  y: "disabled"
                },
                content: <ZStack
                  padding
                  background={
                    <RoundedRectangle
                      cornerRadius={4}
                      fill={"regularMaterial"}
                    />
                  }
                >
                  <Text
                    foregroundStyle={"white"}
                  >Sales: {selectedItem.sales}</Text>
                </ZStack>
              }
            }]}
          />
          : null}
      </Chart>
    </VStack>
  </NavigationStack>
}
```

## 总览

本示例中使用了以下组件：

- [`LineChart`](#折线图)：绘制离散点并以平滑曲线连接。
- [`AreaChart`](#面积图)：在曲线下方填充区域，增强视觉效果。
- [`RuleLineForLabelChart`](#标签参考线图)：在选中的标签位置绘制参考线并添加注解。
- `chartXSelection`：启用用户在图表上的交互选择。

***

## 数据格式

本示例使用的数据结构如下：

```ts
const data = [
  { sales: 1200, year: '2020', growth: 0.14 },
  { sales: 1400, year: '2021', growth: 0.16 },
  { sales: 2000, year: '2022', growth: 0.42 },
  { sales: 2500, year: '2023', growth: 0.25 },
  { sales: 3600, year: '2024', growth: 0.44 },
]
```

每条数据包含：

- `sales`：销售额，作为主要数值
- `year`：年份，用作 X 轴标签
- `growth`：增长率（本例未用于图表展示）

***

## 主要功能

### 图表选择功能

```tsx
chartXSelection={{
  value: chartSelection,
  onChanged: setChartSelection,
  valueType: "string"
}}
```

- 允许用户在图表上点击或拖动，选中某个横轴标签（`year`）。
- 使用 `setChartSelection` 设置当前选择项。

### 折线图（LineChart）

```tsx
<LineChart
  marks={data.map(item => ({
    label: item.year,
    value: item.sales,
    interpolationMethod: "catmullRom",
    symbol: "circle",
  }))}
/>
```

- 以圆形符号表示每个数据点，并用平滑曲线连接。
- 使用 `"catmullRom"` 插值方法使曲线更自然平滑。

### 面积图（AreaChart）

```tsx
<AreaChart
  marks={data.map(item => ({
    label: item.year,
    value: item.sales,
    interpolationMethod: "catmullRom",
    foregroundStyle: ["rgba(255,100,0,1)", "rgba(255,100,0,0.2)"]
  }))}
/>
```

- 覆盖在折线图之下的区域，增强趋势的视觉表达。
- 应用了从橙色不透明到透明的渐变填充。

### 标签参考线图（RuleLineForLabelChart）

```tsx
<RuleLineForLabelChart
  marks={[{
    label: selectedItem.year,
    foregroundStyle: { color: "gray", opacity: 0.5 },
    annotation: {
      position: "top",
      overflowResolution: { x: "fit", y: "disabled" },
      content: <ZStack
        padding
        background={<RoundedRectangle cornerRadius={4} fill={"regularMaterial"} />}
      >
        <Text foregroundStyle={"white"}>Sales: {selectedItem.sales}</Text>
      </ZStack>
    }
  }]}
/>
```

- 在用户选中的年份上绘制一条灰色参考线。
- 上方浮动注解展示销售额数据。
- 使用 `ZStack` 和 `RoundedRectangle` 构建注解背景样式。

***

## 交互流程

1. 用户触摸图表。
2. 系统根据触摸位置更新 `chartSelection`。
3. 使用 `useMemo` 查找对应的数据项。
4. 在相应位置绘制参考线。
5. 展示注解气泡显示详细数据（如 `Sales: 2500`）。

***

## 总结

通过本示例你可以学习如何：

- 在同一图表中组合多个图表（如折线图、面积图、参考线图）。
- 通过 `chartXSelection` 响应用户交互。
- 使用 `annotation` 显示动态注解内容。
- 利用渐变、透明度、圆角背景等样式增强展示效果。

该模式非常适合用于数据仪表盘、年度报告等需要交互性和可视化解释的数据展示场景。
