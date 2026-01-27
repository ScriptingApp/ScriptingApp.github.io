---
title: Example

---

```tsx
import { Gauge, List, Navigation, NavigationStack, Script, Section, Text } from "scripting"

function Example() {

  return <NavigationStack>
    <List
      navigationTitle={"Gauge"}
      navigationBarTitleDisplayMode={"inline"}
    >
      <Section
        header={
          <Text>accessoryCircular</Text>
        }
      >
        <Gauge
          value={0.4}
          label={<Text>0 100</Text>}
          currentValueLabel={<Text>40%</Text>}
          gaugeStyle={"accessoryCircular"}
          tint={"systemGreen"}
        />
      </Section>

      <Section
        header={
          <Text>accessoryCircularCapacity</Text>
        }
      >
        <Gauge
          value={0.4}
          label={<Text>Battery Level</Text>}
          currentValueLabel={<Text>40%</Text>}
          gaugeStyle={"accessoryCircularCapacity"}
        />
      </Section>

      <Section
        header={
          <Text>linearCapacity</Text>
        }
      >
        <Gauge
          value={0.4}
          label={<Text>Battery Level</Text>}
          currentValueLabel={<Text>40%</Text>}
          gaugeStyle={"linearCapacity"}
        />
      </Section>

      <Section
        header={
          <Text>accessoryLinear</Text>
        }
      >
        <Gauge
          value={0.4}
          label={<Text>Battery Level</Text>}
          currentValueLabel={<Text>40%</Text>}
          gaugeStyle={"accessoryLinear"}
        />
      </Section>
      <Section
        header={
          <Text>accessoryLinearCapacity</Text>
        }
      >
        <Gauge
          value={0.4}
          label={<Text>Battery Level</Text>}
          currentValueLabel={<Text>40%</Text>}
          gaugeStyle={"accessoryLinearCapacity"}
        />
      </Section>
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