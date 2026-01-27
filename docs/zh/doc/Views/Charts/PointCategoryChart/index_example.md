---
title: 示例

---

```tsx
import { Chart, List, Navigation, NavigationStack, Picker, PointCategoryChart, Script, Text, useState, VStack } from "scripting"

const favoriteFruitsData = [
  { fruit: 'Apple', age: 10, count: 42 },
  { fruit: 'Apple', age: 20, count: 37 },
  { fruit: 'Apple', age: 30, count: 11 },

  { fruit: 'Bananer', age: 10, count: 23 },
  { fruit: 'Bananer', age: 20, count: 58 },
  { fruit: 'Bananer', age: 30, count: 79 },

  { fruit: 'Orange', age: 10, count: 36 },
  { fruit: 'Orange', age: 20, count: 24 },
  { fruit: 'Orange', age: 30, count: 62 },
]

function Example() {
  const [representsDataUsing, setRepresentsDataUsing] = useState<string>('foregroundStyle')
  const options: string[] = [
    'foregroundStyle',
    'symbol',
    'symbolSize'
  ]

  return <NavigationStack>
    <List
      navigationTitle={"PointCategoryChart"}
      navigationBarTitleDisplayMode={"inline"}
    >
      <Picker
        title={"representsDataUsing"}
        value={representsDataUsing}
        onChanged={setRepresentsDataUsing}
        pickerStyle={"menu"}
      >
        {options.map(option =>
          <Text tag={option}>{option}</Text>
        )}
      </Picker>
      <Chart
        frame={{
          height: 300
        }}
      >
        <PointCategoryChart
          representsDataUsing={representsDataUsing as any}
          marks={favoriteFruitsData.map(item => ({
            category: item.fruit,
            x: item.age,
            y: item.count,
          }))}
        />
      </Chart>
    </List>
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