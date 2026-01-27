---
title: 时间标签视图

---


Scripting 提供了一组便捷的时间标签组件，封装了 SwiftUI 中 `Text` 的时间样式。这些组件支持在小组件和视图中显示实时更新的日期与时间格式，适用于加载动态数据、显示相对时间、计时器等多种应用场景。

---

## `DateLabel`

用于以不同格式展示一个时间戳。即使组件未运行，也可在小组件中显示持续更新的时间相关信息。

### 属性定义

```ts
type DateLabelProps = {
  timestamp: number
  style: 'date' | 'time' | 'timer' | 'relative' | 'offset'
}
```

- `timestamp`: 要显示的时间点，单位为毫秒（UNIX 时间戳）。                                            

- `style`: 显示样式，可选值包括: 
  - `"date"`: 以日期形式显示，例如 `"June 3, 2019"`
  - `"time"`: 仅显示时间，例如 `"11:23PM"`
  - `"timer"`: 以计时器形式实时更新，例如 `"2:32"`、`"36:59:01"`
  - `"relative"`: 以相对当前时间的形式显示，例如 `"2 hours, 23 minutes"`
  - `"offset"`: 显示相对当前时间的偏移，例如 `+2 hours`、`-3 months`

### 示例

```tsx
<DateLabel
  timestamp={Date.now()}
  style="date"
/>

<DateLabel
  timestamp={Date.now()}
  style="relative"
/>
```

---

## `DateRangeLabel`

用于显示两个时间点之间的本地化时间范围。

### 属性定义

```ts
type DateRangeLabelProps = {
  from: number
  to: number
}
```

| 属性     | 说明           |
| ------ | ------------ |
| `from` | 起始时间戳，单位为毫秒。 |
| `to`   | 结束时间戳，单位为毫秒。 |

### 示例

```tsx
<DateRangeLabel
  from={Date.now()}
  to={Date.now() + 1000 * 60}
/>
```

---

## `DateIntervalLabel`

用于显示两个时间点之间的时间区间，常用于表示日程或事件的开始与结束时间。

### 属性定义

```ts
type DateIntervalLabelProps = {
  from: number
  to: number
}
```

### 示例

```tsx
let fromDate = new Date()
fromDate.setHours(9)
fromDate.setMinutes(30)

let toDate = new Date()
toDate.setHours(15)
toDate.setMinutes(30)

<DateIntervalLabel
  from={fromDate.getTime()}
  to={toDate.getTime()}
/>
```

> 输出示例：`9:30 AM – 3:30 PM`

---

## `TimerIntervalLabel`

用于在指定的时间区间内显示一个实时运行的计时器，可设置是否倒计时、是否在特定时间暂停等。

### 属性定义

```ts
type TimerIntervalLabelProps = {
  from: number
  to: number
  pauseTime?: number
  countsDown?: boolean
  showsHours?: boolean
}
```

| 属性           | 说明                                      |
| ------------ | --------------------------------------- |
| `from`       | 计时器开始的时间戳（毫秒）。                          |
| `to`         | 计时器结束的时间戳（毫秒）。                          |
| `pauseTime`  | （可选）计时器在该时间点暂停。默认为 `undefined`，表示不暂停。   |
| `countsDown` | （可选）是否倒计时。默认为 `true`。                   |
| `showsHours` | （可选）当剩余时间超过 60 分钟时，是否显示小时部分。默认为 `true`。 |

### 示例

```tsx
<TimerIntervalLabel
  from={Date.now()}
  to={Date.now() + 1000 * 60 * 12}
  pauseTime={Date.now() + 1000 * 60 * 10}
/>
```

该示例表示一个从 12 分钟开始倒计时的计时器，在倒计至 10 分钟时暂停。
