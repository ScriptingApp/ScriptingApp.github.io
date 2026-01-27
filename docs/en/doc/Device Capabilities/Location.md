---
title: Location

---

The global `Location` API provides access to the device’s geographic location, including one-time location retrieval, reverse geocoding, user-driven location selection via map, accuracy control, and permission checking for widgets.

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

### `Location.requestCurrent(options?: { forceRequest?: boolean }): Promise<LocationInfo | null>`

Requests the user's current location once. May trigger a permission prompt if not previously granted.

By default, if a cached location is available, it will be returned immediately. If no cached location exists, a new request will be made. To force a new location retrieval even if a cached value exists, pass `{ forceRequest: true }`.

#### Parameters

| Option         | Type      | Required | Description                                                     |
| -------------- | --------- | -------- | --------------------------------------------------------------- |
| `forceRequest` | `boolean` | No       | If `true`, bypasses the cache and always requests new location. |

```ts
const location = await Location.requestCurrent({ forceRequest: true })
if (location) {
  console.log("Latitude:", location.latitude)
  console.log("Longitude:", location.longitude)
  console.log("Timestamp:", location.timestamp)
}
```

---

### `Location.pickFromMap(): Promise<LocationInfo | null>`

Opens the built-in map interface to allow the user to manually select a location.

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

Specifies the desired accuracy of location data:

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

Represents a geographic coordinate with timestamp:

```ts
type LocationInfo = {
  /**
   * The latitude in degrees.
   */
  latitude: number
  /**
   * The longitude in degrees.
   */
  longitude: number
  /**
   * Timestamp of when the location was recorded, in milliseconds since epoch.
   */
  timestamp: number
}
```

---

### `LocationPlacemark`

Represents a human-readable description of a geographic coordinate, typically returned by reverse geocoding. Includes structured location details such as city, country, and street.

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

#### Field Descriptions

| Field                   | Type           | Description                                                                     |
| ----------------------- | -------------- | ------------------------------------------------------------------------------- |
| `location`              | `LocationInfo` | The coordinates of the placemark (typically the same as reverse geocode input). |
| `region`                | `string`       | General region or province/state.                                               |
| `timeZone`              | `string`       | Time zone identifier (e.g., `"Asia/Shanghai"`).                                 |
| `name`                  | `string`       | Generic name such as building, landmark, or area.                               |
| `thoroughfare`          | `string`       | Street name (e.g., `"Main St"`, `"Zhongguancun Ave"`).                          |
| `subThoroughfare`       | `string`       | Street-level detail like building number or unit.                               |
| `locality`              | `string`       | City or town.                                                                   |
| `subLocality`           | `string`       | Subdivision of the locality (e.g., neighborhood or district).                   |
| `administrativeArea`    | `string`       | Province, state, or equivalent administrative area.                             |
| `subAdministrativeArea` | `string`       | Further subdivision like county or district.                                    |
| `postalCode`            | `string`       | ZIP or postal code.                                                             |
| `isoCountryCode`        | `string`       | ISO 3166-1 alpha-2 country code (e.g., `"US"`, `"CN"`).                         |
| `country`               | `string`       | Full name of the country or region.                                             |
| `inlandWater`           | `string`       | Name of nearby inland water (river/lake), if applicable.                        |
| `ocean`                 | `string`       | Name of nearby ocean, if applicable.                                            |
| `areasOfInterest`       | `string[]`     | List of nearby points of interest or landmarks (e.g., `"Times Square"`).        |

---

## Example Usage

### Reverse Geocode

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

### Address Formatter (Helper)

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

## Best Practices & Use Cases

* Use `areasOfInterest` and `name` to display user-friendly place names.
* Use `postalCode`, `locality`, and `administrativeArea` for autofill and geotagging.
* Use `timestamp` to determine freshness of location data.
* Use `timeZone` for localizing time-based features.
* Set location accuracy before calling `requestCurrent` for optimal precision.
* Always check widget permissions via `isAuthorizedForWidgetUpdates()`.

---

## Notes

* Reverse geocoding may return multiple results. Use the first placemark for best relevance.
* If location retrieval fails, `null` is returned.
* When `forceRequest` is false or omitted, cached location may be used for faster results.
* In widgets, location access may be restricted. Always verify permissions explicitly.
