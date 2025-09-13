`LiveActivity` API 允许你的脚本在 iOS 的锁屏界面以及支持的设备上的动态岛中展示实时数据。通过该 API，你可以创建、更新并结束 Live Activity，同时监听其生命周期状态和系统支持情况。

---

## 类型定义

### `LiveActivityState`

表示 Live Activity 的生命周期状态。

```ts
type LiveActivityState = 'active' | 'dismissed' | 'ended' | 'stale'
```

* `active`：活动正在进行，内容可见并可更新。
* `ended`：活动已结束，不再更新，但仍可能可见。
* `dismissed`：活动已被系统或用户移除，不再可见。
* `stale`：活动内容过时，建议进行更新。

---

### `LiveActivityDetail`

表示某个具体 Live Activity 的状态详情。

```ts
type LiveActivityDetail = {
  id: string
  state: LiveActivityState
}
```

* `id`：该活动的唯一标识符。
* `state`：该活动当前所处的生命周期状态。

---

### `LiveActivityUI`

描述 Live Activity 在锁屏和动态岛中的界面内容布局。

```ts
type LiveActivityUI = {
  content: VirtualNode
  expanded: {
    leading?: VirtualNode
    trailing?: VirtualNode
    center?: VirtualNode
    bottom?: VirtualNode
  }
  compactLeading: VirtualNode
  compactTrailing: VirtualNode
  minimal: VirtualNode
}
```

* `content`：显示在锁屏和不支持动态岛设备上的主要内容视图。
* `expanded`：动态岛展开时的详细视图，包括：

  * `leading`：左侧区域内容。
  * `trailing`：右侧区域内容。
  * `center`：摄像头下方中间区域内容。
  * `bottom`：底部区域内容。
* `compactLeading`：动态岛紧凑模式左侧内容。
* `compactTrailing`：动态岛紧凑模式右侧内容。
* `minimal`：动态岛折叠模式下的最简视图内容。

---

### `LiveActivityUIBuilder<T>`

一个 UI 构建函数，用于根据动态属性类型 `T` 构建 `LiveActivityUI`。

```ts
interface LiveActivityUIBuilder<T> {
  (attributes: T): LiveActivityUI
}
```

---

### `LiveActivityOptions`

创建 Live Activity 时可选的配置项。

```ts
type LiveActivityOptions = {
  staleDate?: number
  relevanceScore?: number
}
```

* `staleDate`：指定时间戳，超过后系统会将活动标记为过时（`stale`）。
* `relevanceScore`：用于多个 Live Activity 并存时的显示优先级。分数越高，越优先出现在动态岛或锁屏上。

---

### `LiveActivityUpdateOptions`

用于更新 Live Activity 的配置项，继承自 `LiveActivityOptions`，并新增警报设置。

```ts
type LiveActivityUpdateOptions = LiveActivityOptions & {
  alert?: {
    title: string
    body: string
  }
}
```

* `alert.title`：用于 Apple Watch 提醒的短标题。
* `alert.body`：提醒的主内容。

---

### `LiveActivityEndOptions`

结束活动时的配置项，继承自 `LiveActivityOptions`，并包含活动关闭时间控制。

```ts
type LiveActivityEndOptions = LiveActivityOptions & {
  dismissTimeInterval?: number
}
```

* `dismissTimeInterval`， 单位为秒：

  * 不设置：系统自动处理，最多保留 4 小时。
  * 设置为 `<= 0`：立即移除活动。
  * 设置为 `> 0`：将在指定时间后或 4 小时内自动移除，以先到为准。

---

## 类：`LiveActivity<T>`

表示一个可控制生命周期的 Live Activity 实例。

```ts
class LiveActivity<T> {
  constructor(builder: LiveActivityUIBuilder<T>)
}
```

### 实例属性

* `activityId: string | undefined`
  活动 ID，仅在 `start()` 成功执行后可访问。

* `started: boolean`
  当前实例是否已成功启动。

---

### 实例方法

#### `start(attributes: T, options?: LiveActivityOptions): Promise<boolean>`

启动 Live Activity。

* `attributes`：初始动态属性。
* `options`：可选配置。
* 返回 Promise，成功则为 `true`。

#### `update(attributes: T, options?: LiveActivityUpdateOptions): Promise<boolean>`

更新 Live Activity 内容。

* `attributes`：更新后的属性。
* `options`：可选更新和提醒配置。
* 返回 Promise，成功则为 `true`。

#### `end(attributes: T, options?: LiveActivityEndOptions): Promise<boolean>`

结束 Live Activity。

* `attributes`：最后一次展示的内容。
* `options`：可选的移除策略。
* 返回 Promise，成功则为 `true`。

#### `getActivityState(): Promise<LiveActivityState | null>`

获取当前活动的状态。

#### `addUpdateListener(listener: (state: LiveActivityState) => void): void`

监听当前活动的状态变化。

#### `removeUpdateListener(listener: (state: LiveActivityState) => void): void`

移除已添加的状态变化监听器。

---

### 静态方法

#### `areActivitiesEnabled(): Promise<boolean>`

检查当前设备是否支持并启用了 Live Activity 功能。

#### `addActivitiesEnabledListener(listener: (enabled: boolean) => void): void`

添加监听器以检测 Live Activity 功能的可用性变化。

#### `removeActivitiesEnabledListener(listener: (enabled: boolean) => void): void`

移除已添加的可用性监听器。

#### `addActivityUpdateListener(listener: (detail: LiveActivityDetail) => void): void`

添加全局监听器，监听任意 Live Activity 的状态变化。

#### `removeActivityUpdateListener(listener: (detail: LiveActivityDetail) => void): void`

移除全局状态监听器。

#### `getActivityState(activityId: string): Promise<LiveActivityState | null>`

通过活动 ID 查询指定 Live Activity 的状态。

#### `getAllActivities(): Promise<LiveActivityDetail[]>`

获取当前所有正在运行的 Live Activity 详情。

#### `getAllActivitiesIds(): Promise<string[]>`

获取当前所有正在运行的 Live Activity ID 列表。

#### `endAllActivities(options?: LiveActivityEndOptions): Promise<boolean>`

结束所有当前运行中的 Live Activity。

#### `from<T>(activityId: string, builder: LiveActivityUIBuilder<T>): Promise<LiveActivity<T> | null>`

根据活动 ID 还原一个已存在的 Live Activity 实例。适用于脚本重启后的恢复场景。

---

## 使用示例

### 示例 1：启动一个 Live Activity

```ts
const liveActivity = new LiveActivity(({ status, eta, icon }) => ({
  content: <Text>{status}</Text>,
  expanded: {
    leading: <Text>ETA: {eta}</Text>,
    trailing: <Image systemName={icon} />
  },
  compactLeading: <Text>{eta}</Text>,
  compactTrailing: <Image systemName={icon} />,
  minimal: <Text>{eta}</Text>
}))

await liveActivity.start({
  status: "正在配送",
  eta: "20 分钟",
  icon: "truck.box.badge.clock"
})
```

---

### 示例 2：更新 Live Activity

```ts
await liveActivity.update(
  {
    status: "即将送达",
    eta: "10 分钟",
    icon: "truck.box.badge.clock"
  },
  {
    alert: {
      title: "订单更新",
      body: "您的订单即将送达！"
    }
  }
)
```

---

### 示例 3：结束 Live Activity

```ts
await liveActivity.end(
  {
    status: "已送达",
    eta: "0 分钟",
    icon: "checkmark.circle"
  },
  {
    dismissTimeInterval: 0 // 立即移除
  }
)
```
