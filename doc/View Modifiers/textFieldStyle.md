# textFieldStyle

The `textFieldStyle` property determines the visual style of your text fields, influencing how their borders, backgrounds, and layout appear. Different styles can help your text fields blend seamlessly into various UI designs, or provide subtle cues about their functionality.

## Overview

A `TextField` provides a way for users to enter text. By selecting a `textFieldStyle`, you can define whether your text fields have a plain, borderless appearance, or a more pronounced, rounded border that sets them apart from surrounding elements.

## Available Styles

- **`automatic`**:\
  Allows the system to choose an appropriate style based on the platform and context. This is a convenient default if you don’t have a strong styling preference.

- **`plain`**:\
  Displays the text field with minimal adornment. This style often looks like plain text, making it suitable for layouts where you want the field to appear unobtrusive.

- **`roundedBorder`**:\
  Surrounds the text field with a rounded rectangle border. This helps make the input area stand out, making it more obvious to users that they can type into it. Ideal for forms or places where user input is a primary action.

## Basic Usage

Below is an example showing how you might use a `TextField` with a specific style:

```tsx
<TextField
  title="Username"
  value={username}
  onChanged={newVal => setUsername(newVal)}
  textFieldStyle="roundedBorder"
  prompt="Enter your username"
/>
```

In this example, the `textFieldStyle="roundedBorder"` will visually highlight the input field, giving users a clear indication that they can tap and start typing.

## Other Useful Properties

- **`value: string`**:\
  The current text content of the field. Update this when the user types to keep the displayed text in sync.

- **`onChanged: (value: string) => void`**:\
  A callback invoked whenever the text in the field changes, allowing you to respond to user input.

- **`prompt?: string`**:\
  A hint or placeholder text guiding the user about what to type.

- **`axis?: Axis`**:\
  Determines how text can scroll if it doesn’t fit. This is useful if you expect long input that might exceed the available space.

- **`autofocus?: boolean` (default: false)**:\
  If true, focuses the text field automatically when it appears, making it ready for immediate typing.

- **`onFocus?: () => void` and `onBlur?: () => void`**:\
  Callbacks triggered when the text field gains or loses focus, respectively. This can help you provide visual feedback, run validation, or update other parts of your UI.

## Example

```tsx
<TextField
  label={<Text style={{fontWeight: 'bold'}}>Email:</Text>}
  value={email}
  onChanged={setEmail}
  prompt="you@example.com"
  textFieldStyle="plain"
  autofocus={true}
  onFocus={() => console.log('Focused')}
  onBlur={() => console.log('Lost focus')}
/>
```

In this example, the text field is styled as `plain`, appearing more integrated into the surrounding content. The `autofocus` property ensures that the user can start typing immediately upon arrival at this view.

## Summary

`textFieldStyle` lets you adapt the appearance of your input fields to different contexts. Whether you opt for the subtlety of `plain` or the more structured look of `roundedBorder`, choosing the right style helps create a clear and intuitive user experience. If unsure, use `automatic` to let the system decide the most appropriate look.
