---
title: ControlGroup
description: A container view that displays semantically-related controls in a visually-appropriate manner for the context.

---

```tsx
import { Button, ControlGroup, ControlGroupStyle, Label, List, Navigation, NavigationStack, Picker, Script, Text, useMemo, useState } from "scripting"

function Example() {
  const dismiss = Navigation.useDismiss()
  const [style, setStyle] = useState<ControlGroupStyle>("palette")
  const styles = useMemo<ControlGroupStyle[]>(() => [
    'automatic',
    'compactMenu',
    'menu',
    'navigation',
    'palette'
  ], [])

  return <NavigationStack>
    <List
      navigationTitle={"ControlGroup"}
      navigationBarTitleDisplayMode={"inline"}
      toolbar={{
        cancellationAction: <Button
          title={"Done"}
          action={dismiss}
        />,
        confirmationAction: [
          <ControlGroup
            label={
              <Label
                title={"Plus"}
                systemImage={"plus"}
              />
            }
            controlGroupStyle={style}
          >
            <Button
              title={"Edit"}
              systemImage={"pencil"}
              action={() => { }}
            />
            <Button
              title={"Delete"}
              systemImage={"trash"}
              role={"destructive"}
              action={() => { }}
            />
          </ControlGroup>
        ]
      }}
    >
      <Picker
        title={"Control Group Style"}
        value={style}
        onChanged={setStyle as any}
      >
        {styles.map(style =>
          <Text tag={style}>{style}</Text>
        )}
      </Picker>
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