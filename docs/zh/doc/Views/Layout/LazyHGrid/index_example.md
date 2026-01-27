---
title: 示例

---

```tsx
import { Color, LazyHGrid, Navigation, NavigationStack, RoundedRectangle, Script, ScrollView, Text, useMemo, VStack } from "scripting"

function Example() {
  const colors = useMemo(() => {
    const colors: {
      name: string
      value: Color
    }[] = []

    const numToHex = (n: number) => {
      return n === 0 ? '00' : n.toString(16)
    }

    for (let r = 0x00; r <= 0xff; r += 0x11) {
      for (let g = 0x00; g <= 0xff; g += 0x11) {
        for (let b = 0x00; b <= 0xff; b += 0x11) {
          const name = `${numToHex(r)}${numToHex(g)}${numToHex(b)}`
          const value: Color = `#${name}`
          colors.push({
            name,
            value
          })
        }
      }
    }

    return colors
  }, [])

  return <NavigationStack>
    <ScrollView
      navigationTitle={"LazyHGrid"}
      navigationBarTitleDisplayMode={"inline"}
      axes={"horizontal"}
    >
      <LazyHGrid
        spacing={2}
        rows={[
          { size: 100 },
          { size: 100 },
          { size: 100 },
          { size: 100 },
        ]}
      >
        {colors.map((color) =>
          <VStack>
            <Text>
              {color.name}
            </Text>
            <RoundedRectangle
              fill={color.value}
              cornerRadius={4}
              frame={{
                width: 50,
                height: 50
              }}
            />
          </VStack>
        )}
      </LazyHGrid>
    </ScrollView>
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