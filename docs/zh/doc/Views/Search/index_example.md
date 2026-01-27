---
title: 示例

---

```tsx
import { List, Navigation, NavigationStack, Script, Text, useMemo, useState } from "scripting"

function Example() {
  const [searchText, setSearchText] = useState("")
  const languages = useMemo(() => [
    "Java",
    "Objective-C",
    "Swift",
    "Python",
    "JavaScript",
    "C++",
    "Ruby",
    "Lua"
  ], [])

  const filteredLanguages = useMemo(() => {
    if (searchText.length === 0) {
      return languages
    }

    const text = searchText.toLowerCase()

    return languages.filter(language =>
      language.toLowerCase().includes(text)
    )
  }, [searchText, languages])

  return <NavigationStack>
    <List
      navigationTitle={"Searchable List"}
      navigationBarTitleDisplayMode={"inline"}
      searchable={{
        value: searchText,
        onChanged: setSearchText,
      }}
    >
      {filteredLanguages.map(language =>
        <Text>{language}</Text>
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