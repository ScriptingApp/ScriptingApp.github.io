---
title: 后台保活
tag: PRO
---

`BackgroundKeeper` API 用于控制 **Scripting App** 的后台保活行为，使脚本在应用切换到后台后，能够在一定时间内继续运行。
这在需要保持持续操作（如网络连接、数据同步或后台任务）的场景中非常有用。

> **可用性：**
> 仅当脚本在主应用中运行 (即`Script.env === "index"`) 时可用。
> 请谨慎使用此功能，因为长时间保持后台运行可能会增加设备的电量消耗。

---

## 概述

当应用进入后台（例如由于系统事件触发状态切换）时，可以调用 `BackgroundKeeper.keepAlive()` 来请求保持 Scripting App 的运行。
当应用重新回到前台时，应调用 `BackgroundKeeper.stopKeepAlive()` 来停止后台保活进程并释放资源。

多个脚本可以同时请求后台保活。系统内部维护一个 **保活请求队列**：

* 每次调用 `keepAlive()` 会将当前脚本加入保活队列；
* 每次调用 `stopKeepAlive()` 会将当前脚本从队列中移除；
* 只有当队列为空时，后台保活进程才会真正停止。

> **注意：**
> 即使开启了保活，系统在某些情况下（如内存占用过高、电量过低等）仍可能终止 Scripting App。

---

## 命名空间：`BackgroundKeeper`

### 属性

#### `isActive: Promise<boolean>`

返回一个 Promise，用于指示当前后台保活进程是否处于激活状态。

**示例：**

```ts
const active = await BackgroundKeeper.isActive
if (active) {
  console.log("后台保活已激活")
} else {
  console.log("后台保活未启用")
}
```

---

### 方法

#### `keepAlive(): Promise<boolean>`

启动后台保活进程。

* 如果保活进程已处于激活状态，返回 `true`；
* 如果启动成功，返回 `true`；
* 如果系统拒绝保活请求，可能返回 `false`。

**返回值：**
`Promise<boolean>` — 表示后台保活是否成功启动。

**示例：**

```ts
const started = await BackgroundKeeper.keepAlive()
if (started) {
  console.log("后台保活已成功启动")
} else {
  console.log("无法启动后台保活")
}
```

---

#### `stopKeepAlive(): Promise<void>`

停止当前脚本的后台保活请求。
此操作并不保证整个保活进程立即停止，因为其他脚本可能仍在请求保活。只有当所有请求都被释放后，后台保活才会完全停止。

**返回值：**
`Promise<void>` — 在请求处理完成后 resolve。

**示例：**

```ts
await BackgroundKeeper.stopKeepAlive()
console.log("当前脚本的后台保活请求已释放")
```

---

## 示例用法

```ts
async function runBackgroundTask() {
  const started = await BackgroundKeeper.keepAlive()
  if (!started) {
    console.log("无法保持后台运行")
    return
  }

  try {
    console.log("正在后台执行任务...")
    // 在后台执行任务（例如同步数据、监听蓝牙设备等）
    await new Promise(resolve => setTimeout(resolve, 10000))
  } finally {
    await BackgroundKeeper.stopKeepAlive()
    console.log("已停止后台保活")
  }
}
```

---

## 注意事项与最佳实践

* **请谨慎使用**：持续的后台运行可能显著增加电量消耗。
* **任务完成后务必调用 `stopKeepAlive()`**，或在应用回到前台时停止保活。
* **不要依赖后台保活实现无限后台执行**，系统可能随时挂起或终止应用。
* **多个脚本可共享保活进程**：当所有脚本都调用 `stopKeepAlive()` 后，保活才会真正结束。
