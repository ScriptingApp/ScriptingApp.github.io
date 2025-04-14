---
title: Location
---
The `Location` API provides methods to access the device's current location, reverse-geocode coordinates into address information, and pick locations using the iOS built-in map. This API supports setting location accuracy and working with geolocation data in your app.

---

## Class: `Location`

The `Location` class enables you to interact with the device's location services. Use this API to get the current location, reverse-geocode coordinates, or allow users to select a location on a map.

---

### Methods

#### **`Location.setAccuracy(accuracy: LocationAccuracy): Promise<void>`**  
Sets the accuracy level of the location data that the app requests.  
- **`accuracy`**: The desired accuracy level, such as `high` or `low`. (Refer to the `LocationAccuracy` documentation for possible values.)

#### **`Location.requestCurrent(): Promise<LocationInfo | null>`**  
Requests a one-time retrieval of the user’s current location.  
- Returns a `LocationInfo` object containing the latitude, longitude, and other location details, or `null` if the location could not be retrieved.

#### **`Location.pickFromMap(): Promise<LocationInfo | null>`**  
Presents the iOS built-in map interface to let the user pick a location.  
- Returns a `LocationInfo` object with the selected location's details, or `null` if the user cancels the selection.

#### **`Location.reverseGeocode(options: { latitude: number; longitude: number; locale?: string }): Promise<LocationPlacemark[] | null>`**  
Submits a reverse-geocoding request for the specified coordinates to retrieve address information.  
- **Parameters**:
  - `latitude: number`: The latitude in degrees.
  - `longitude: number`: The longitude in degrees.
  - `locale?: string`: The locale for the returned address information. Specify `null` to use the user’s default locale.  
- Returns an array of `LocationPlacemark` objects representing address details, or `null` if the reverse-geocoding fails.

---

### Types

#### **`LocationInfo`**
Represents the location data retrieved from the device or user selection.  
- `latitude: number`: The latitude of the location.
- `longitude: number`: The longitude of the location.
- `altitude?: number`: The altitude of the location, if available.
- `horizontalAccuracy?: number`: The horizontal accuracy of the location data.
- `verticalAccuracy?: number`: The vertical accuracy of the location data.
- `timestamp: Date`: The timestamp when the location data was retrieved.

#### **`LocationPlacemark`**
Represents the address details for a specific location.  
- `name?: string`: The name of the place (e.g., landmark name).
- `thoroughfare?: string`: The street name.
- `subThoroughfare?: string`: The street number.
- `locality?: string`: The city name.
- `subLocality?: string`: The district or neighborhood.
- `administrativeArea?: string`: The state or province.
- `subAdministrativeArea?: string`: The county or other subdivision.
- `postalCode?: string`: The postal or ZIP code.
- `country?: string`: The country name.
- `isoCountryCode?: string`: The ISO country code.

#### **`LocationAccuracy`**
Defines the desired accuracy level for location data.  
- Possible values: `"high"`, `"medium"`, `"low"`.

---

## Examples

### Set Location Accuracy
```ts
await Location.setAccuracy("high")
console.log("Location accuracy set to high.")
```

---

### Get Current Location
```ts
const currentLocation = await Location.requestCurrent()
if (currentLocation) {
  console.log(`Latitude: ${currentLocation.latitude}, Longitude: ${currentLocation.longitude}`)
} else {
  console.log("Failed to retrieve the current location.")
}
```

---

### Pick a Location on the Map
```ts
const selectedLocation = await Location.pickFromMap()
if (selectedLocation) {
  console.log(`User selected location: Latitude ${selectedLocation.latitude}, Longitude ${selectedLocation.longitude}`)
} else {
  console.log("Location selection canceled.")
}
```

---

### Reverse Geocode Coordinates
```ts
const placemarks = await Location.reverseGeocode({
  latitude: 37.7749,
  longitude: -122.4194,
  locale: "en-US"
})

if (placemarks) {
  for (const placemark of placemarks) {
    console.log(`Address: ${placemark.name}, ${placemark.locality}, ${placemark.country}`)
  }
} else {
  console.log("Failed to retrieve address information.")
}
```

---

## Additional Notes

- **Permission Requirements:** Ensure the app has the appropriate location permissions enabled in the system settings before using the `Location` API.
- **Accuracy Trade-offs:** Higher accuracy settings may consume more battery power and take longer to retrieve location data. Use lower accuracy for non-critical tasks to save resources.
- **Error Handling:** Always handle potential null values when working with location data, as services may fail due to connectivity or user permissions.
