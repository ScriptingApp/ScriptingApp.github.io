---
title: Location
description: Add requestHeading、 addHeadingListener、removeHeadingListener, etc.

---

The Location API provides access to the device’s geographic location, geocoding services, system map location picking, and heading (compass) information. It is available as a global API in Scripting and can be used directly without importing any modules.

The API respects system permissions, user-selected accuracy levels, and platform limitations, and is suitable for scripts, interactive views, and supported widget scenarios.

## LocationAccuracy

Defines the desired accuracy level for location data.

**Type Definition**

```ts
type LocationAccuracy =
  | "best"
  | "tenMeters"
  | "hundredMeters"
  | "kilometer"
  | "threeKilometers"
  | "bestForNavigation"
  | "reduced"
```

**Description**

* `best`
  Requests the highest accuracy available on the device.

* `tenMeters`
  Requests approximately 10-meter accuracy.

* `hundredMeters`
  Requests approximately 100-meter accuracy.

* `kilometer`
  Requests approximately 1-kilometer accuracy.

* `threeKilometers`
  Requests coarse accuracy within approximately 3 kilometers.

* `bestForNavigation`
  Optimized for navigation use cases, with higher update frequency and power consumption.

* `reduced`
  Requests reduced-accuracy location data, typically used when the user has granted approximate location access.

## LocationInfo

Represents a geographic coordinate with an associated timestamp.

**Type Definition**

```ts
type LocationInfo = {
  latitude: number
  longitude: number
  timestamp: number
}
```

**Properties**

* `latitude`
  Latitude in degrees.

* `longitude`
  Longitude in degrees.

* `timestamp`
  Time when the location was recorded, in milliseconds since the Unix epoch.

## LocationPlacemark

Provides a human-readable description of a geographic location, usually returned by geocoding operations.

**Type Definition**

```ts
type LocationPlacemark = {
  location?: LocationInfo
  region?: string
  timeZone?: string
  name?: string
  thoroughfare?: string
  subThoroughfare?: string
  locality?: string
  subLocality?: string
  administrativeArea?: string
  subAdministrativeArea?: string
  postalCode?: string
  isoCountryCode?: string
  country?: string
  inlandWater?: string
  ocean?: string
  areasOfInterest?: string[]
}
```

**Description**

A placemark may include address components, administrative regions, country information, and points of interest. Field availability depends on the location and system map data.

## Heading

Represents compass and orientation information derived from the device’s sensors.

**Type Definition**

```ts
type Heading = {
  headingAccuracy: number
  trueHeading: number
  magneticHeading: number
  timestamp: Date
  x: number
  y: number
  z: number
}
```

**Properties**

* `headingAccuracy`
  Maximum deviation, in degrees, between the reported heading and the true geomagnetic heading.

* `trueHeading`
  Heading relative to true north, in degrees.

* `magneticHeading`
  Heading relative to magnetic north, in degrees.

* `timestamp`
  Time at which the heading was measured.

* `x`, `y`, `z`
  Raw geomagnetic field values for the three axes, measured in microteslas.

## Authorization and Configuration

### isAuthorizedForWidgetUpdates

```ts
const isAuthorizedForWidgetUpdates: boolean
```

Indicates whether the current widget is eligible to receive location updates.

### accuracy

```ts
const accuracy: LocationAccuracy
```

The currently configured desired location accuracy.

### setAccuracy

```ts
function setAccuracy(accuracy: LocationAccuracy): Promise<void>
```

Sets the desired accuracy level for subsequent location requests. Higher accuracy may increase power consumption and require additional permissions.

**Example**

```ts
await Location.setAccuracy("hundredMeters")
```

## Requesting Location

### requestCurrent

```ts
function requestCurrent(
  options?: { forceRequest?: boolean }
): Promise<LocationInfo | null>
```

Requests the device’s current location.

By default, a cached location is returned immediately if available. If no cached location exists, a new location request is performed.

When `forceRequest` is set to `true`, any cached location is ignored and a fresh request is always made.

**Example**

```ts
const location = await Location.requestCurrent()

if (location) {
  console.log(location.latitude, location.longitude)
}
```

Forcing a fresh location request:

```ts
const location = await Location.requestCurrent({
  forceRequest: true
})
```

### pickFromMap

```ts
function pickFromMap(): Promise<LocationInfo | null>
```

Presents the system map interface and allows the user to manually select a location.

**Example**

```ts
const picked = await Location.pickFromMap()

if (picked) {
  console.log("Picked location:", picked.latitude, picked.longitude)
}
```

## Geocoding

### reverseGeocode

```ts
function reverseGeocode(options: {
  latitude: number
  longitude: number
  locale?: string
}): Promise<LocationPlacemark[] | null>
```

Converts a geographic coordinate into human-readable address information.

**Example**

```ts
const placemarks = await Location.reverseGeocode({
  latitude: 39.9042,
  longitude: 116.4074,
  locale: "en-US"
})

console.log(placemarks?.[0]?.locality)
```

### geocodeAddress

```ts
function geocodeAddress(options: {
  address: string
  locale?: string
}): Promise<LocationPlacemark[] | null>
```

Converts a textual address into geographic placemark results.

**Example**

```ts
const results = await Location.geocodeAddress({
  address: "Times Square",
  locale: "en-US"
})

const location = results?.[0]?.location
```

## Heading and Compass

### requestHeading

```ts
function requestHeading(): Promise<Heading | null>
```

Returns the most recently reported heading. If heading updates have never been started, the result is `null`.

**Example**

```ts
const heading = await Location.requestHeading()

if (heading) {
  console.log(heading.trueHeading)
}
```

### startUpdatingHeading

```ts
function startUpdatingHeading(): Promise<void>
```

Starts continuous heading updates.

### stopUpdatingHeading

```ts
function stopUpdatingHeading(): void
```

Stops heading updates and releases related system resources.

### addHeadingListener

```ts
function addHeadingListener(
  listener: (heading: Heading) => void
): void
```

Registers a listener that is called whenever the heading changes.

**Example**

```ts
await Location.startUpdatingHeading()

Location.addHeadingListener(heading => {
  console.log("Heading:", heading.trueHeading)
})
```

### removeHeadingListener

```ts
function removeHeadingListener(
  listener?: (heading: Heading) => void
): void
```

Removes a previously registered heading listener. If no listener is provided, all heading listeners are removed.
