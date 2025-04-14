---
title: 示例
---
```tsx
import { Button, HStack, Image, LiveActivity, LiveActivityState, Navigation, NavigationStack, Script, Text, useMemo, useState, VStack } from "scripting"

function Example() {
  const dismiss = Navigation.useDismiss()

  const [state, setState] = useState<LiveActivityState>()
  const activity = useMemo(() => {
    const activity = new LiveActivity((attributes: {
      mins: number
    }) => {

      return {
        content: <HStack>
          <Image systemName={"clock"} />
          <Text>{attributes.mins}minutes left until next drink</Text>
        </HStack>,
        compactLeading: <HStack>
          <Image systemName={"clock"} />
          <Text>{attributes.mins}mins</Text>
        </HStack>,
        compactTrailing: <Image systemName={"waterbottle"} foregroundStyle={"systemBlue"} />,
        minimal: <Image systemName={"clock"} />,
        expanded: {
          center: <HStack>
            <Image systemName={"clock"} />
            <Text>{attributes.mins}minutes left until next drink</Text>
          </HStack>,
        }
      }
    })

    activity.addUpdateListener(setState)

    return activity
  }, [])

  return <NavigationStack>
    <VStack
      navigationTitle={"LiveActivity Example"}
      navigationBarTitleDisplayMode={"inline"}
      toolbar={{
        cancellationAction: <Button
          title={"Done"}
          action={dismiss}
        />
      }}
    >
      <Text>Activity State: {state ?? '-'}</Text>
      <Button
        title={"Start Live Activity"}
        disabled={state != null}
        action={() => {
          let count = 5
          activity.start({ mins: count })

          function startTimer() {
            setTimeout(() => {
              count -= 1
              if (count === 0) {
                activity.end({ mins: 0 })
              } else {
                activity.update({ mins: count })
                startTimer()
              }
            }, 60000)
          }

          startTimer()
        }}
      />
    </VStack>
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