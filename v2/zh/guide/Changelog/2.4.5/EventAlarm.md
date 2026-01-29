# 事件闹钟

`EventAlarm` 用于为 **日历事件（CalendarEvent）** 和 **提醒事项（Reminder）** 设置提醒规则。
通过该类，开发者可以创建：

- 基于绝对时间触发的提醒
- 基于事件开始时间的相对提醒
- 基于地理围栏（Geofence）触发的提醒

此类为 Scripting Calendar/Reminder API 的基础能力，用于构建灵活的提醒行为。

***

## 一、创建 Alarm

### 1. `EventAlarm.fromAbsoluteDate(date: Date): EventAlarm`

创建一个基于绝对时间触发的提醒。

- 不依赖事件的开始时间
- 在系统时间到达指定时刻时触发

示例：

```ts
const alarm = EventAlarm.fromAbsoluteDate(new Date("2025-01-01T09:00:00"))
```

***

### 2. `EventAlarm.fromRelativeOffset(offset: DurationInSeconds): EventAlarm`

创建一个以「事件开始时间」为基准的提醒。

`offset`（秒）含义如下：

- 负数：事件开始前触发
- 正数：事件开始后触发

示例（事件开始前 10 分钟提醒）：

```ts
const alarm = EventAlarm.fromRelativeOffset(-600)
```

***

## 二、属性说明

### 1. `absoluteDate: Date | null`

提醒的绝对触发时间。

行为规则：

- 如果为相对提醒设置 `absoluteDate`，提醒会自动转换为绝对提醒，同时 `relativeOffset` 会被清除。
- 如果为 `null`，表示提醒可能为相对提醒或位置提醒。

***

### 2. `relativeOffset: number`

事件开始时间的偏移量（秒）。

行为规则：

- 若为绝对提醒设置该属性，则提醒会转换为相对提醒，且 `absoluteDate` 会被置空。
- 相对提醒永远以 CalendarEvent 或 Reminder 的开始时间为基准。

示例：

```ts
alarm.relativeOffset = -300  // 提前 5 分钟触发
```

***

### 3. `structuredLocation: EventStructuredLocation | null`

位置提醒的触发地点。

`EventStructuredLocation` 包含：

- `title: string | null`：地点名称
- `geoLocation: LocationInfo | null`：经纬度位置
- `radius: number`：地理围栏触发半径（米）

示例：

```ts
alarm.structuredLocation = {
  title: "公司",
  geoLocation: { latitude: 37.332, longitude: -122.030 },
  radius: 100
}
```

***

### 4. `proximity: AlarmProximity`

位置提醒的触发方式。

支持的值：

| 值       | 含义         |
| ------- | ---------- |
| `none`  | 默认，不使用位置触发 |
| `enter` | 进入该地点范围时触发 |
| `leave` | 离开该地点范围时触发 |

示例：

```ts
alarm.proximity = AlarmProximity.enter
```

***

## 三、EventAlarm 在不同 API 中的使用方式

### 1. 在 CalendarEvent 中使用

```ts
const event = new CalendarEvent()
event.title = "会议"
event.startDate = ...
event.endDate = ...

const alarm = EventAlarm.fromRelativeOffset(-900)
event.addAlarm(alarm)

await event.save()
```

***

### 2. 在 Reminder 中使用

`Reminder` 与 `CalendarEvent` 均支持添加 `EventAlarm`：

```ts
const reminder = new Reminder()
reminder.title = "交电费"

const alarm = EventAlarm.fromAbsoluteDate(new Date("2025-02-01T10:00:00"))
reminder.addAlarm(alarm)

await reminder.save()
```

位置提醒同样适用于 `Reminder`。

***

## 四、使用建议

1. **绝对提醒适合作为固定时间提醒**
   如生日、账单日等。

2. **相对提醒适用于基于事件开始时间的通知**
   如会议开始前十分钟提醒。

3. **地理围栏提醒适用于“到达某地时执行某事”**
   如到家提醒拿快递。

4. 使用位置提醒时，应确保用户授予定位权限。
