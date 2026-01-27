# Example

```tsx
import { useState, useMemo, Color, Stepper, Text, VStack, RoundedRectangle, HStack, Spacer, NavigationStack, Navigation, Script } from "scripting"

function Example() {
  const [value, setValue] = useState(0)
  const colors = useMemo<Color[]>(() => ['blue', 'red', 'green', 'purple'], [])
  const color = colors[value]

  function incrementStep() {
    if (value + 1 >= colors.length) {
      setValue(0)
    } else {
      setValue(value + 1)
    }
  }

  function decrementStep() {
    if (value - 1 < 0) {
      setValue(colors.length - 1)
    } else {
      setValue(value - 1)
    }
  }

  return <NavigationStack>
    <VStack
      navigationTitle={"Stepper"}
      navigationBarTitleDisplayMode={"inline"}
    >
      <Stepper
        title={"Stepper"}
        onIncrement={incrementStep}
        onDecrement={decrementStep}
      />
      <HStack>
        <Text>Value: {value}</Text>
        <Spacer />
        <RoundedRectangle
          fill={color}
          cornerRadius={4}
          frame={{
            width: 120,
            height: 30
          }}
        />
      </HStack>
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
