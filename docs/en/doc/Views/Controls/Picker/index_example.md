---
title: Example

---

```tsx
import { List, Navigation, NavigationStack, Picker, PickerStyle, Script, Section, Text, useMemo, useState, } from "scripting"

function Example() {
  const [value, setValue] = useState<number>(0)
  const options = useMemo<PickerStyle[]>(() => [
    'automatic',
    'inline',
    'menu',
    'navigationLink',
    'palette',
    'segmented',
    'wheel'
  ], [])
  const users = useMemo<string[]>(() => [
    "Jobs", "Elon", "Zack", "Joe"
  ], [])

  return <NavigationStack>
    <List
      navigationTitle={"Picker"}
      navigationBarTitleDisplayMode={"inline"}
    >
      {options.map((style) =>
        <Section
          header={
            <Text>Picker: {style}</Text>}
        >
          <Picker
            title={"Picker: " + style}
            pickerStyle={style}
            value={value}
            onChanged={setValue}
          >
            {users.map((user, index) =>
              <Text
                tag={index}
              >{user}</Text>
            )}
          </Picker>
        </Section>
      )}
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