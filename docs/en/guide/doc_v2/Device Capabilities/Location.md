---
title: Location
---
The global `Location` API provides access to the device’s geographic location, including one-time location retrieval, reverse geocoding, user-driven location selection via map, and accuracy control. It also supports permission checking for widgets that need location updates.

---

## Overview

This API allows you to:

* Request the device's current location
* Select a location manually using a map interface
* Reverse geocode latitude and longitude to address details
* Adjust location accuracy settings
* Check location access status for widgets

**Note**: This is a global API and does not require import.

---

## API Reference

### `Location.isAuthorizedForWidgetUpdates(): Promise<boolean>`

Checks whether widgets have permission to receive location updates.

```ts
const isAuthorized = await Location.isAuthorizedForWidgetUpdates()
if (!isAuthorized) {
  console.log("Widget location access is not authorized.")
}
```

---

### `Location.setAccuracy(accuracy: LocationAccuracy): Promise<void>`

Sets the desired accuracy level for location retrieval. Higher accuracy may increase battery usage and wait time.

#### Parameters

| Value               | Description                |
| ------------------- | -------------------------- |
| `"best"`            | Maximum available accuracy |
| `"tenMeters"`       | Within 10 meters           |
| `"hundredMeters"`   | Within 100 meters          |
| `"kilometer"`       | Within 1 kilometer         |
| `"threeKilometers"` | Within 3 kilometers        |

```ts
await Location.setAccuracy("hundredMeters")
```

---

### `Location.requestCurrent(): Promise<LocationInfo | null>`

Requests the user's current location once. May trigger a permission prompt if not previously granted.

```ts
const location = await Location.requestCurrent()
if (location) {
  console.log("Latitude:", location.latitude)
  console.log("Longitude:", location.longitude)
}
```

---

### `Location.pickFromMap(): Promise<LocationInfo | null>`

Opens the built-in map interface to allow the user to pick a location manually.

```ts
const selected = await Location.pickFromMap()
if (selected) {
  console.log("User selected:", selected.latitude, selected.longitude)
}
```

---

### `Location.reverseGeocode(options): Promise<LocationPlacemark[] | null>`

Converts latitude and longitude into human-readable place information such as street, city, and country.

#### Parameters

| Field       | Type     | Required | Description                                                     |
| ----------- | -------- | -------- | --------------------------------------------------------------- |
| `latitude`  | `number` | Yes      | Latitude in degrees                                             |
| `longitude` | `number` | Yes      | Longitude in degrees                                            |
| `locale`    | `string` | No       | Optional locale (e.g., `"en-US"`). Defaults to device language. |

```ts
const placemarks = await Location.reverseGeocode({
  latitude: 51.5074,
  longitude: -0.1278,
  locale: "en-GB"
})

if (placemarks?.length) {
  const place = placemarks[0]
  console.log("City:", place.locality)
  console.log("Country:", place.country)
}
```

---

## Types

### `LocationAccuracy`

Specifies the accuracy of the location data:

```ts
type LocationAccuracy =
  | "best"
  | "tenMeters"
  | "hundredMeters"
  | "kilometer"
  | "threeKilometers"
```

---

### `LocationInfo`

Represents a geographic coordinate:

```ts
type LocationInfo = {
  latitude: number
  longitude: number
}
```

---

### `LocationPlacemark`

Represents a human-readable description of a geographic coordinate, typically returned by reverse geocoding. It contains structured location details, such as street, city, region, country, and points of interest.

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

### Field Descriptions

| Field                   | Type           | Description                                                                                  |
| ----------------------- | -------------- | -------------------------------------------------------------------------------------------- |
| `location`              | `LocationInfo` | The latitude and longitude of the placemark (usually the same as the reverse geocode input). |
| `region`                | `string`       | A general regional name, such as a province or state.                                        |
| `timeZone`              | `string`       | The time zone identifier (e.g., `"Asia/Shanghai"`).                                          |
| `name`                  | `string`       | A generic name for the place, such as a building or landmark.                                |
| `thoroughfare`          | `string`       | The street name, such as `"Main Street"` or `"Zhongguancun Ave"`.                            |
| `subThoroughfare`       | `string`       | Additional street-level info, such as building number `"123"` or unit info.                  |
| `locality`              | `string`       | The city or town name.                                                                       |
| `subLocality`           | `string`       | A sub-area of the city or town, such as a neighborhood or district.                          |
| `administrativeArea`    | `string`       | The state, province, or similar administrative region.                                       |
| `subAdministrativeArea` | `string`       | A further subdivision within the administrative area, such as a county or district.          |
| `postalCode`            | `string`       | The postal or ZIP code.                                                                      |
| `isoCountryCode`        | `string`       | The ISO 3166-1 alpha-2 country code (e.g., `"US"`, `"CN"`).                                  |
| `country`               | `string`       | The full name of the country or region.                                                      |
| `inlandWater`           | `string`       | The name of a nearby inland body of water (lake, river), if applicable.                      |
| `ocean`                 | `string`       | The name of a nearby ocean, if applicable.                                                   |
| `areasOfInterest`       | `string[]`     | An array of nearby points of interest or landmarks (e.g., `"Times Square"`).                 |

---

#### Example Usage

```ts
const placemarks = await Location.reverseGeocode({
  latitude: 40.7128,
  longitude: -74.0060,
  locale: "en-US"
})

if (placemarks?.length) {
  const place = placemarks[0]
  console.log("Country:", place.country)
  console.log("City:", place.locality)
  console.log("Street:", place.thoroughfare, place.subThoroughfare)
  console.log("Full Name:", place.name)
  console.log("Postal Code:", place.postalCode)
  console.log("Points of Interest:", place.areasOfInterest?.join(", "))
}
```

---

#### Suggested Address Formatter

You can use the following function to construct a compact, readable address string:

```ts
function formatAddress(p: LocationPlacemark): string {
  return [
    p.country,
    p.administrativeArea,
    p.locality,
    p.subLocality,
    p.thoroughfare,
    p.subThoroughfare
  ].filter(Boolean).join(", ")
}
```

---

#### Practical Use Cases

* Use `areasOfInterest` and `name` to display user-friendly labels (e.g., “Empire State Building”).
* Use `postalCode`, `locality`, and `administrativeArea` for auto-filling forms or location tagging.
* Use `timeZone` for generating time-sensitive notifications or scheduling events in the user’s local time.
* Combine `thoroughfare` and `subThoroughfare` for a complete street address.

---

## Notes

* Reverse geocoding may return multiple placemarks; typically, the first one is the most relevant.
* `null` is returned if the location or geocoding fails.
* You should call `setAccuracy` before `requestCurrent` to control precision based on your use case.
* When used in widgets, permissions may be limited; use `isAuthorizedForWidgetUpdates` to verify access.
