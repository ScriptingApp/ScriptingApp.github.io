---
title: EventAlarm
description: This class represents a reminder rule that can be attached to both CalendarEvent and Reminder objects.

---

`EventAlarm` represents a reminder rule that can be attached to both **CalendarEvent** and **Reminder** objects.
It supports three major alarm types:

* **Absolute-time alarms**
* **Relative alarms** (relative to an event’s start time)
* **Location-based alarms** (geofence triggers)

This class aligns with the behavior of iOS EventKit alarms and provides flexible notification capabilities across calendar and reminder data.

---

## 1. Creating an Alarm

### EventAlarm.fromAbsoluteDate(date: Date): EventAlarm

Creates an alarm that fires at a specific, absolute moment in time.

* Independent from the event’s `startDate`
* Triggers when the system time reaches the specified date

Example:

```ts
const alarm = EventAlarm.fromAbsoluteDate(new Date("2025-01-01T09:00:00"))
```

---

### EventAlarm.fromRelativeOffset(offset: DurationInSeconds): EventAlarm

Creates an alarm that fires relative to the event’s start time.

`offset` interpretation:

* Negative value: fires *before* the event starts
* Positive value: fires *after* the event starts

Example (alarm 10 minutes before the event):

```ts
const alarm = EventAlarm.fromRelativeOffset(-600)
```

---

## 2. Properties

### absoluteDate: Date | null

The absolute date on which the alarm fires.

Behavior:

* Setting this property on a **relative alarm** converts it into an absolute alarm and clears `relativeOffset`.
* When `null`, the alarm may be relative or location-based.

---

### relativeOffset: number

Time offset in seconds from the event’s start time.

Behavior:

* Setting this property on an **absolute alarm** converts the alarm into a relative alarm and clears `absoluteDate`.
* Always measured relative to the `startDate` of a CalendarEvent or Reminder.

Example:

```ts
alarm.relativeOffset = -300  // fire 5 minutes before
```

---

### structuredLocation: EventStructuredLocation | null

Defines the location used for location-based alarms.

`EventStructuredLocation` contains:

* `title: string | null` – Human-readable name
* `geoLocation: LocationInfo | null` – Latitude/longitude
* `radius: number` – Geofence radius in meters

Example:

```ts
alarm.structuredLocation = {
  title: "Office",
  geoLocation: { latitude: 37.332, longitude: -122.030 },
  radius: 100
}
```

---

### proximity: AlarmProximity

Defines how the location alarm is triggered.

| Value   | Meaning                                 |
| ------- | --------------------------------------- |
| `none`  | Default; no location trigger            |
| `enter` | Trigger when the user enters the region |
| `leave` | Trigger when the user exits the region  |

Example:

```ts
alarm.proximity = AlarmProximity.enter
```

---

## 3. Usage in CalendarEvent and Reminder APIs

### Using EventAlarm with CalendarEvent

```ts
const event = new CalendarEvent()
event.title = "Team Meeting"
event.startDate = ...
event.endDate = ...

const alarm = EventAlarm.fromRelativeOffset(-900) // 15 min before
event.addAlarm(alarm)

await event.save()
```

---

### Using EventAlarm with Reminder

Reminders also support alarms:

```ts
const reminder = new Reminder()
reminder.title = "Pay Electricity Bill"

const alarm = EventAlarm.fromAbsoluteDate(new Date("2025-02-01T10:00:00"))
reminder.addAlarm(alarm)

await reminder.save()
```

Location-based alarms work for reminders as well.

---

## 4. Best Practices

1. **Use absolute alarms** for fixed calendar moments (e.g., birthdays, bill due dates).
2. **Use relative alarms** when the trigger depends on the event’s start time (e.g., meeting reminders).
3. **Use geofence alarms** for contextual triggers (e.g., remind me to pick up a package when I get home).
4. Location alarms require appropriate location permissions from the user.
