# 示例

```tsx
import { Button, DisclosureGroup, List, Navigation, NavigationStack, Script, Text, Toggle, useState } from "scripting"

function Example() {
  const [topExpanded, setTopExpanded] = useState(true)
  const [oneIsOn, setOneIsOn] = useState(false)
  const [twoIsOn, setTwoIsOn] = useState(true)

  return <NavigationStack>
    <List
      navigationTitle={"DislcosureGroup"}
      navigationBarTitleDisplayMode={"inline"}
    >
      <Button
        title={"Toggle expanded"}
        action={() => setTopExpanded(!topExpanded)}
      />
      <DisclosureGroup
        title={"Items"}
        isExpanded={topExpanded}
        onChanged={setTopExpanded}
      >
        <Toggle
          title={"Toggle 1"}
          value={oneIsOn}
          onChanged={setOneIsOn}
        />
        <Toggle
          title={"Toggle 2"}
          value={twoIsOn}
          onChanged={setTwoIsOn}
        />

        <DisclosureGroup
          title={"Sub-items"}
        >
          <Text>Sub-item 1</Text>
        </DisclosureGroup>
      </DisclosureGroup>
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
