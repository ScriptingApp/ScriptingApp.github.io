# Example

```tsx
import { Color, EditButton, ForEach, List, Navigation, NavigationStack, Script, Text, useState } from "scripting"

function Example() {
  const [colors, setColors] = useState<Color[]>([
    "red",
    "orange",
    "yellow",
    "green",
    "blue",
    "purple",
  ])

  function onDelete(indices: number[]) {
    setColors(colors.filter((_, index) => !indices.includes(index)))
  }

  function onMove(indices: number[], newOffset: number) {
    const movingItems = indices.map(index => colors[index])
    const newColors = colors.filter((_, index) => !indices.includes(index))
    newColors.splice(newOffset, 0, ...movingItems)
    setColors(newColors)
  }

  return <NavigationStack>
    <List
      navigationTitle={"Editable List"}
      navigationBarTitleDisplayMode={"inline"}
      toolbar={{
        confirmationAction: [
          <EditButton />,
        ]
      }}
    >
      <ForEach
        count={colors.length}
        itemBuilder={index =>
          <Text
            key={colors[index]} // Must provide a unique key!!!
          >{colors[index]}</Text>
        }
        onDelete={onDelete}
        onMove={onMove}
      />
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
