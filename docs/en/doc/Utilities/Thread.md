---
title: Thread

---

Scripting’s UI rendering system and the vast majority of JavaScript execution run on the main thread by default. In normal usage, developers rarely need to manually switch threads.

However, some system APIs or internal operations may occasionally execute on a background thread. To ensure UI updates are always safe, and to support running heavy work without blocking the main thread, Scripting provides the global `Thread` API.

`Thread` is a global namespace and does not require imports.

---

## `Thread.isMainThread: boolean`

Indicates whether the current JavaScript execution context is running on the main thread.

Most of the time this value is `true`, but certain system callbacks or asynchronous operations may occur on background threads. When performing UI updates, this property can be used to confirm that the current thread is safe for UI operations.

```ts
if (Thread.isMainThread) {
  console.log('On main thread')
} else {
  console.log('On background thread')
}
```

---

## `Thread.runInMain(execute: () => void): void`

Executes the given function on the main thread.

Because JavaScript normally runs on the main thread, you usually do not need to call this method explicitly. It is mainly useful when:

* A system API callback happens on a background thread and you need to update the UI
* You want to strictly ensure that a specific piece of logic runs on the main thread

This method does not return a value and does not switch back to the previous thread. It simply guarantees synchronous execution on the main thread.

```ts
Thread.runInMain(() => {
  title.value = 'Updated on main thread'
})
```

---

## `Thread.runInBackground<T>(execute: () => T | Promise<T>): Promise<T>`

Runs the provided function on a background thread and returns its result as a Promise.
Once the background task completes, the result is delivered back on the thread that initiated the call (typically the main thread).

This is ideal for:

* CPU-intensive tasks
* Large data processing
* Any work that should not block the UI

The function may return either a value or a Promise.

```ts
const total = await Thread.runInBackground(() => {
  let v = 0
  for (let i = 0; i < 5_000_000; i++) v += i
  return v
})

console.log('Computed result:', total)
```

Async example:

```ts
const filtered = await Thread.runInBackground(async () => {
  const image = await loadImage()
  return applyFilter(image)
})

Thread.runInMain(() => {
  setImage(filtered)
})
```

---

## Automatic Thread Switching in Asynchronous I/O

Many **asynchronous I/O methods in Scripting already run on background threads automatically**, so developers do **not** need to manually call `runInBackground` for them.

Example:

```ts
const text = await FileManager.readAsString(path)
```

`readAsString` automatically performs file reading on a background thread, then returns the result back on the thread where the call was made (usually the main thread).

This means asynchronous I/O will **not** block the UI, even if you call them directly in your UI logic.

### Only synchronous I/O runs on the main thread

For example:

```ts
const text = FileManager.readAsStringSync(path)
```

Synchronous methods **always** execute on the main thread and do **not** switch threads internally.

Therefore:

* Avoid using synchronous I/O on large files
* Prefer asynchronous versions (e.g., `readAsString`) for better performance
* Use `runInBackground` only when you must perform blocking synchronous work or heavy computation

---

## Recommendations

* JavaScript runs on the main thread by default; `runInMain` is rarely needed
* Asynchronous I/O methods already run on background threads automatically
* Use `runInBackground` for CPU-heavy or blocking synchronous tasks
* If an API callback occurs on a background thread, use `runInMain` to safely update UI
* Do not manipulate UI inside `runInBackground`; switch back first
