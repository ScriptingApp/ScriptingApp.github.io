import { AreaChart, Chart, Divider, Navigation, NavigationStack, Script, Toggle, useState, VStack } from "scripting"

const data = [
  { label: "jan/22", value: 5 },
  { label: "feb/22", value: 4 },
  { label: "mar/22", value: 7 },
  { label: "apr/22", value: 15 },
  { label: "may/22", value: 14 },
  { label: "jun/22", value: 27 },
  { label: "jul/22", value: 27 },
]

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
          marks={data}
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