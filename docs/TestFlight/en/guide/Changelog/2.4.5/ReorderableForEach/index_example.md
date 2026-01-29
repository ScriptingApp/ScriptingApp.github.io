---
title: Example
description: A high-level component in Scripting that provides built-in drag-to-reorder capability.

---

```tsx
import { Button, Navigation, NavigationStack, Script, Text, ScrollView, useObservable, LazyVGrid, ReorderableForEach, RoundedRectangle, VStack, Toolbar, ToolbarItem, modifiers, Color } from "scripting"

type Item = {
  id: string
  color: Color
}

const colors: Color[] = [
  'systemRed',
  'systemBlue',
  'systemGreen',
  'systemPink',
  'systemOrange',
  'systemPurple',
]

function ItemView({
  item
}: {
  item: Item
}) {

  return <VStack
    modifiers={
      modifiers()
        .frame({
          height: 80
        })
        .frame({
          maxWidth: 'infinity'
        })
        .background(
          <RoundedRectangle
            cornerRadius={16}
            fill={item.color}
          />
        )
        .contentShape({
          kind: 'dragPreview',
          shape: {
            type: 'rect',
            cornerRadius: 16
          }
        })
    }
  >
    <Text
      foregroundStyle="white"
      font="title"
    >{item.id}</Text>
  </VStack>
}

function View() {
  // Access dismiss function.
  const dismiss = Navigation.useDismiss()

  const data = useObservable<Item[]>(() => {
    return new Array(30)
      .fill(0)
      .map((_, index) => ({
        id: String(index),
        color: colors[index % colors.length]
      }))
  })

  const active = useObservable<Item | null>(null)

  const onMove = (indices: number[], newOffset: number) => {
    const movingItems = indices.map(index => data.value[index])
    const newValue = data.value.filter((_, index) => !indices.includes(index))
    newValue.splice(newOffset, 0, ...movingItems)
    data.setValue(newValue)
  }

  return <NavigationStack>
    <ScrollView
      navigationTitle="ReorderableForEach demo"
      toolbar={
        <Toolbar>
          <ToolbarItem
            placement="topBarLeading"
          >
            <Button
              title="Close"
              action={dismiss}
            />
          </ToolbarItem>
        </Toolbar>
      }
    >
      <LazyVGrid
        columns={[
          {
            size: {
              type: 'flexible'
            }
          },
          {
            size: {
              type: 'flexible'
            }
          }
        ]}
        padding={{
          horizontal: true
        }}
      >
        <ReorderableForEach
          active={active}
          data={data.value}
          builder={(item) =>
            <ItemView
              item={item}
            />
          }
          onMove={onMove}
        />
      </LazyVGrid>
    </ScrollView>
  </NavigationStack>
}

async function run() {
  // Present view.
  await Navigation.present({
    element: <View />
  })

  // Avoiding memory leaks.
  Script.exit()
}

run()
```