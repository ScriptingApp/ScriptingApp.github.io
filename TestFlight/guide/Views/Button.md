# Button

The `Button` component in the **Scripting** app allows you to create interactive elements with customizable actions, labels, styles, and roles. Buttons can trigger actions, execute intents, and display various visual styles based on the configuration. This documentation provides a detailed guide on how to use the `Button` API, including its properties, roles, styles, and examples.

***

## `Button`

### Description

You create a button by providing an **action** or an **intent** and a **label**. The label can be a simple text, an icon, or a complex view. Buttons are essential for creating interactive interfaces, such as submitting forms or navigating between pages.

### Properties

| **Property**  | **Type**                                                         | **Description**                                                                                                                                          |
| ------------- | ---------------------------------------------------------------- | -------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `title`       | `string`                                                         | The text label displayed on the button.                                                                                                                  |
| `systemImage` | `string` _(optional)_                                            | The name of a system icon to display alongside the button's title.                                                                                       |
| `children`    | `VirtualNode` or `VirtualNode[]`                                 | Custom view(s) to be used as the button label instead of `title`.                                                                                        |
| `role`        | `'destructive' \| 'cancel' \| 'close' \| 'confirm'` _(optional)_ | Describes the purpose of the button. `destructive` highlights the button as performing a potentially dangerous action, while `cancel` implies dismissal. |
| `intent`      | `AppIntent<any>`                                                 | An intent to execute when the button is triggered. Available for `Widget` or `LiveActivity`. See the `Interactive Widget and LiveActivity`.              |
| `action`      | `() => void`                                                     | A function to execute when the user triggers the button.                                                                                                 |

***

### `ButtonStyle`

Defines the visual appearance of the button.

| **Value**           | **Description**                                                                                             |
| ------------------- | ----------------------------------------------------------------------------------------------------------- |
| `automatic`         | The default style based on the button's context.                                                            |
| `bordered`          | A standard bordered style.                                                                                  |
| `borderedProminent` | A prominent bordered style that stands out.                                                                 |
| `borderless`        | A style without any border.                                                                                 |
| `plain`             | A plain style with minimal decoration, though it may indicate pressed, focused, or enabled states visually. |

***

### `ButtonBorderShape`

Specifies the shape of the button's border when using `bordered` or `borderedProminent` styles.

| **Value**                            | **Description**                                                   |
| ------------------------------------ | ----------------------------------------------------------------- |
| `automatic`                          | Defers to the system to determine the appropriate shape.          |
| `capsule`                            | A capsule-shaped border.                                          |
| `circle`                             | A circular border.                                                |
| `roundedRectangle`                   | A rectangle with rounded corners.                                 |
| `buttonBorder`                       | Defers to the environment to determine the resolved border shape. |
| `{ roundedRectangleRadius: number }` | A rounded rectangle with a specific corner radius.                |

***

### `ControlSize`

Defines the size of the button and other controls.

| **Value**    | **Description**                                                                  |
| ------------ | -------------------------------------------------------------------------------- |
| `mini`       | The smallest control size.                                                       |
| `small`      | A compact control size.                                                          |
| `regular`    | The standard control size.                                                       |
| `large`      | A large control size.                                                            |
| `extraLarge` | The largest control size, typically for high emphasis or accessibility purposes. |

***

### `CommonViewProps`

These properties can be applied to customize the appearance and behavior of buttons within a view.

| **Property**        | **Type**            | **Description**                                                                         |
| ------------------- | ------------------- | --------------------------------------------------------------------------------------- |
| `controlSize`       | `ControlSize`       | Sets the size for controls within this view.                                            |
| `buttonStyle`       | `ButtonStyle`       | Applies custom interaction behavior and appearance to buttons.                          |
| `buttonBorderShape` | `ButtonBorderShape` | Specifies the shape of the border for `bordered` and `borderedProminent` button styles. |

***

## Example Usage

### Basic Button with Action

```tsx
<Button title="Sign in" action={handleSignIn} />
```

### Button with System Image

```tsx
<Button title="Delete" systemImage="trash" role="destructive" action={handleDelete} />
```

### Button with Custom Label

```tsx
<Button>
  <Text>Custom Label</Text>
</Button>
```

### Button Executing an AppIntent

```tsx
<Button
  title="Start Workout"
  intent={MyStartWorkoutIntent({ duration: 30 })}
  buttonStyle="borderedProminent"
/>
```

### Styling Buttons

```tsx
<Group
  buttonStyle="bordered"
  buttonBorderShape={{ roundedRectangleRadius: 8 }}
  controlSize="large"
>
  <Button title="Save" action={handleSave} />
</Group>
```

***

### Notes

- Use `role` to indicate buttons with specific purposes, such as canceling or destructive actions.
- Combine `buttonStyle` and `buttonBorderShape` for consistent theming across views.
- The `intent` property integrates buttons with `Widget` and `LiveActivity` for seamless interactions.

For further details on `AppIntent`, refer to the `Interactive Widget and LiveActivity` documentation.
