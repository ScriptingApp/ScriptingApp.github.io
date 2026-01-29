---
title: Calendar
description: This interface allows you to interact with iOS calendars, enabling operations like retrieving default calendars, creating custom calendars, and managing calendar settings and events.

---

The `Calendar` API in the Scripting app provides access to iOS calendars, calendar accounts, and event/reminder management.  
Developers can retrieve default calendars, create new ones, list calendars supporting specific entity types, and manage calendar properties.

---

## Type Definitions

### CalendarType

Represents types of calendars:

| Value | Description |
| :-- | :-- |
| `"birthday"` | Birthday calendar |
| `"calDAV"` | CalDAV protocol calendar |
| `"exchange"` | Exchange account calendar |
| `"local"` | Local calendar |
| `"subscription"` | Subscription calendar |

### CalendarSourceType

Represents the type of calendar account source:

| Value | Description |
| :-- | :-- |
| `"birthdays"` | Birthday account |
| `"calDAV"` | CalDAV account |
| `"exchange"` | Exchange account |
| `"local"` | Local account |
| `"mobileMe"` | MobileMe account |
| `"subscribed"` | Subscribed account |

### CalendarEventAvailability

Represents event availability settings:

| Value | Description |
| :-- | :-- |
| `"busy"` | Busy |
| `"free"` | Free |
| `"tentative"` | Tentative |
| `"unavailable"` | Unavailable |

### CalendarEntityType

Represents types of entities calendars can manage:

| Value | Description |
| :-- | :-- |
| `"event"` | Event |
| `"reminder"` | Reminder |

---

## Class: CalendarSource

Represents a calendar account source (e.g., Local, Exchange).

### Properties

| Property | Type | Description |
| :-- | :-- | :-- |
| `type` | `CalendarSourceType` | The account source type |
| `title` | `string` | The account source title |
| `identifier` | `string` | The account source unique identifier |

### Methods

#### `getCalendars(entityType: CalendarEntityType): Promise<Calendar[]>`

Gets the list of calendars for this source based on entity type.

- **Parameters**
  - `entityType: CalendarEntityType` — The entity type to retrieve.
- **Returns**
  - `Promise<Calendar[]>` — An array of calendar objects.

---

## Class: Calendar

Represents a calendar object that manages events and reminders.

### Properties

| Property | Type | Description |
| :-- | :-- | :-- |
| `identifier` | `string` | Unique identifier of the calendar |
| `title` | `string` | Calendar title |
| `color` | `Color` | Calendar color |
| `type` | `CalendarType` | Calendar type |
| `source` | `CalendarSource` | Calendar Source |
| `allowedEntityTypes` | `CalendarEntityType` | Allowed entity types (`event`, `reminder`) |
| `isForEvents` | `boolean` | Whether the calendar is for events |
| `isForReminders` | `boolean` | Whether the calendar is for reminders |
| `allowsContentModifications` | `boolean` | Whether modifications are allowed |
| `isSubscribed` | `boolean` | Whether the calendar is subscribed |
| `supportedEventAvailabilities` | `CalendarEventAvailability` | Supported event availabilities |

### Methods

#### `remove(): Promise<void>`

Deletes the calendar.

#### `save(): Promise<void>`

Saves changes to the calendar.

#### `static defaultForEvents(): Promise<Calendar | null>`

Gets the default event calendar set by the system.

#### `static defaultForReminders(): Promise<Calendar | null>`

Gets the default reminder calendar set by the system.

#### `static forEvents(): Promise<Calendar[]>`

Lists all calendars that support events.

#### `static forReminders(): Promise<Calendar[]>`

Lists all calendars that support reminders.

#### `static create(options: { title: string, entityType: CalendarEntityType, sourceType: CalendarSourceType, color?: Color }): Promise<Calendar>`

Creates a new calendar.

- **Parameters**
  - `title: string` — Calendar title
  - `entityType: CalendarEntityType` — Supported entity type
  - `sourceType: CalendarSourceType` — Account source type
  - `color?: Color` — (Optional) Calendar color
- **Returns**
  - `Promise<Calendar>` — The newly created calendar.

#### `static presentChooser(allowMultipleSelection?: boolean): Promise<Calendar[]>`

Presents a calendar chooser view.

- **Parameters**
  - `allowMultipleSelection?: boolean` — Allow multiple selection, default `false`.
- **Returns**
  - `Promise<Calendar[]>` — Selected calendars.

#### `static getSources(): CalendarSource[]`

Retrieves all available calendar sources on the device.

---

## Example Code

### Retrieve Default Event Calendar
```tsx
const defaultEventCalendar = await Calendar.defaultForEvents()
if (defaultEventCalendar) {
  console.log(`Default event calendar: ${defaultEventCalendar.title}`)
} else {
  console.log('No default event calendar found')
}
```

### Create a New Local Event Calendar
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

### List All Event-Supporting Calendars
```tsx
const eventCalendars = await Calendar.forEvents()
for (const calendar of eventCalendars) {
  console.log(`Calendar: ${calendar.title}`)
}
```

### Delete the First Event Calendar
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