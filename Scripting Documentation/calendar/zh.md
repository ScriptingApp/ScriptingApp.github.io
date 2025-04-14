Scripting 应用中的 `Calendar` API 允许用户与 iOS 日历交互。该 API 支持获取默认日历、创建自定义日历以及管理日历设置和事件。

## 类型

### CalendarType
表示可能的日历类型：
- `"birthday"` （生日）
- `"calDAV"`
- `"exchange"`
- `"local"` （本地）
- `"subscription"` （订阅）

### CalendarSourceType
表示日历来源对象的类型：
- `"birthdays"` （生日）
- `"calDAV"`
- `"exchange"`
- `"local"` （本地）
- `"mobileMe"`
- `"subscribed"` （订阅）

### CalendarEventAvailability
表示事件的可用性设置：
- `"busy"` （忙碌）
- `"free"` （空闲）
- `"tentative"` （暂定）
- `"unavailable"` （不可用）

### CalendarEntityType
表示日历实体的类型：
- `"event"` （事件）
- `"reminder"` （提醒）

## 类：Calendar

### 属性
- `identifier: string`  
  日历的唯一标识符。

- `title: string`  
  日历的标题。

- `color: Color`  
  日历的颜色。

- `type: CalendarType`  
  日历的类型。

- `allowedEntityTypes: CalendarEntityType`  
  此日历可以包含的实体类型（`"event"` 或 `"reminder"`）。

- `isForEvents: boolean`  
  此日历是否用于事件。

- `isForReminders: boolean`  
  此日历是否用于提醒。

- `allowsContentModifications: boolean`  
  是否可以在此日历中添加、编辑和删除项目。

- `isSubscribed: boolean`  
  此日历是否为订阅日历。

- `supportedEventAvailabilities: CalendarEventAvailability`  
  此日历支持的事件可用性设置。

### 方法

#### `remove(): Promise<void>`  
移除日历。

#### `save(): Promise<void>`  
保存对日历的更改。

#### `static defaultForEvents(): Promise<Calendar | null>`  
根据用户设置检索事件的默认日历。

#### `static defaultForReminders(): Promise<Calendar | null>`  
根据用户设置检索提醒的默认日历。

#### `static forEvents(): Promise<Calendar[]>`  
识别支持事件的日历。

#### `static forReminders(): Promise<Calendar[]>`  
识别支持提醒的日历。

#### `static create(options: { title: string, entityType: CalendarEntityType, sourceType: CalendarSourceType, color?: Color }): Promise<Calendar>`  
使用指定选项创建一个新日历。

- **参数**  
  - `title: string`: 日历的标题。  
  - `entityType: CalendarEntityType`: 日历支持的实体类型。  
  - `sourceType: CalendarSourceType`: 帐户来源类型。  
  - `color: Color`（可选）：日历的颜色。

#### `static presentChooser(allowMultipleSelection?: boolean): Promise<Calendar[]>`  
显示日历选择视图。

- **参数**  
  - `allowMultipleSelection: boolean`（可选）：是否允许多选。默认值为 `false`。

## 示例

### 获取默认事件日历
```tsx
const defaultEventCalendar = await Calendar.defaultForEvents()
if (defaultEventCalendar) {
  console.log(`默认事件日历：${defaultEventCalendar.title}`)
} else {
  console.log('未找到默认事件日历')
}
```

### 创建新日历
```tsx
const newCalendar = await Calendar.create({
  title: '运动计划',
  entityType: 'event',
  sourceType: 'local',
  color: '#FF5733'
})

await newCalendar.save()
console.log(`已创建新日历：${newCalendar.title}`)
```

### 列出支持事件的日历
```tsx
const eventCalendars = await Calendar.forEvents()
for (const calendar of eventCalendars) {
  console.log(`日历：${calendar.title}`)
}
```

### 移除日历
```tsx
const eventCalendars = await Calendar.forEvents()
if (eventCalendars.length > 0) {
  const calendarToRemove = eventCalendars[0]
  await calendarToRemove.remove()
  console.log(`已移除日历：${calendarToRemove.title}`)
}
```

### 显示日历选择器
```tsx
const selectedCalendars = await Calendar.presentChooser(true)
for (const calendar of selectedCalendars) {
  console.log(`已选择的日历：${calendar.title}`)
}
```

本文档提供了使用 `Calendar` API 的全面指南。利用这些 API 高效管理日历和事件。