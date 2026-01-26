# 触觉反馈

```tsx
import { Button, List, Navigation, NavigationStack, Script, } from "scripting"

function Example() {

  return <NavigationStack>
    <List
      navigationTitle={"HapticFeedback"}
    >
      <Button
        title={"HapticFeedback.vibrate"}
        action={() => {
          HapticFeedback.vibrate()
        }}
      />

      <Button
        title={"HapticFeedback.lightImpact"}
        action={() => {
          HapticFeedback.lightImpact()
        }}
      />

      <Button
        title={"HapticFeedback.mediumImpact"}
        action={() => {
          HapticFeedback.mediumImpact()
        }}
      />

      <Button
        title={"HapticFeedback.heavyImpact"}
        action={() => {
          HapticFeedback.heavyImpact()
        }}
      />

      <Button
        title={"HapticFeedback.softImpact"}
        action={() => {
          HapticFeedback.softImpact()
        }}
      />

      <Button
        title={"HapticFeedback.rigidImpact"}
        action={() => {
          HapticFeedback.rigidImpact()
        }}
      />

      <Button
        title={"HapticFeedback.selection"}
        action={() => {
          HapticFeedback.selection()
        }}
      />

      <Button
        title={"HapticFeedback.notificationSuccess"}
        action={() => {
          HapticFeedback.notificationSuccess()
        }}
      />

      <Button
        title={"HapticFeedback.notificationError"}
        action={() => {
          HapticFeedback.notificationError()
        }}
      />

      <Button
        title={"HapticFeedback.notificationWarning"}
        action={() => {
          HapticFeedback.notificationWarning()
        }}
      />
    </List>
  </NavigationStack>
}

async function run() {
  await Navigation.present({
    element: <Example />
  })

  Script.exit()
}

run()
```
