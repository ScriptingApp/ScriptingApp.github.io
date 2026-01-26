# MediaTime

`MediaTime` represents **precise media time values** in audio and video processing. It is the fundamental time type used by MediaComposer in Scripting.

Conceptually, `MediaTime` corresponds to a time value with an explicit time base (similar to `CMTime` in AVFoundation), but provides a safer and more expressive abstraction for the scripting layer.

A `MediaTime` instance can represent **numeric time**, **invalid time**, **indefinite time**, or **infinite time**, and supports strict arithmetic and comparison operations.

***

## Key Features

- Precise construction using **value + timescale** or **seconds + preferredTimescale**
- Time scaling with configurable rounding methods
- Safe arithmetic and comparison operations
- Explicit modeling of invalid, indefinite, and infinite time values
- Designed for timeline composition, trimming, alignment, fades, and placement

***

## Time Precision Model

`MediaTime` is based on the following core concepts:

- **value**: an integer time value
- **timescale**: the number of time units per second

Examples:

- `value = 300`, `timescale = 600` → 0.5 seconds
- `value = 18000`, `timescale = 600` → 30 seconds

This model allows frame-accurate or sample-accurate timing without relying on floating-point arithmetic.

***

## Read-only Properties

### secondes

```ts
readonly secondes: number
```

The time expressed in seconds as a floating-point value.
This is a derived value intended mainly for display or debugging. It is **not recommended for timeline calculations**.

***

### isValid

```ts
readonly isValid: boolean
```

Indicates whether the time is valid and usable for calculations.
Returns `false` for invalid, indefinite, or infinite time values.

***

### isPositiveInfinity / isNegativeInfinity

```ts
readonly isPositiveInfinity: boolean
readonly isNegativeInfinity: boolean
```

Indicates whether the time represents positive or negative infinity.
These values are typically used as internal boundary markers in timeline logic.

***

### isIndefinite

```ts
readonly isIndefinite: boolean
```

Indicates whether the time is indefinite.
This is commonly used when a media asset’s duration has not yet been determined.

***

### isNumeric

```ts
readonly isNumeric: boolean
```

Indicates whether the time can participate in numeric calculations.
Arithmetic and comparison operations should only be performed when this value is `true`.

***

### hasBeenRounded

```ts
readonly hasBeenRounded: boolean
```

Indicates whether the time has undergone rounding during construction or scale conversion.
This is useful when validating frame- or sample-accurate timelines.

***

## Time Conversion

### convertScale

```ts
convertScale(newTimescale: number, method: MediaTimeRoundingMethod): MediaTime
```

Converts the time to a new timescale using the specified rounding method.

**Typical use cases:**

- Aligning video frame timing (e.g. 600, 90000)
- Aligning audio sample timing (e.g. 44100, 48000)
- Avoiding precision errors caused by mixed timescales

***

## Accessing Time Values

### getSeconds

```ts
getSeconds(): number
```

Returns the time expressed in seconds as a floating-point value.
Semantically equivalent to reading `secondes`, but clearer in intent.

***

## Time Arithmetic

### plus / minus

```ts
plus(other: MediaItem): MediaItem
minus(other: MediaItem): MediaItem
```

Performs time addition or subtraction and returns a new `MediaTime`.

- Both operands must be numeric
- The original instances are not modified
- The result follows the internal time base rules

***

## Time Comparison

```ts
lt(other: MediaItem): boolean
gt(other: MediaItem): boolean
lte(other: MediaItem): boolean
gte(other: MediaItem): boolean
eq(other: MediaItem): boolean
neq(other: MediaItem): boolean
```

Compares two time values.

- Supports strict ordering and equality checks
- Produces deterministic results even for non-numeric times
- Recommended for timeline sorting, trimming, and boundary checks

***

## Static Constructors

### make

```ts
static make(options: {
  value: number
  timescale: number
} | {
  seconds: number
  preferredTimescale: number
}): MediaTime
```

Creates a `MediaTime` instance.

#### Using value + timescale

```ts
MediaTime.make({
  value: 300,
  timescale: 600
})
```

Best suited for low-level or precision-critical scenarios.

***

#### Using seconds + preferredTimescale

```ts
MediaTime.make({
  seconds: 5,
  preferredTimescale: 600
})
```

Recommended for most scripting-level use cases where seconds are the primary unit.

***

### zero

```ts
static zero(): MediaTime
```

Returns a `MediaTime` representing **0 seconds**.

***

### invalid

```ts
static invalid(): MediaTime
```

Returns an invalid time value.
Useful for explicitly representing errors or unavailable timing information.

***

### indefinite

```ts
static indefinite(): MediaTime
```

Returns an indefinite time value.
Typically used when a media asset’s duration is not yet known.

***

### positiveInfinity / negativeInfinity

```ts
static positiveInfinity(): MediaTime
static negativeInfinity(): MediaTime
```

Returns positive or negative infinite time values.
These are mainly intended for internal timeline boundary handling and are not recommended for general scripting logic.

***

## Usage Guidelines and Best Practices

- Avoid using floating-point seconds directly for timeline calculations; prefer `MediaTime`
- Explicitly convert timescales when mixing audio and video sources
- Check `isNumeric` before performing arithmetic or comparisons
- Use consistent timescales when constructing `TimeRange` or `at` values

***

## Typical Usage in MediaComposer

- Placing audio or video clips on the timeline (`AudioClip.at`)
- Defining trimming ranges (`TimeRange`)
- Calculating precise export durations
- Driving fades, alignment, looping, and synchronization behavior
