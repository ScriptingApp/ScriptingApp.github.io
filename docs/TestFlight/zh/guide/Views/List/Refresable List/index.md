---
title: 可刷新列表
description: 为列表中的行添加下拉刷新

---
        
将可滚动视图标记为 **可刷新**，允许用户下拉以触发异步的数据刷新操作。

## 类型

```ts
refreshable?: () => Promise<void>
```

---

## 概述

在如 `<List>` 这样的可滚动视图上使用 `refreshable` 修饰符，可以启用下拉刷新的交互行为。当用户在页面顶部下拉时，框架会调用你提供的异步处理函数。

在处理函数中，你可以执行异步操作（例如请求网络数据或更新本地状态），当该函数返回后，刷新指示器将自动隐藏。

此行为与 SwiftUI 的 [`refreshable`](https://developer.apple.com/documentation/swiftui/view/refreshable%28action:%29) 非常相似。

---

## 使用示例

```tsx
<List
  navigationTitle="可刷新列表"
  navigationBarTitleDisplayMode="inline"
  refreshable={refresh}
/>
```

### 完整示例

```tsx
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
      }, 2000) // 模拟2秒刷新
    })
  }

  return <NavigationStack>
    <List
      navigationTitle="可刷新列表"
      navigationBarTitleDisplayMode="inline"
      refreshable={refresh}
    >
      <Section header={<Text textCase={null}>下拉即可刷新</Text>}>
        {data.map(item =>
          <Text>数字：{item}</Text>
        )}
      </Section>
    </List>
  </NavigationStack>
}
```

---

## 行为说明

* `refreshable` 必须返回一个 `Promise<void>`。只有在该 promise 被解析（`resolve`）后，刷新指示器才会消失。
* 在处理函数内部可以使用 `await` 进行异步操作：

  ```ts
  refreshable={async () => {
    const result = await fetchData()
    setData(result)
  }}
  ```
* 此修饰符 **仅适用于可滚动容器**（如 `<List>`）。
* 在刷新逻辑中应更新相关状态，以反映新的数据。
* 避免长时间运行或无反馈的任务，必须确保 promise 能被及时解析以防止界面卡住。

---

## 使用建议

* 保持刷新逻辑简洁高效。
* 始终在逻辑结束后调用 `resolve`。
* 开发时可使用延迟模拟加载动画：

  ```ts
  await new Promise(resolve => setTimeout(resolve, 1000))
  ```
