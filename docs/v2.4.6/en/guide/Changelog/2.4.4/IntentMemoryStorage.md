---
title: IntentMemoryStorage
description: A lightweight, session-based storage for sharing state across multiple AppIntents during a single Shortcut execution.
---

IntentMemoryStorage is an in-memory storage mechanism used inside AppIntent execution environments.
It allows multiple AppIntents—such as multi-step workflows involving SnippetIntents—to share temporary data.

However, **its lifecycle does not follow the lifecycle of AppIntent execution or Script.exit()**.
It is controlled by the **system’s management of the Extension process**, which is unpredictable.

This document describes its real behavior, its storage scopes, how the system manages JSContexts in Shortcuts, Widgets, and Live Activities, and how developers should use it safely.

---

## Overview

Each AppIntent in Scripting runs inside its own **Script Execution Context** (JSContext).
When:

- The AppIntent’s `perform()` finishes, or
- `Script.exit()` is called

the _execution_ ends.

But this does **not** mean that IntentMemoryStorage (or the JSContext) is destroyed.

Instead:

**IntentMemoryStorage persists as long as the system keeps the Extension process alive**

It will only be cleared when:

- The Extension process is terminated by the system
- The system decides to reclaim memory
- The environment hosting the Intent Extension or Widget Extension is destroyed

Therefore:

- **Running the same Shortcut again may read leftover values from the previous run.**
- **Widget or Live Activity AppIntent calls may reuse the same JSContext, preserving MemoryStorage.**
- **MemoryStorage can disappear at any time if the system kills the Extension process.**

This behavior is normal and inherent to the AppExtension lifecycle.

IntentMemoryStorage is:

**A short-lived, extension-scoped, non-persistent memory store**

---

## Storage Scopes

IntentMemoryStorage provides two scopes.

## 1. Script-scoped (default)

When `shared: true` is _not_ provided:

- Storage belongs to a single script project
- Only AppIntents from the same script can access it
- System may keep it alive across executions
- It is cleared when the system finally terminates the Extension process

Useful for multi-step flows inside a single script.

---

## 2. Shared storage

When `{ shared: true }` is specified:

- All scripts can access the same shared memory space
- Useful for cross-script workflow coordination
- Still relies on the same Extension process lifecycle
- Data disappears when the Extension is killed

Both scopes are **temporary** and tied to the system’s handling of the Extension environment.

---

## System Lifecycle and JSContext Behavior

IntentMemoryStorage’s behavior is entirely dependent on how the OS manages the AppIntent/Widget Extension process.

Below is a complete explanation of observed behaviors.

---

## Case 1: Shortcuts running an Intent

When a Shortcut executes an Intent:

- The AppIntent finishes
- The Script.exit() returns a result
- The JSContext used for execution is destroyed

But:

### IntentMemoryStorage does _not_ necessarily clear.

If the system keeps the Intent Extension process alive, the stored data remains in memory.

Therefore:

**Running the same Shortcut again may still read values saved previously.**

This is expected behavior.

---

## Case 2: Widgets calling AppIntents

Widget Extensions behave differently:

- The system prefers **reusing the same JSContext**
- Therefore, IntentMemoryStorage may persist across multiple AppIntent calls
- But the system may kill the Widget Extension at any time
- When this happens, both the JSContext and MemoryStorage are cleared

Hence:

**MemoryStorage may survive across widget updates, or it may vanish unpredictably.**

---

## Case 3: Live Activity calling AppIntents

Live Activity environments also reuse JSContexts:

- Multiple AppIntent calls often share the same JSContext
- MemoryStorage persists as long as the Extension stays alive
- The system may terminate the Live Activity extension at any time
- MemoryStorage then disappears immediately

---

## Final Lifecycle Summary

