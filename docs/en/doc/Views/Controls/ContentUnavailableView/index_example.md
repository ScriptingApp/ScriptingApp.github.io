---
title: Example

---

```tsx
import { useState, List, ContentUnavailableView, Button, Text, NavigationStack, Navigation, Script } from "scripting"

function Example() {
  const [list, setList] = useState<string[]>([])

  return <NavigationStack>
    <List
      navigationTitle={"ContentUnavailableView"}
      navigationBarTitleDisplayMode={"inline"}
      overlay={
        list.length ? undefined
          : <ContentUnavailableView
            title="No data"
            systemImage="tray.fill"
          />
      }
      toolbar={{
        bottomBar: [
          <Button
            title="Add"
            action={() => {
              setList(list => {
                let newList = [
                  (Math.random() * 1000 | 0).toString(),

                  ...list
                ]
                return newList
              })
            }}
          />,
          <Button
            title="Clear"
            action={() => {
              setList([])
            }}
          />
        ]
      }}
    >
      {list.map(name => <Text>{name}</Text>)}
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