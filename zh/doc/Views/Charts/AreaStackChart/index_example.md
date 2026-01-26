# 示例

```tsx
import { AreaStackChart, Chart, ChartMarkStackingMethod, Navigation, NavigationStack, Picker, Script, Text, useState, VStack } from "scripting"

const data = [
  { name: "Burger", price: 0.07, year: 1960 },
  { name: "Cheese", price: 0.03, year: 1960 },
  { name: "Bun", price: 0.05, year: 1960 },

  { name: "Burger", price: 0.10, year: 1970 },
  { name: "Cheese", price: 0.04, year: 1970 },
  { name: "Bun", price: 0.06, year: 1970 },

  { name: "Burger", price: 0.15, year: 1980 },
  { name: "Cheese", price: 0.10, year: 1980 },
  { name: "Bun", price: 0.1, year: 1980 },

  { name: "Burger", price: 0.23, year: 1990 },
  { name: "Cheese", price: 0.12, year: 1990 },
  { name: "Bun", price: 0.13, year: 1990 },

  { name: "Burger", price: 0.32, year: 2000 },
  { name: "Cheese", price: 0.15, year: 2000 },
  { name: "Bun", price: 0.15, year: 2000 },

  { name: "Burger", price: 0.49, year: 2010 },
  { name: "Cheese", price: 0.20, year: 2010 },
  { name: "Bun", price: 0.19, year: 2010 },

  { name: "Burger", price: 0.60, year: 2020 },
  { name: "Cheese", price: 0.26, year: 2020 },
  { name: "Bun", price: 0.24, year: 2020 },
]

const stackings: ChartMarkStackingMethod[] = [
  'center',
  'normalized',
  'standard',
  'unstacked'
]

function Example() {
  const [stacking, setStacking] = useState<ChartMarkStackingMethod>('standard')

  return <NavigationStack>
    <VStack
      navigationTitle={"AreaStackChart"}
      navigationBarTitleDisplayMode={"inline"}
    >
      <Picker
        title={"StackingMethod"}
        value={stacking}
        onChanged={setStacking as any}
        pickerStyle={"menu"}
      >
        {stackings.map(item =>
          <Text tag={item}>{item}</Text>
        )}
      </Picker>
      <Chart
        frame={{
          height: 300
        }}
      >
        <AreaStackChart
          marks={data.map(item => ({
            category: item.name,
            label: item.year.toString(),
            value: item.price,
            stacking: stacking,
          }))}
        />
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
