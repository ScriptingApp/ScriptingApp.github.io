The `Calendar` API in the Scripting app allows users to interact with iOS calendars. This API supports retrieving default calendars, creating custom calendars, and managing calendar settings and events.

## Types

### CalendarType
Represents possible calendar types:
- `"birthday"`
- `"calDAV"`
- `"exchange"`
- `"local"`
- `"subscription"`

### CalendarSourceType
Represents the type of calendar source object:
- `"birthdays"`
- `"calDAV"`
- `"exchange"`
- `"local"`
- `"mobileMe"`
- `"subscribed"`

### CalendarEventAvailability
Represents event availability settings:
- `"busy"`
- `"free"`
- `"tentative"`
- `"unavailable"`

### CalendarEntityType
Represents the type of calendar entity:
- `"event"`
- `"reminder"`

## Class: Calendar

### Properties
- `identifier: string`
  A unique identifier for the calendar.

- `title: string`
  The calendar’s title.

- `color: Color`
  The calendar’s color.

- `type: CalendarType`
  The calendar’s type.

- `allowedEntityTypes: CalendarEntityType`
  The entity types this calendar can contain (`"event"` or `"reminder"`).

- `isForEvents: boolean`
  Whether this calendar is for events.

- `isForReminders: boolean`
  Whether this calendar is for reminders.

- `allowsContentModifications: boolean`
  Whether you can add, edit, and delete items in the calendar.

- `isSubscribed: boolean`
  Whether the calendar is a subscribed calendar.

- `supportedEventAvailabilities: CalendarEventAvailability`
  The event availability settings supported by this calendar.

### Methods

#### `remove(): Promise<void>`
Removes the calendar.

#### `save(): Promise<void>`
Saves changes to the calendar.

#### `static defaultForEvents(): Promise<Calendar | null>`
Retrieves the default calendar for events as specified by user settings.

#### `static defaultForReminders(): Promise<Calendar | null>`
Retrieves the default calendar for reminders as specified by user settings.

#### `static forEvents(): Promise<Calendar[]>`
Identifies calendars that support events.

#### `static forReminders(): Promise<Calendar[]>`
Identifies calendars that support reminders.

#### `static create(options: { title: string, entityType: CalendarEntityType, sourceType: CalendarSourceType, color?: Color }): Promise<Calendar>`
Creates a new calendar with the specified options.

- **Parameters**
  - `title: string`: The calendar’s title.
  - `entityType: CalendarEntityType`: The entity type the calendar supports.
  - `sourceType: CalendarSourceType`: The account source type.
  - `color: Color` (optional): The calendar’s color.

#### `static presentChooser(allowMultipleSelection?: boolean): Promise<Calendar[]>`
Presents a calendar chooser view.

- **Parameters**
  - `allowMultipleSelection: boolean` (optional): Whether multiple selection is allowed. Defaults to `false`.

## Examples

### Retrieve Default Event Calendar
```tsx
const defaultEventCalendar = await Calendar.defaultForEvents()
if (defaultEventCalendar) {
  console.log(`Default calendar for events: ${defaultEventCalendar.title}`)
} else {
  console.log('No default calendar for events found')
}
```

### Create a New Calendar
```tsx
const newCalendar = await Calendar.create({
  title: 'Workout Schedule',
  entityType: 'event',
  sourceType: 'local',
  color: '#FF5733'
})

await newCalendar.save()
console.log(`Created new calendar: ${newCalendar.title}`)
```

### List Calendars Supporting Events
```tsx
const eventCalendars = await Calendar.forEvents()
for (const calendar of eventCalendars) {
  console.log(`Calendar: ${calendar.title}`)
}
```

### Remove a Calendar
```tsx
const eventCalendars = await Calendar.forEvents()
if (eventCalendars.length > 0) {
  const calendarToRemove = eventCalendars[0]
  await calendarToRemove.remove()
  console.log(`Removed calendar: ${calendarToRemove.title}`)
}
```

### Present Calendar Chooser
```tsx
const selectedCalendars = await Calendar.presentChooser(true)
for (const calendar of selectedCalendars) {
  console.log(`Selected calendar: ${calendar.title}`)
}
```

This document provides a comprehensive guide to using the `Calendar` API. Leverage these APIs to manage calendars and events effectively.

