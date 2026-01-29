---
title: 示例
description: 绘制圆形、矩形等形状，并可使用自定义路径来定义自己设计的形状。

---

```tsx
import { Capsule, Circle, Ellipse, List, Navigation, NavigationStack, Rectangle, RoundedRectangle, Script, Section, Text, UnevenRoundedRectangle, } from "scripting"

function Example() {

  return <NavigationStack>
    <List
      navigationTitle={"Shapes"}
      navigationBarTitleDisplayMode={"inline"}
    >
      <Section
        header={
          <Text>Rectangle</Text>
        }
      >
        <Rectangle
          fill={"orange"}
          stroke={{
            shapeStyle: "red",
            strokeStyle: {
              lineWidth: 3,
            }
          }}
          frame={{
            width: 100,
            height: 100,
          }}
        />
      </Section>

      <Section
        header={
          <Text>RoundedRectangle</Text>
        }
      >
        <RoundedRectangle
          fill={"blue"}
          cornerRadius={16}
          frame={{
            width: 100,
            height: 100,
          }}
        />
      </Section>

      <Section
        header={
          <Text>Circle</Text>
        }
      >
        <Circle
          stroke={{
            shapeStyle: "purple",
            strokeStyle: {
              lineWidth: 4,
            }
          }}
          frame={{
            width: 100,
            height: 100,
          }}
        />
      </Section>

      <Section
        header={
          <Text>Capsule</Text>
        }
      >
        <Capsule
          fill={"systemIndigo"}
          frame={{
            width: 100,
            height: 40,
          }}
        />
      </Section>

      <Section
        header={
          <Text>Ellipse</Text>
        }
      >
        <Ellipse
          fill={"green"}
          frame={{
            width: 40,
            height: 100,
          }}
        />
      </Section>

      <Section
        header={
          <Text>UnevenRoundedRectangle</Text>
        }
      >
        <UnevenRoundedRectangle
          fill={"brown"}
          topLeadingRadius={16}
          topTrailingRadius={0}
          bottomLeadingRadius={0}
          bottomTrailingRadius={16}
          frame={{
            width: 100,
            height: 50,
          }}
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