---
title: V2.4.1
published_at: 2025-10-10 08:00:00
---

## 2.4.1

# New Features

Knowledge Base
You can now import multiple files at once by selecting a directory.

Assistant Tool
Introduced a built-in query knowledge bases tool, enabling the Assistant to search associated knowledge bases when completing tasks.

ControlWidget (iOS 18+)
Added ControlWidget, allowing you to place Button and Toggle controls in Control Center and assign scripts to handle their logic.

Custom Keyboard
Added the CustomKeyboard API to create and present your own keyboard UI, handle input events, and insert text programmatically.

Bluetooth APIs
Introduced BluetoothCentralManager and BluetoothPeripheralManager APIs. Build end-to-end Bluetooth experiences, including scanning, connecting, reading/writing GATT characteristics, subscribing to notifications, advertising, and exposing custom services/characteristics.

Added layoutPriority View Modifier
Introduced support for the layoutPriority view modifier, allowing developers to control how space is distributed among sibling views when layout constraints are tight. This behavior is consistent with SwiftUI’s native layoutPriority(\_:).

Introduced modifiers Property and ViewModifiers System
A new modifiers property, along with the ViewModifiers class and the modifiers() helper function, has been added to enable fluent, chainable application of view modifiers.
This system supports applying the same type of view modifier multiple times (e.g., repeated padding() or background() calls) and ensures modifiers are applied in the exact order they are chained, closely mirroring the behavior of SwiftUI.

SVG Rendering
Added a new SVG rendering component to display vector graphics seamlessly.

Custom Fonts
Now supports using fonts installed via the system or third-party apps.

# Improvements

Request API
Added an allowInsecureRequest field to RequestInit / Request for controlling whether insecure requests are permitted.

Location API
Location.requestCurrent now returns cached location data by default if available.
Added a new optional parameter options.forceRequest to always fetch the latest location.

Developer Server
The dev server now remembers and records the last connected address for faster reconnections.

Storage Enhancements
set, get, contains, remove, setData, and getData now accept an optional options.shared parameter for working with shared storage, which is accessible across all scripts for easier cross-script functionality.

Fixes
Assistant Tool Calls
Fixed an issue where the Assistant could misparse tool parameters when invoking tools, improving reliability of tool execution.

Photos API
Fixed an issue where dismissing the Photos.pickPhotos sheet by swiping down would not resolve the promise.

HealthKit Permissions
Fixed an issue where requesting Health permissions did not trigger the authorization dialog.

Script Advanced Settings
Fixed an error when renaming a script in the Advanced Settings page, which could cause a refresh failure after saving.

# Changes

API Providers
Removed the Pollinations.AI API provider.
