## Overview

The `Photos` class provides methods for accessing and managing photos in the user's library. This includes functions to get the latest photos, pick photos from a picker dialog, take a new photo, and save an image to the library.

---

### Class: `Photos`

> The `Photos` class is a static utility class. There is no need to create an instance of this class; you can directly call its static methods.

#### Methods

---

### `getLatestPhotos(count: number): Promise<UIImage[] | null>`

Retrieves the latest specified number of photos from the Photos app.

- **Parameters**:
  - `count` (number): The number of photos to retrieve.

- **Returns**: `Promise<UIImage[] | null>`  
  A promise that resolves to an array of `UIImage` objects representing the photos. If the request fails, the promise resolves to `null`.

- **Example**:
  ```typescript
  const photos = await Photos.getLatestPhotos(10)
  if (photos) {
      console.log("Retrieved photos:", photos)
  } else {
      console.log("Failed to retrieve photos.")
  }
  ```

---

### `pickPhotos(count: number): Promise<UIImage[]>`

Opens a photo picker dialog to allow the user to select a limited number of photos.

- **Parameters**:
  - `count` (number): The maximum number of photos the user is allowed to pick.

- **Returns**: `Promise<UIImage[]>`  
  A promise that resolves to an array of `UIImage` objects representing the selected photos.

- **Example**:
  ```typescript
  const selectedPhotos = await Photos.pickPhotos(5)
  console.log("User selected photos:", selectedPhotos)
  ```

---

### `takePhoto(): Promise<UIImage | null>`

Allows the user to take a photo using the camera, returning a `UIImage` when successful.

- **Returns**: `Promise<UIImage | null>`  
  A promise that resolves to a `UIImage` representing the taken photo. If the operation is unsuccessful, the promise resolves to `null`.

- **Example**:
  ```typescript
  const photo = await Photos.takePhoto()
  if (photo) {
      console.log("Photo taken:", photo)
  } else {
      console.log("Photo capture was unsuccessful.")
  }
  ```

---

### `savePhoto(image: Data, options?: { fileName?: string }): Promise<boolean>`

Saves an image to the Photos app with optional metadata.

- **Parameters**:
  - `image` (Data): The image data to be saved.
  - `options` (object, optional): Additional save options.
    - `fileName` (string, optional): The name for the photo to be saved.

- **Returns**: `Promise<boolean>`  
  A promise that resolves to `true` if the photo was successfully saved, or `false` otherwise.

- **Example**:
  ```typescript
  const imageData = Data.fromJPEG(uiImage)! /* Image data source */
  const success = await Photos.savePhoto(imageData, { fileName: "Vacation Photo" })
  if (success) {
      console.log("Photo saved successfully.")
  } else {
      console.log("Failed to save the photo.")
  }
  ```

---

### Notes

- **Error Handling**: Each method returns a promise, so you can handle errors using `try...catch` in an asynchronous context.
- **Permissions**: The app may request permission to access the user’s photo library or camera the first time you use certain methods. Make sure to handle these permissions appropriately.

---

The `Photos` interface makes it easy to integrate photo library and camera functionalities into your scripts, allowing for rich interaction with the user’s photos.
