---
title: 日历
description: 该接口允许您与 iOS 日历进行交互，例如获取默认日历、创建自定义日历以及管理日历设置和事件。

---

Scripting 应用中的 `Calendar` API 提供了与 iOS 日历账户、日历对象、事件和提醒事项交互的能力。  
开发者可以通过此 API 获取默认日历、创建新的日历、列出支持特定实体类型（日程、提醒）的日历，以及管理日历属性。

---

## 类型定义

### CalendarType

定义日历的种类：

| 值 | 描述 |
| :-- | :-- |
| `"birthday"` | 生日日历 |
| `"calDAV"` | CalDAV 协议日历 |
| `"exchange"` | Exchange 账户日历 |
| `"local"` | 本地日历 |
| `"subscription"` | 订阅日历 |

### CalendarSourceType

定义日历账户源的种类：

| 值 | 描述 |
| :-- | :-- |
| `"birthdays"` | 生日账户 |
| `"calDAV"` | CalDAV 协议账户 |
| `"exchange"` | Exchange 账户 |
| `"local"` | 本地账户 |
| `"mobileMe"` | MobileMe 账户 |
| `"subscribed"` | 订阅账户 |

### CalendarEventAvailability

定义事件的可用性状态：

| 值 | 描述 |
| :-- | :-- |
| `"busy"` | 忙碌 |
| `"free"` | 空闲 |
| `"tentative"` | 暂定 |
| `"unavailable"` | 不可用 |

### CalendarEntityType

定义日历中可管理的实体类型：

| 值 | 描述 |
| :-- | :-- |
| `"event"` | 日程事件 |
| `"reminder"` | 提醒事项 |

---

## 类：CalendarSource

代表一个日历账户源，例如本地账户、Exchange账户等。

### 属性

| 属性名 | 类型 | 描述 |
| :-- | :-- | :-- |
| `type` | `CalendarSourceType` | 账户源的类型 |
| `title` | `string` | 账户源的标题 |
| `identifier` | `string` | 账户源的唯一标识符 |

### 方法

#### `getCalendars(entityType: CalendarEntityType): Promise<Calendar[]>`

获取该账户下指定实体类型（事件或提醒事项）支持的所有日历。

- **参数**
  - `entityType: CalendarEntityType` — 需要获取的日历实体类型。
- **返回**
  - `Promise<Calendar[]>` — 日历对象数组。

---

## 类：Calendar

代表一个具体的日历对象，可用于管理日程、提醒事项等。

### 属性

| 属性名 | 类型 | 描述 |
| :-- | :-- | :-- |
| `identifier` | `string` | 日历的唯一标识符 |
| `title` | `string` | 日历标题 |
| `color` | `Color` | 日历颜色 |
| `type` | `CalendarType` | 日历种类 |
| `source` | `CalendarSource` | 日历帐户源 |
| `allowedEntityTypes` | `CalendarEntityType` | 日历允许包含的实体类型（事件或提醒） |
| `isForEvents` | `boolean` | 是否用于存储事件 |
| `isForReminders` | `boolean` | 是否用于存储提醒事项 |
| `allowsContentModifications` | `boolean` | 是否允许修改日历内容 |
| `isSubscribed` | `boolean` | 是否为订阅日历 |
| `supportedEventAvailabilities` | `CalendarEventAvailability` | 日历支持的事件可用性类型 |

### 方法

#### `remove(): Promise<void>`

删除该日历。  

#### `save(): Promise<void>`

保存对该日历的更改。  

#### `static defaultForEvents(): Promise<Calendar | null>`

获取当前系统设置的默认事件日历。

#### `static defaultForReminders(): Promise<Calendar | null>`

获取当前系统设置的默认提醒事项日历。

#### `static forEvents(): Promise<Calendar[]>`

列出所有支持事件的日历。

#### `static forReminders(): Promise<Calendar[]>`

列出所有支持提醒事项的日历。

#### `static create(options: { title: string, entityType: CalendarEntityType, sourceType: CalendarSourceType, color?: Color }): Promise<Calendar>`

创建一个新的日历。

- **参数**
  - `title: string` — 新日历的标题
  - `entityType: CalendarEntityType` — 支持的实体类型
  - `sourceType: CalendarSourceType` — 日历账户源类型
  - `color?: Color` — （可选）日历颜色
- **返回**
  - `Promise<Calendar>` — 新创建的日历对象。

#### `static presentChooser(allowMultipleSelection?: boolean): Promise<Calendar[]>`

展示一个日历选择器界面，供用户选择一个或多个日历。

- **参数**
  - `allowMultipleSelection?: boolean` — 是否允许多选，默认 `false`。
- **返回**
  - `Promise<Calendar[]>` — 用户选择的日历列表。

#### `static getSources(): CalendarSource[]`

获取当前设备上所有的日历账户源。

---

## 示例代码

### 获取默认事件日历
```tsx
const defaultEventCalendar = await Calendar.defaultForEvents()
if (defaultEventCalendar) {
  console.log(`默认事件日历: ${defaultEventCalendar.title}`)
} else {
  console.log('未找到默认事件日历')
}
```

### 创建新的本地事件日历
```tsx
const newCalendar = await Calendar.create({
  title: '锻炼计划',
  entityType: 'event',
  sourceType: 'local',
  color: '#FF5733'
})

await newCalendar.save()
console.log(`创建了新的日历: ${newCalendar.title}`)
```

### 列出所有支持事件的日历
```tsx
const eventCalendars = await Calendar.forEvents()
for (const calendar of eventCalendars) {
  console.log(`日历: ${calendar.title}`)
}
```

### 删除第一个事件日历
```tsx
const eventCalendars = await Calendar.forEvents()
if (eventCalendars.length > 0) {
  const calendarToRemove = eventCalendars[0]
  await calendarToRemove.remove()
  console.log(`已删除日历: ${calendarToRemove.title}`)
}
```

### 展示日历选择器并处理用户选择
```tsx
const selectedCalendars = await Calendar.presentChooser(true)
for (const calendar of selectedCalendars) {
  console.log(`选择了日历: ${calendar.title}`)
}
```