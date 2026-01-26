# 示例

```tsx
import { AreaChart, Chart, LineChart, Navigation, NavigationStack, RoundedRectangle, RuleLineForLabelChart, Script, Text, useMemo, useState, VStack, ZStack } from "scripting"

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

async function run() {
  await Navigation.present({
    element: <Example />
  })

  Script.exit()
}

run()
```
