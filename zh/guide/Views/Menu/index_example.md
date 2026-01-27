# 示例

```tsx
import { Button, Group, List, Menu, Navigation, NavigationStack, Script, ScrollView, Section, Text, VStack } from "scripting"

function Example() {

  return <NavigationStack>
    <List
      navigationTitle={"Menu"}
      navigationBarTitleDisplayMode={"inline"}
    >

      <Section
        header={
          <Text>Menu</Text>
        }
      >
        <Menu
          title={"Open Menu"}
        >
          <Button
            title="Rename"
            action={() => console.log("Rename")}
          />
          <Button
            title="Delete"
            role={"destructive"}
            action={() => console.log("Delete")}
          />
          <Menu title="Copy">
            <Button
              title="Copy"
              action={() => console.log("Copy")}
            />
            <Button
              title="Copy Formated"
              action={() => console.log("Copy fomatted")}
            />
          </Menu>
        </Menu>
      </Section>

      <Section
        header={
          <Text>ContextMenu</Text>
        }
      >
        <Text
          foregroundStyle={"link"}
          contextMenu={{
            menuItems: <Group>
              <Button
                title="Add"
                action={() => {
                  // Add
                }}
              />
              <Button
                title="Delete"
                role="destructive"
                action={() => {
                  // Delete
                }}
              />
            </Group>
          }}
        >Long Press to open context menu</Text>
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
