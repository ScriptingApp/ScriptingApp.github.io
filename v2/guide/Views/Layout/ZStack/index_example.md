# Example

```tsx
import { Button, Circle, Color, List, Navigation, NavigationLink, NavigationStack, Rectangle, Script, Section, Text, VStack, ZStack } from "scripting"

function Example() {
  const colors: Color[] = [
    "red",
    "orange",
    "yellow",
    "green",
    "blue",
    "purple",
  ]

  return <NavigationStack>
    <List
      navigationTitle={"ZStack"}
    >
      <Section
        header={
          <Text
            textCase={null}
          >ZStack</Text>
        }
      >
        <ZStack>
          {colors.map((color, index) =>
            <Rectangle
              fill={color}
              frame={{
                width: 100,
                height: 100,
              }}
              offset={{
                x: index * 10,
                y: index * 10
              }}
            />
          )}
        </ZStack>
      </Section>

      <Section
        header={
          <Text
            textCase={null}
          >background</Text>
        }
      >
        <Text
          background={{
            content: <Rectangle
              fill={"systemBlue"}
              frame={{
                width: 100,
                height: 50,
              }}
            />,
            alignment: "center",
          }}
        >Hello Scripting!</Text>
      </Section>

      <Section
        header={
          <Text
            textCase={null}
          >overlay</Text>
        }
      >
        <Circle
          fill={"yellow"}
          frame={{
            width: 100,
            height: 100,
          }}
          overlay={{
            content: <Rectangle
              fill={"blue"}
              frame={{
                width: 50,
                height: 50,
              }}
            />,
            alignment: "center"
          }}
        />
      </Section>

      <Section
        title={"containerBackground (iOS 18.0+)"}
      >
        <Button
          title={"Present"}
          action={() => {
            Navigation.present({
              element: <ContainerBackgroundExample />,
              modalPresentationStyle: "pageSheet"
            })
          }}
        />
      </Section>
    </List>
  </NavigationStack>
}

function ContainerBackgroundExample() {
  const dismiss = Navigation.useDismiss()

  return <NavigationStack>
    <List
      navigationTitle={"containerBackground"}
      navigationBarTitleDisplayMode={"inline"}
      toolbar={{
        cancellationAction: <Button
          title={"Done"}
          action={dismiss}
        />,
      }}
    >
      <NavigationLink
        title={"Red Page"}
        destination={
          <VStack
            navigationContainerBackground={"red"}
            frame={{
              maxWidth: 'infinity',
              maxHeight: 'infinity'
            }}
          >
            <Text>A red page</Text>
          </VStack>
        }
      />
      <NavigationLink
        title={"Blue Page"}
        destination={
          <VStack
            navigationContainerBackground={"blue"}
            frame={{
              maxWidth: 'infinity',
              maxHeight: 'infinity'
            }}
          >
            <Text>A blue page</Text>
          </VStack>
        }
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
