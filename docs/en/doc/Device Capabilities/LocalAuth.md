---
title: LocalAuth

---

The `LocalAuth` API is a wrapper around the iOS Local Authentication framework, enabling biometric or passcode authentication in your Scripting app scripts. This document explains how to use the `LocalAuth` API effectively.

## Overview
The `LocalAuth` module provides methods and properties for checking authentication availability and performing user authentication. It supports biometrics like Face ID, Touch ID, and Optic ID, as well as fallback options like passcodes.

---

## Properties

### `LocalAuth.isAvailable`
- **Type:** `boolean`
- **Description:** Indicates whether authentication can proceed using any available policies.
- **Example:**
  ```tsx
  if (LocalAuth.isAvailable) {
    console.log("Authentication is available.")
  } else {
    console.log("Authentication is not available.")
  }
  ```

### `LocalAuth.isBiometricsAvailable`
- **Type:** `boolean`
- **Description:** Indicates whether biometric authentication can proceed.
- **Example:**
  ```tsx
  if (LocalAuth.isBiometricsAvailable) {
    console.log("Biometric authentication is available.")
  } else {
    console.log("Biometric authentication is not available.")
  }
  ```

### `LocalAuth.biometryType`
- **Type:** `LocalAuthBiometryType`
- **Description:** Specifies the type of biometric authentication supported by the device. Possible values:
  - `"faceID"`
  - `"touchID"`
  - `"opticID"`
  - `"none"`
  - `"unknown"`
- **Example:**
  ```tsx
  const biometry = LocalAuth.biometryType
  console.log(`Biometry type: ${biometry}`)
  ```

---

## Methods

### `LocalAuth.authenticate(reason: string, useBiometrics?: boolean): Promise<boolean>`
- **Description:** Authenticates the user with available biometrics or a fallback method (e.g., passcode). Returns a promise that resolves to `true` if authentication succeeds, or `false` if it fails.
- **Parameters:**
  - `reason` (string): The message displayed to the user when prompting for authentication. This must not be empty. Example: `'Authenticate to access MyScript.'`
  - `useBiometrics` (boolean, optional): Defaults to `true`. If `true`, the method uses biometrics for authentication otherwise, it uses biometrics or a fallback method (e.g., passcode).
- **Example:**
  ```tsx
  async function authenticateUser() {
    const reason = "Authenticate to access MyScript."
    const result = await LocalAuth.authenticate(reason, true)
    if (result) {
      console.log("Authentication succeeded.")
    } else {
      console.log("Authentication failed.")
    }
  }

  authenticateUser()
  ```

---

## Usage Examples

### Check Biometric Availability
```tsx
if (LocalAuth.isBiometricsAvailable) {
  console.log("Device supports biometric authentication.")
  console.log(`Biometry type: ${LocalAuth.biometryType}`)
} else {
  console.log("Biometric authentication is not supported on this device.")
}
```

### Authenticate with Biometrics
```tsx
async function accessSecureData() {
  const authenticated = await LocalAuth.authenticate(
    "Authenticate to access secure data."
  )
  if (authenticated) {
    console.log("Access granted.")
  } else {
    console.log("Access denied.")
  }
}

accessSecureData()
```

### Fallback to Passcode Authentication
```tsx
async function authenticateWithFallback() {
  const authenticated = await LocalAuth.authenticate(
    "Authenticate to proceed.",
    false // Allow biometrics or passcode
  )
  console.log(authenticated ? "Authenticated" : "Authentication failed")
}

authenticateWithFallback()
```

---

## Notes
- Always provide a meaningful message in the `reason` parameter to help users understand why authentication is being requested.
- Use `LocalAuth.isAvailable` and `LocalAuth.isBiometricsAvailable` to check the availability of authentication options before invoking `LocalAuth.authenticate`.
- Handle both success and failure cases gracefully to provide a seamless user experience.

