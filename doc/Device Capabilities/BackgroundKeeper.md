# BackgroundKeeper PRO

The `BackgroundKeeper` API provides control over background keep-alive behavior in the **Scripting App**, allowing scripts to extend their runtime after the app transitions to the background. This can be useful for maintaining ongoing operations, such as network connections or active processes, for a limited period while the app is not in the foreground.

> **Availability:**
> This API is only available when the script is running in the main app (`Script.env === "index"`).
> Use it responsibly, as prolonged background execution may increase power consumption.

***

## Overview

When the app moves to the background (due to a background event such as a system-triggered state change), you can call `BackgroundKeeper.keepAlive()` to request that the app continue running for a limited duration.
When the app returns to the foreground, you should call `BackgroundKeeper.stopKeepAlive()` to release background resources.

Multiple scripts can request background keep-alive at the same time. Internally, the system maintains a **keep-alive request queue**:

- Each call to `keepAlive()` adds the calling script to the queue.
- Each call to `stopKeepAlive()` removes it.
- The keep-alive process stops only when **all requests** have been removed from the queue.

> **Note:**
> Even with keep-alive enabled, iOS may still terminate the app under conditions such as high memory usage or strict power constraints.

***

## Namespace: `BackgroundKeeper`

### Properties

#### `isActive: Promise<boolean>`

Returns a promise that resolves to a boolean value indicating whether the keep-alive process is currently active.

**Example:**

```ts
const active = await BackgroundKeeper.isActive
if (active) {
  console.log("Keep-alive is currently active")
} else {
  console.log("Keep-alive is not active")
}
```

***

### Methods

#### `keepAlive(): Promise<boolean>`

Starts the background keep-alive process.

- If the process is already active, this method resolves to `true`.
- If successfully started, it resolves to `true`.
- If the system denies the request, it may resolve to `false`.

**Returns:**
`Promise<boolean>` — Indicates whether the keep-alive process was successfully started.

**Example:**

```ts
const started = await BackgroundKeeper.keepAlive()
if (started) {
  console.log("Background keep-alive started successfully")
} else {
  console.log("Failed to start background keep-alive")
}
```

***

#### `stopKeepAlive(): Promise<void>`

Stops the keep-alive request for the current script.
This does **not** guarantee that the entire keep-alive process will stop immediately, as other scripts may still have active requests.

**Returns:**
`Promise<void>` — Resolves when the stop request is processed.

**Example:**

```ts
await BackgroundKeeper.stopKeepAlive()
console.log("Keep-alive request for this script has been released")
```

***

## Example Usage

```ts
async function runBackgroundTask() {
  const started = await BackgroundKeeper.keepAlive()
  if (!started) {
    console.log("Unable to keep app alive in background")
    return
  }

  try {
    console.log("Performing background work...")
    // Perform background operations (e.g., sync data, monitor sensors)
    await new Promise(resolve => setTimeout(resolve, 10000))
  } finally {
    await BackgroundKeeper.stopKeepAlive()
    console.log("Stopped background keep-alive")
  }
}
```

***

## Notes and Best Practices

- Use **keep-alive sparingly** — continuous background activity may significantly increase battery drain.
- Always **stop keep-alive** once your background task is complete or when the app returns to the foreground.
- Avoid using `BackgroundKeeper` for indefinite background execution. The system may still suspend or terminate the app.
- The keep-alive mechanism is cooperative — if multiple scripts request it, all must release their requests before it stops.