| Event                              | Does MemoryStorage clear immediately? |
| ---------------------------------- | ------------------------------------- |
| AppIntent finish                   | No                                    |
| Script.exit()                      | No                                    |
| Shortcut flow finishes             | Not necessarily                       |
| Widget AppIntent call              | Not necessarily                       |
| Live Activity AppIntent call       | Not necessarily                       |
| System kills the Extension process | Yes (completely cleared)              |

Therefore:

**MemoryStorage should never be treated as reliable or persistent.**

**It may remain, or it may disappear at any time.**

---

## API Definition

```ts
namespace IntentMemoryStorage {
  function get<T>(key: string, options?: { shared?: boolean }): T | null;
  function set(key: string, value: any, options?: { shared?: boolean }): void;
  function remove(key: string, options?: { shared?: boolean }): void;
  function contains(key: string, options?: { shared?: boolean }): boolean;
  function clear(): void;
  function keys(): string[];
}
```

Notes:

- `shared` applies only to get / set / remove / contains
- `clear()` and `keys()` operate **only on script-scoped storage**, never on shared storage

---

## API Details

## get

```ts
function get<T>(key: string, options?: { shared?: boolean }): T | null;
```

Retrieves a value.

However:

- If the Extension is still alive → may return leftover values
- If the Extension was killed → returns null

Examples:

Script-scoped:

```ts
const color = IntentMemoryStorage.get<string>("color");
```

Shared:

```ts
const token = IntentMemoryStorage.get<string>("token", { shared: true });
```

---

## set

```ts
function set(key: string, value: any, options?: { shared?: boolean }): void;
```

Stores a value in the selected scope.

---

## remove

```ts
function remove(key: string, options?: { shared?: boolean }): void;
```

Deletes the key in the selected scope.

---

## contains

```ts
function contains(key: string, options?: { shared?: boolean }): boolean;
```

Checks whether a key exists.

This depends on whether the Extension process has remained alive.

---

## clear

```ts
function clear(): void;
```

Clears **script-scoped** memory only.

To clear shared memory, remove keys manually.

---

## keys

```ts
function keys(): string[];
```

Returns keys in script-scoped storage.

Shared keys must be tracked manually by the developer.

---

## Usage Scenarios

## Script-scoped (default)

Good for:

- Multi-step flows inside a single script
- SnippetIntent → AppIntent → SnippetIntent
- Temporary UI state
- Step numbers, temporary selections

---

## Shared storage

Good for:

- Multi-script cooperation
- Coordinating global workflow IDs
- Sharing ephemeral state across multiple AppIntent calls

---

## Not Recommended For

- Persistent data
- Large objects (images, binary, long text)
- Data that must be reliably present
- Data that must be reliably cleared
- Any workflow requiring deterministic behavior

Use instead:

- `Storage` for durable key–value data
- `FileManager` for files in the shared App Group directory

---

## Examples

## Script-scoped

```ts
IntentMemoryStorage.set("color", "red");

const color = IntentMemoryStorage.get<string>("color");
```

---

## Shared across scripts

Script A:

```ts
IntentMemoryStorage.set("sessionID", "12345", { shared: true });
```

Script B:

```ts
const id = IntentMemoryStorage.get<string>("sessionID", { shared: true });
```

---

## Storage Structure Example

If you store:

```ts
IntentMemoryStorage.set("color", "green");
IntentMemoryStorage.set("step", 2);
IntentMemoryStorage.set("token", "xyz", { shared: true });
```

Then the extension process holds:

Script-scoped:

```json
{
  "color": "green",
  "step": 2
}
```

Shared:

```json
{
  "token": "xyz"
}
```

Both disappear once the system kills the Extension process.

---

## Best Practices

- Treat MemoryStorage as an in-memory _cache_, not a storage layer
- Never assume the value will exist
- Never assume the value will be cleared
- Do not store large data
- Use structured keys like:
  - `"workflow.step"`
  - `"ui.selectedColor"`
  - `"global.sessionID"`

- For persistent or critical data, always use `Storage` or `FileManager`
