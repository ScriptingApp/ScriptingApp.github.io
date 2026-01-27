---
title: Time-based label views

---

Scripting provides a set of convenient time-related label components that wrap SwiftUI's `Text` styles. These components allow you to display live-updating or formatted date and time strings in widgets and views, with support for dynamic behaviors like relative time and timers.

---

## `DateLabel`

Displays a dynamic label representing a single point in time using a specified style. This is ideal for widgets that need to show time-based data even when not actively running.

### Props

```ts
type DateLabelProps = {
  timestamp: number
  style: 'date' | 'time' | 'timer' | 'relative' | 'offset'
}
```

- `timestamp`: A UNIX timestamp in milliseconds representing the date to be 

- `style`: The display style. Can be: 
  - `"date"`: e.g. `"June 3, 2019"`
  - `"time"`: e.g. `"11:23PM"`
  - `"timer"`: a running timer string
  - `"relative"`: e.g. `"2 hours, 23 minutes"`
  - `"offset"`: e.g. `+2 hours`, `-3 months`
  

### Example

```tsx
<DateLabel
  timestamp={Date.now()}
  style="date"
/>

<DateLabel
  timestamp={Date.now()}
  style="timer"
/>
```

---

## `DateRangeLabel`

Displays a localized textual representation of a time range between two dates.

### Props

```ts
type DateRangeLabelProps = {
  from: number
  to: number
}
```

| Property | Description                               |
| -------- | ----------------------------------------- |
| `from`   | The start date timestamp in milliseconds. |
| `to`     | The end date timestamp in milliseconds.   |

### Example

```tsx
<DateRangeLabel
  from={Date.now()}
  to={Date.now() + 1000 * 60}
/>
```

---

## `DateIntervalLabel`

Displays a formatted time interval, typically between two times on the same day (e.g., for event scheduling).

### Props

Same as `DateRangeLabelProps`:

```ts
type DateIntervalLabelProps = {
  from: number
  to: number
}
```

### Example

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

Output example: `"9:30 AM – 3:30 PM"`

---

## `TimerIntervalLabel`

Displays a live-updating timer counting up or down between two timestamps. Optionally, the timer can pause at a specific point.

### Props

```ts
type TimerIntervalLabelProps = {
  from: number
  to: number
  pauseTime?: number
  countsDown?: boolean
  showsHours?: boolean
}
```

| Property     | Description                                                                                         |
| ------------ | --------------------------------------------------------------------------------------------------- |
| `from`       | Start timestamp of the interval.                                                                    |
| `to`         | End timestamp of the interval.                                                                      |
| `pauseTime`  | (Optional) A timestamp at which the timer should pause. If undefined, the timer runs to completion. |
| `countsDown` | (Optional) Whether to count down. Defaults to `true`.                                               |
| `showsHours` | (Optional) Whether to show the hour component when over 60 minutes. Defaults to `true`.             |

### Example

```tsx
<TimerIntervalLabel
  from={Date.now()}
  to={Date.now() + 1000 * 60 * 12}
  pauseTime={Date.now() + 1000 * 60 * 10}
/>
```

This displays a countdown from 12 minutes and pauses at the 10-minute mark.
