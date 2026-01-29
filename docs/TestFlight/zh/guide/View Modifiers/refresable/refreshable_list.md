---
title: 示例
description: 将可滚动视图标记为可刷新，允许用户下拉以触发异步的数据刷新操作。

---

```tsx
import { List, Navigation, NavigationStack, Script, Section, Text, useState } from "scripting"

function Example() {
  const [data, setData] = useState(generateRandomList)

  function generateRandomList() {
    const data: number[] = []
    const count = Math.ceil(Math.random() * 100 + 10)

    for (let i = 0; i < count; i++) {
      const num = Math.ceil(Math.random() * 1000)
      data.push(num)
    }

    return data
  }

  async function refresh() {
    return new Promise<void>(resolve => {
      setTimeout(() => {
        setData(generateRandomList())
        resolve()
      }, 1000 * 2)
    })
  }

  return <NavigationStack>
    <List
      navigationTitle={"Refreshable List"}
      navigationBarTitleDisplayMode={"inline"}
      refreshable={refresh}
    >
      <Section header={
        <Text textCase={null}>Pull down to refresh</Text>
      }>
        {data.map(item =>
          <Text>Number: {item}</Text>
        )}
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