---
title: 示例
description: 设置此视图中列表的样式。

---

```tsx
import { List, ListStyle, Navigation, NavigationStack, Picker, Script, Section, Text, useMemo, useState } from "scripting"

function Example() {
  const [listStyle, setListStyle] = useState<ListStyle>("automatic")
  const listStyleOptions = useMemo<ListStyle[]>(() => [
    "automatic",
    "bordered",
    "carousel",
    "elliptical",
    "grouped",
    "inset",
    "insetGroup",
    "plain",
    "sidebar",
  ], [])

  return <NavigationStack>
    <List
      navigationTitle={"List Style"}
      navigationBarTitleDisplayMode={"inline"}
      listStyle={listStyle}
    // listSectionSpacing={5} // apply for all sections
    >
      <Picker
        title={"ListStyle"}
        value={listStyle}
        onChanged={setListStyle as any}
        pickerStyle={"menu"}
      >
        {listStyleOptions.map(listStyle =>
          <Text tag={listStyle}>{listStyle}</Text>
        )}
      </Picker>

      <Section>
        <Text
          badge={10} // Use a badge to convey optional, supplementary information about a view
        >Recents</Text>
        <Text>Favorites</Text>
      </Section>

      <Section
        header={<Text>Colors</Text>}
        listItemTint={"systemBlue"}
      >
        <Text>Red</Text>
        <Text>Blue</Text>
      </Section>

      <Section
        header={<Text>Shapes</Text>}
      >
        <Text>Rectangle</Text>
        <Text>Circle</Text>
      </Section>

      <Section
        header={<Text>Borders</Text>}
        listSectionSpacing={10} // specify on an individual Section
      >
        <Text>Dashed</Text>
        <Text>Solid</Text>
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