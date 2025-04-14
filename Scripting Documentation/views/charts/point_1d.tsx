import { Chart, List, Navigation, NavigationStack, Point1DChart, Script, Section, Toggle, useState, } from "scripting"

const data = [
  { value: 0.3 },
  { value: 0.6 },
  { value: 0.9 },
  { value: 1.3 },
  { value: 1.7 },
  { value: 1.9 },
  { value: 2 },
  { value: 2.2 },
  { value: 3 },
  { value: 4 },
  { value: 5 },
  { value: 5.2 },
  { value: 5.5 },
  { value: 6 },
]

function Example() {
  const [horizontal, setHorizontal] = useState(false)

  return <NavigationStack>
    <List
      navigationTitle={"Point1DChart"}
      navigationBarTitleDisplayMode={"inline"}
    >
      <Section>
        <Toggle
          title={"Horizontal"}
          value={horizontal}
          onChanged={setHorizontal}
        />
      </Section>
      <Chart>
        <Point1DChart
          horizontal={horizontal}
          marks={data}
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