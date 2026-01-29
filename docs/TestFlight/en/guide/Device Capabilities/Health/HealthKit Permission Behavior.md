---
title: HealthKit Permission Behavior
description: iOS HealthKit-specific permission behavior.
tag: PRO
---

When using the Health module provided by the Scripting app to access iOS HealthKit data, it's important to understand how HealthKit handles authorization and how Scripting adapts to these behaviors. This document explains the authorization flow, Promise behavior, and best practices for handling missing permissions.

---

## Key Characteristics of iOS HealthKit Authorization

1. **No public API to check authorization status**
   iOS does not provide any public API to determine whether a specific HealthKit data type has been authorized or denied. Apps cannot check this directly.

2. **Authorization prompt appears only once per type**
   The system will show a permission dialog only if the data type's status is `notDetermined`. Once the user grants or denies access, the dialog will not reappear.

3. **No system-level error if access is denied**
   If an app attempts to access unauthorized data, HealthKit will not throw a system error. Instead, some APIs return empty results, while others may reject the Promise.

---

## Scripting App Behavior

### Automatic Authorization Request

When you call any Health API that requires access to protected data, the Scripting app will automatically trigger the system permission dialog **if any of the required types are not yet determined**.

For example:

```ts
await Health.dateOfBirth()
await Health.bloodType()
await Health.queryQuantitySamples('stepCount')
```

---

## Promise Behavior by API

| Method                             | Behavior if unauthorized | Promise rejects? |
| ---------------------------------- | ------------------------ | ---------------- |
| `Health.queryQuantitySamples()`    | Returns empty array `[]` | No               |
| `Health.queryCategorySamples()`    | Returns empty array `[]` | No               |
| `Health.dateOfBirth()`             | No result                | Yes              |
| `Health.bloodType()` (and similar) | No result                | Yes              |

---

## Code Examples

### Example 1: Querying samples (returns empty array when unauthorized)

```ts
const steps = await Health.queryQuantitySamples('stepCount')

if (steps.length === 0) {
  console.log("No step data returned. This may be due to lack of permission or no recorded data.")
}
```

### Example 2: Reading profile information (rejects if unauthorized)

```ts
try {
  const dob = await Health.dateOfBirth()
  console.log(`Date of birth: ${dob.year}-${dob.month}-${dob.day}`)
} catch (err) {
  console.warn("Failed to read date of birth. The user may not have granted permission.")
}
```

---

## Permission Merging on Multiple Calls

If you call multiple permission-requiring methods simultaneously using `Promise.all`, Scripting will automatically merge the required permissions into a **single system dialog** request. This improves user experience by avoiding repeated prompts.

```ts
try {
  const [dob, blood] = await Promise.all([
    Health.dateOfBirth(),
    Health.bloodType()
  ])
  console.log(dob, blood)
} catch (err) {
  console.warn("User may have denied one or more requested permissions.")
}
```

---

## Best Practices and UI Recommendations

| Situation                         | Recommended Handling                                       |
| --------------------------------- | ---------------------------------------------------------- |
| First-time access to Health data  | Inform the user what data will be accessed and why         |
| Empty data returned               | Check for empty array or null and show a helpful message   |
| Rejected Promise from profile API | Use `try...catch` and offer a recovery path                |
| Confused users with missing data  | Provide clear instructions for checking Health permissions |

---

## Manual Authorization

Go to **Health app > Data Access & Devices > Scripting**, and make sure the necessary data types are enabled.
