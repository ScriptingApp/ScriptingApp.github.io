# Control Widget PRO

## 描述

The `ControlWidget` API enables users to add custom Button or Toggle controls to the iOS Control Center or Lock Screen. Each control is linked to an `AppIntent` to execute custom script logic. The controls support privacy protection, dynamic state labels, and SFSymbols icons.

***

## Control Label Type

### `ControlWidgetLabel`

Represents a label for a control, including the main label or value label in active/inactive state.

| Property           | Type       | Description                                                       |
| ------------------ | ---------- | ----------------------------------------------------------------- |
| `title`            | `string`   | The main title of the label.                                      |
| `systemImage`      | `string?`  | Optional SFSymbol image name for the label.                       |
| `privacySensitive` | `boolean?` | If `true`, the label content is hidden when the device is locked. |

***

## 1. `ControlWidgetButton`

Renders a button control that executes a script intent when tapped.

```ts
function ControlWidgetButton(props: ControlWidgetButtonProps): JSX.Element;
```

### `ControlWidgetButtonProps`

| Property             | Type                          | Description                                                                                                              |
| -------------------- | ----------------------------- | ------------------------------------------------------------------------------------------------------------------------ |
| `privacySensitive`   | `boolean?`                    | If `true`, the control's state and content are hidden when the device is locked.                                         |
| `intent`             | `AppIntent<any>`              | The intent to be executed when the button is tapped.                                                                     |
| `label`              | `ControlWidgetLabel`          | The main label shown on the button.                                                                                      |
| `activeValueLabel`   | `ControlWidgetLabel \| null?` | The label shown when the button is active. Must be paired with `inactiveValueLabel`. Overrides `systemImage` in `label`. |
| `inactiveValueLabel` | `ControlWidgetLabel \| null?` | The label shown when the button is inactive. Must be paired with `activeValueLabel`. Overrides `systemImage` in `label`. |

> If either `activeValueLabel` or `inactiveValueLabel` is provided, both should be specified to ensure proper state display.

***

## 2. `ControlWidgetToggle`

Renders a toggle control that updates a boolean value using a script intent.

```ts
function ControlWidgetToggle<T extends { value: boolean }>(
  props: ControlWidgetToggleProps<T>,
): JSX.Element;
```

### `ControlWidgetToggleProps<T>`

| Property             | Type                          | Description                                                                        |
| -------------------- | ----------------------------- | ---------------------------------------------------------------------------------- |
| `privacySensitive`   | `boolean?`                    | If `true`, the control's state and content are hidden when the device is locked.   |
| `intent`             | `AppIntent<T>`                | The intent to execute when toggled. The type `T` must extend `{ value: boolean }`. |
| `label`              | `ControlWidgetLabel`          | The main label for the toggle.                                                     |
| `activeValueLabel`   | `ControlWidgetLabel \| null?` | Label displayed when toggle is ON. Must be paired with `inactiveValueLabel`.       |
| `inactiveValueLabel` | `ControlWidgetLabel \| null?` | Label displayed when toggle is OFF. Must be paired with `activeValueLabel`.        |

***

## 3. `ControlWidget` Namespace

```ts
namespace ControlWidget
```

### `ControlWidget.parameter: string`

A user-defined string parameter set during control configuration. Useful for targeting specific resources (e.g., a device ID or door ID).

***

### `ControlWidget.present(element: VirtualNode): void`

Displays the control UI. Only `ControlWidgetButton` or `ControlWidgetToggle` elements are supported.

#### Usage Notes:

- `control_widget_button.tsx` must only render a `ControlWidgetButton`.
- `control_widget_toggle.tsx` must only render a `ControlWidgetToggle`.
- To hide the entire control content on the Lock Screen, use `privacySensitive` on the root.
- To redact only specific labels or values, apply `privacySensitive` inside `ControlWidgetLabel`.

#### Example:

```tsx
/// app_intents.tsx
export const ToggleDoorIntent = AppIntentManager.register({
  name: "ToggleDoorIntent",
  protocol: AppIntentProtocol.AppIntent,
  perform: async ({ id, value }: { id: string; value: boolean }) => {
    await setDoorState(id, value);
    ControlWidget.reloadToggles();
  },
});

/// control_widget_toggle.tsx
async function run() {
  const doorId = ControlWidget.parameter || "default";
  const data = await fetchDoorData(doorId);

  ControlWidget.present(
    <ControlWidgetToggle
      privacySensitive
      intent={ToggleDoorIntent({ id: doorId, value: !data.doorOpened })}
      label={{
        title: `Door ${doorId}`,
        systemImage: data.doorOpened ? "door.garage.opened" : "door.garage.closed",
      }}
      activeValueLabel={{ title: "The door is opened" }}
      inactiveValueLabel={{ title: "The door is closed" }}
    />,
  );
}

run();
```

***

### `ControlWidget.reloadButtons(): void`

Reloads all control widget buttons. Useful when the intent result changes the UI state.

***

### `ControlWidget.reloadToggles(): void`

Reloads all toggle widgets. Call this after a toggle action to update state.

***

## 4. Development Notes

- Every control must be associated with an `AppIntent` to define its behavior.
- Toggle controls must pass an intent with a parameter shape `{ value: boolean }`.
- If using value labels (`activeValueLabel` / `inactiveValueLabel`), always provide both.
- System images (`systemImage`) should follow [SF Symbols](https://developer.apple.com/sf-symbols/) naming conventions.
- Use `ControlWidget.reloadButtons()` and `reloadToggles()` to force UI updates after state changes in the background.
