---
title: 线程（Thread）
description: 该接口提供了一种简单的方法来让你手动切换线程。

---

Scripting 的 UI 渲染系统以及绝大多数 JavaScript 执行逻辑默认运行在主线程中，因此通常开发者无需主动切换线程。

为了确保 UI 更新安全、避免主线程阻塞，并在必要时执行后台任务，Scripting 提供了全局 `Thread` API。部分系统 API 或运行时逻辑可能会在后台执行，此 API 能帮助你安全地处理复杂场景。

`Thread` 为全局命名空间，无需导入即可使用。

---

## `Thread.isMainThread: boolean`

指示当前 JavaScript 执行环境是否在主线程。

在大多数情况下此值为 `true`，但某些系统回调或内部任务可能会切换到后台线程。在需要进行 UI 更新时，可以通过此属性确认当前线程是否安全。

```ts
if (Thread.isMainThread) {
  console.log('当前在主线程')
} else {
  console.log('当前不在主线程')
}
```

---

## `Thread.runInMain(execute: () => void): void`

在主线程中执行指定的函数。

由于 JavaScript 默认运行在主线程，通常无需手动调用此方法。它主要用于以下情况：

* 某些系统 API 回调在后台线程触发，开发者需要确保 UI 更新在主线程执行
* 希望严格保证某段逻辑在主线程中执行

此方法不会返回值，也不会切回执行前的线程，仅保证同步在主线程执行。

```ts
Thread.runInMain(() => {
  title.value = 'Updated on main thread'
})
```

---

## `Thread.runInBackground<T>(execute: () => T | Promise<T>): Promise<T>`

在后台线程执行指定函数，并以 Promise 形式将结果切回到调用处所在的线程（通常是主线程）。

适用于：

* 计算密集型任务
* 大型数据处理
* 不希望阻塞 UI 的耗时操作

`execute` 可以返回值或 Promise。

```ts
const sum = await Thread.runInBackground(() => {
  let v = 0
  for (let i = 0; i < 5_000_000; i++) v += i
  return v
})

console.log('结果:', sum)
```

异步示例：

```ts
const image = await Thread.runInBackground(async () => {
  const raw = await loadImage()
  return processImage(raw)
})

Thread.runInMain(() => {
  setImage(image)
})
```

---

## 异步 I/O 的自动线程切换行为

Scripting 中 **大量异步 I/O 方法**（包括文件、网络、数据库等）会自动在后台线程执行，无需开发者手动使用 `runInBackground`。

例如：

```ts
const content = await FileManager.readAsString(path)
```

`readAsString` 会自动切换到后台线程执行文件读取操作，然后将结果以 Promise 的方式切回调用时所在的线程（通常是主线程）。
这意味着你可以放心地直接调用异步 API，而无需担心阻塞 UI。

### 只有同步方法会在主线程执行

例如：

```ts
const content = FileManager.readAsStringSync(path)
```

同步方法不会切线程，会在主线程直接执行 I/O 操作。因此：

* 不建议在同步方法中处理大型文件或执行耗时操作
* 如果需要高性能且不阻塞 UI，应使用异步版本（如 readAsString）

---

## 使用建议

* JavaScript 默认在主线程运行，大部分场景不需要调用 `runInMain`
* 异步 I/O（如 FileManager.readAsString）已经自动在后台线程执行
* 仅在执行计算密集型任务或同步 I/O 时需要使用 `runInBackground`
* 如果某些系统 API 回调在后台线程中触发，可使用 `runInMain` 保证 UI 更新安全
* 不应在后台线程中直接访问 UI，应在后台任务完成后再回到主线程处理
