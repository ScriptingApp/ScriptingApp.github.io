# CalendarEvent

The `CalendarEvent` API enables creating, reading, editing, and managing events in the iOS calendar.
Developers can configure event details such as title, time, location, participants, recurrence rules, alarms, availability, and structured locations, and can display system-provided interfaces for creating or editing events.

***

# 1. Types

## EventParticipant

Represents an attendee of the event:

- `isCurrentUser: boolean` – Indicates whether this attendee represents the current user
- `name?: string` – Display name
- `role: ParticipantRole` – The attendee’s role
- `type: ParticipantType` – The type of attendee
- `status: ParticipantStatus` – The attendee’s participation status

### ParticipantRole

- `chair`
- `nonParticipant`
- `optional`
- `required`
- `unknown`

### ParticipantType

- `group`
- `person`
- `resource`
- `room`
- `unknown`

### ParticipantStatus

- `unknown`
- `pending`
- `accepted`
- `declined`
- `tentative`
- `delegated`
- `completed`
- `inProcess`

***

## EventAvailability

Indicates how the event affects the user’s availability:

- `notSupported`
- `busy`
- `free`
- `tentative`
- `unavailable`

***

## EventStructuredLocation

Describes a location that can be used for location-based alarms.

- `title: string | null` – A name for the location
- `geoLocation: LocationInfo | null` – Latitude and longitude
- `radius: number` – Radius in meters for the geofence trigger

***

## AlarmProximity

Describes how a location alarm triggers:

- `none`
- `enter`
- `leave`

***

# 2. EventAlarm

`CalendarEvent` supports attaching one or more `EventAlarm` instances.
Alarms may be:

- absolute date alarms
- relative alarms (relative to the start of the event)
- location-based alarms using geofence triggers

See the EventAlarm documentation for detailed information.

***

# 3. CalendarEvent Class

## Constructor

```ts
new(): CalendarEvent
```

Creates an in-memory event instance.
Call `save()` to persist it into the calendar.

***

# 4. Properties

## General Information

### identifier: string

A unique identifier for the event.

### title: string

The title of the event.

### notes: string | null

Additional notes.

### url: string | null

A URL associated with the event.

### calendar: Calendar | null

The calendar to which the event belongs.
This property cannot be set to `null`. To remove an event, use `remove()`.

***

## Time and Location

### isAllDay: boolean

Indicates whether the event lasts all day.

### startDate: Date

The start date and time.

### endDate: Date

The end date and time.

### timeZone: string | null

The event’s time zone.

### location: string | null

A text description of the location.

### structuredLocation: EventStructuredLocation | null

A structured location that includes geolocation data for alarms.

***

## Event Metadata

### creationDate: Date | null

The date when the event was created.

### lastModifiedDate: Date | null

The date of the most recent modification.

### occurrenceDate: Date

For recurring events, this is the original scheduled date of this specific occurrence.

### isDetached: boolean

Indicates whether this event represents a modified occurrence of a recurring series.

***

## Participants and Availability

### attendees: EventParticipant\[] | null

An array of attendees.

### organizer: EventParticipant | null

The organizer of the event.

### hasAttendees: boolean

Indicates whether the event has attendees.

### availability: EventAvailability

Indicates the event’s impact on availability.

***

## Alarms

### alarms: EventAlarm\[] | null

The alarms associated with the event.

### hasAlarm: boolean

Indicates whether the event has any alarms.

***

## Recurrence

### recurrenceRules: RecurrenceRule\[] | null

The recurrence rules of the event.

### hasRecurrenceRules: boolean

Indicates whether the event has recurrence rules.

***

## Additional State Flags

### hasNotes: boolean

Indicates whether the event contains notes.

### hasChanges: boolean

Indicates whether the event or any nested objects contain unsaved changes.

***

# 5. Instance Methods

## Alarm Management

### addAlarm(alarm: EventAlarm): void

Adds an alarm to the event.

### removAlarm(alarm: EventAlarm): void

Removes an alarm from the event.
(Note: The method name is `removAlarm`.)

***

## Recurrence Management

### addRecurrenceRule(rule: RecurrenceRule): void

Appends a recurrence rule.

### removeRecurrenceRule(rule: RecurrenceRule): void

Removes a recurrence rule.

***

## Saving and Deleting

### `save(): Promise<void>`

Saves the event to the calendar.

### `remove(): Promise<void>`

Removes the event from the calendar.

***

## Editing UI

### `presentEditView(): Promise<EventEditViewAction>`

Displays the system event-editing interface and resolves with:

- `saved`
- `deleted`
- `canceled`

***

# 6. Static Methods

### `CalendarEvent.getAll(startDate: Date, endDate: Date, calendars?: Calendar[]): Promise<CalendarEvent[]>`

Fetches calendar events within a given date range.

- Provide an array of calendars to restrict the search
- Use `null` or omit the parameter to search all calendars

***

### `CalendarEvent.presentCreateView(): Promise<CalendarEvent | null>`

Displays the system interface for creating a new event.

- Returns the created event if saved
- Returns `null` if canceled

***

# 7. Usage Examples

## Creating and Saving an Event

```ts
const defaultCalendar = await Calendar.defaultForEvents()
const event = new CalendarEvent()
event.title = "Team Meeting"
event.calendar = defaultCalendar!
event.startDate = new Date("2024-01-15T09:00:00")
event.endDate = new Date("2024-01-15T10:00:00")
event.location = "Conference Room"

await event.save()
```

***

## Adding a Recurrence Rule

```ts
const rule = RecurrenceRule.create({
  frequency: "weekly",
  interval: 1,
  daysOfTheWeek: ["monday", "wednesday", "friday"],
  end: RecurrenceEnd.fromDate(new Date("2024-12-31")),
})

event.addRecurrenceRule(rule)
await event.save()
```

***

## Adding an Alarm

```ts
const alarm = EventAlarm.fromRelativeOffset(-600)
event.addAlarm(alarm)
await event.save()
```

***

## Fetching Events

```ts
const events = await CalendarEvent.getAll(
  new Date("2024-01-01"),
   new Date("2024-01-31")
 )

for (const e of events) {
  console.log(`Event: ${e.title}, Starts: ${e.startDate}`)
}
```

***

## Presenting the Create View

```ts
const created = await CalendarEvent.presentCreateView()
if (created) {
  console.log("Created event:", created.title)
}
```

***

## Editing an Existing Event

```ts
const result = await event.presentEditView()
console.log("Edit action:", result)
```

***

## Removing an Event

```ts
await event.remove()
console.log("Event removed")
```

***

# 8. Additional Notes

### Time Zone Considerations

When working with events that span time zones, set `timeZone` explicitly to avoid incorrect scheduling or display.

### Recurring Events

Editing individual occurrences of a recurring event may produce a detached instance.
Use `occurrenceDate` to determine the original date of the modified occurrence.

### Attendees

Attendee data depends on the calendar source (iCloud, Exchange, etc.) and may vary in availability.

### Structured Location

When using location-based alarms, the user must grant the necessary location permissions.
