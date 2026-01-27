---
title: 示例

---

```tsx
import { List, Navigation, NavigationStack, ProgressView, Script, Section, Text, useState, } from "scripting"

function Example() {
  const [timerFrom] = useState(() => Date.now())
  const timerTo = timerFrom + 1000 * 60

  return <NavigationStack>
    <List
      navigationTitle={"ProgressView"}
      navigationBarTitleDisplayMode={"inline"}
    >
      <Section
        header={
          <Text>circular</Text>
        }
      >
        <ProgressView
          progressViewStyle={'circular'}
        />
      </Section>

      <Section
        header={
          <Text>linear</Text>
        }
      >
        <ProgressView
          progressViewStyle={'linear'}
          total={100}
          value={50}
          label={<Text>Progress 50%</Text>}
          currentValueLabel={<Text>50</Text>}
        />
      </Section>

      <Section
        header={
          <Text>TimerInterval</Text>
        }
      >
        <ProgressView
          progressViewStyle={'linear'}
          timerFrom={timerFrom}
          timerTo={timerTo}
          countsDown={false}
          label={<Text>Workout</Text>}
        />
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