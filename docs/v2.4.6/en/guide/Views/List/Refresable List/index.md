---
title: Refresable List
description: Pull down to refresh on a list view.

---
        
Marks a scrollable view as **refreshable**, enabling the user to pull down to trigger an asynchronous data reload.

## Type

```ts
refreshable?: () => Promise<void>
```

---

## Overview

Use the `refreshable` modifier on scrollable views—such as `<List>`—to implement pull-to-refresh functionality. When the user pulls down past the top of the view, the framework executes the asynchronous handler defined by `refreshable`.

Inside the handler, you can perform any asynchronous operations (e.g., fetching network data or updating local state), and once the operation completes, the refresh control will automatically dismiss.

This behavior closely mirrors SwiftUI’s [`refreshable`](https://developer.apple.com/documentation/swiftui/view/refreshable%28action:%29) modifier.

---

## Usage Example

```tsx
<List
  navigationTitle="Refreshable List"
  navigationBarTitleDisplayMode="inline"
  refreshable={refresh}
/>
```

### Full Example

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
      }, 2000)
    })
  }

  return <NavigationStack>
    <List
      navigationTitle="Refreshable List"
      navigationBarTitleDisplayMode="inline"
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
```

---

## Behavior Notes

* The `refreshable` function **must return a `Promise<void>`**. The refresh control remains visible until the promise resolves.
* Use `await` inside the refresh function to perform async tasks:

  ```ts
  refreshable={async () => {
    const result = await fetchData()
    updateState(result)
  }}
  ```
* This modifier is only effective on **scrollable containers**, such as `<List>`.
* You should update the relevant state inside the handler to reflect new data.
* Avoid long-running or blocking tasks without feedback; always resolve the promise in a timely manner to dismiss the refresh spinner.

---

## Best Practices

* Keep refresh logic short and efficient.
* Always **resolve** the promise to ensure the UI doesn’t hang.
* If needed, use a short delay to simulate refresh animations during development:

  ```ts
  await new Promise(resolve => setTimeout(resolve, 1000))
  ```