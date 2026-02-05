The `LiveActivity` API enables you to display real-time, dynamic information from your script on the Lock Screen and, where supported, in the Dynamic Island on iOS devices. It provides a structured interface to start, update, and end Live Activities, and observe their state throughout their lifecycle.

This document provides a complete guide to using the **LiveActivity API** in the Scripting app, including:

- Core concepts and lifecycle
- How to register a Live Activity UI
- How to start, update, and end Live Activities
- UI layout for Dynamic Island and Lock Screen
- Full TypeScript/TSX examples
- Detailed descriptions of every type and option

The API wraps Apple’s ActivityKit and brings it into the Scripting environment with a React-style UI building approach.

***

# 1. Understanding Live Activities

A Live Activity can appear in the following regions:

- Lock Screen
- Dynamic Island (iPhone 14 Pro and later)
- Banner-style presentation on devices without Dynamic Island

Live Activities are used for time-based and progress-based information, such as:

- Timers
- Fitness progress
- Delivery tracking
- Countdowns and reminders
- Real-time status updates

In Scripting, each Live Activity consists of:

1. **contentState** (a JSON-serializable object that updates over time)
2. **UI Builder** (a function that produces TSX UI for each state)

***

# 2. Live Activity State Types

```ts
type LiveActivityState = "active" | "dismissed" | "ended" | "stale";
```

| State     | Description                                                                                 |
| --------- | ------------------------------------------------------------------------------------------- |
| active    | The Live Activity is visible and can receive content updates.                               |
| stale     | The Live Activity is out of date. The system expects an update.                             |
| ended     | The Live Activity ended but may remain visible for up to four hours or a user-defined time. |
| dismissed | The Live Activity is no longer visible.                                                     |

***

# 3. LiveActivityDetail Type

```ts
type LiveActivityDetail = {
  id: string;
  state: LiveActivityState;
};
```

Represents a summary of each active Live Activity.

***

# 4. Live Activity UI Types

## 4.1 LiveActivityUIProps

```ts
type LiveActivityUIProps = {
  content: VirtualNode;
  compactLeading: VirtualNode;
  compactTrailing: VirtualNode;
  minimal: VirtualNode;
  children: VirtualNode | VirtualNode[];
};
```

These regions correspond to ActivityKit’s UI areas:

| Property        | Region                                                |
| --------------- | ----------------------------------------------------- |
| content         | Lock Screen and non–Dynamic Island devices            |
| compactLeading  | Leading area of compact Dynamic Island                |
| compactTrailing | Trailing area of compact Dynamic Island               |
| minimal         | The smallest pill-style display                       |
| children        | The expanded Dynamic Island layout (multiple regions) |

***

# 5. Registering a Live Activity UI

Live Activities **must** be registered inside a standalone file such as `live_activity.tsx`.

```tsx
import { LiveActivity, LiveActivityUI, LiveActivityUIBuilder } from "scripting";

export type State = {
  mins: number;
};

function ContentView(state: State) {
  return (
    <HStack activityBackgroundTint={{ light: "clear", dark: "clear" }}>
      <Image systemName="waterbottle" foregroundStyle="systemBlue" />
      <Text>{state.mins} minutes left until the next drink</Text>
    </HStack>
  );
}

const builder: LiveActivityUIBuilder<State> = (state) => {
  return (
    <LiveActivityUI
      content={<ContentView {...state} />}
      compactLeading={
        <HStack>
          <Image systemName="clock" />
          <Text>{state.mins}m</Text>
        </HStack>
      }
      compactTrailing={<Image systemName="waterbottle" foregroundStyle="systemBlue" />}
      minimal={<Image systemName="clock" />}>
      <LiveActivityUIExpandedCenter>
        <ContentView {...state} />
      </LiveActivityUIExpandedCenter>
    </LiveActivityUI>
  );
};

export const MyLiveActivity = LiveActivity.register("MyLiveActivity", builder);
```

***

# 6. Using a Live Activity in Your Script

```tsx
import {
  Button,
  Text,
  VStack,
  Navigation,
  NavigationStack,
  useMemo,
  useState,
  LiveActivityState,
  BackgroundKeeper,
} from "scripting";

import { MyLiveActivity } from "./live_activity";

function Example() {
  const dismiss = Navigation.useDismiss();
  const [state, setState] = useState<LiveActivityState>();

  const activity = useMemo(() => {
    const instance = MyLiveActivity();

    instance.addUpdateListener((s) => {
      setState(s);
      if (s === "dismissed") {
        BackgroundKeeper.stop();
      }
    });

    return instance;
  }, []);

  return (
    <NavigationStack>
      <VStack
        navigationTitle="Live Activity Example"
        navigationBarTitleDisplayMode="inline"
        toolbar={{
          cancellationAction: <Button title="Done" action={dismiss} />,
        }}>
        <Text>Activity State: {state ?? "-"}</Text>

        <Button
          title="Start Live Activity"
          disabled={state != null}
          action={() => {
            let count = 5;
            BackgroundKeeper.keepAlive();

            activity.start({ mins: count });

            function tick() {
              setTimeout(() => {
                count -= 1;
                if (count === 0) {
                  activity.end({ mins: 0 });
                  BackgroundKeeper.stop();
                } else {
                  activity.update({ mins: count });
                  tick();
                }
              }, 60000);
            }

            tick();
          }}
        />
      </VStack>
    </NavigationStack>
  );
}

async function run() {
  await Navigation.present(<Example />);
  Script.exit();
}

run();
```

***

# 7. LiveActivity Class API Reference

## 7.1 start(contentState, options?)

```ts
start(contentState: T, options?: LiveActivityOptions): Promise<boolean>
```

Starts a Live Activity.

### LiveActivityOptions

```ts
type LiveActivityOptions = {
  staleDate?: number | Date;
  relevanceScore?: number;
};
```

- **staleDate**: Timestamp(ms) or Date object at which the activity becomes stale
- **relevanceScore**: Determines which Live Activity is prioritized in the Dynamic Island

***

## 7.2 update(contentState, options?)

```ts
update(contentState: T, options?: LiveActivityUpdateOptions)
```

### LiveActivityUpdateOptions

```ts
type LiveActivityUpdateOptions = {
  staleDate?: number | Date;
  relevanceScore?: number;
  alert?: {
    title: string;
    body: string;
  };
};
```

Alerts appear on Apple Watch when sending an update.

***

## 7.3 end(contentState, options?)

```ts
end(contentState: T, options?: LiveActivityEndOptions)
```

### LiveActivityEndOptions

```ts
type LiveActivityEndOptions = {
  staleDate?: number ｜ Date
  relevanceScore?: number
  dismissTimeInterval?: number
}
```

Rules for dismissal (seconds):

- Not provided: default system retention (up to 4 hours)
- \<= 0: remove immediately
- \> 0: remove after the specified interval

***

## 7.4 Reading Activity State

```ts
getActivityState(): Promise<LiveActivityState | null>
```

***

## 7.5 Listening for State Changes

```ts
addUpdateListener(listener);
removeUpdateListener(listener);
```

Triggered when the Live Activity transitions between:

- active → stale
- active → ended
- ended → dismissed

***

## 7.6 Static Methods

```ts
static areActivitiesEnabled(): Promise<boolean>
static getAllActivities(): Promise<LiveActivityDetail[]>
static getAllActivitiesIds(): Promise<string[]>
static getActivityState(activityId: string)
static from(activityId, name)
static endAllActivities(options?)
```

***

# 8. UI Components for Expanded Layout

| Component                      | Description                       |
| ------------------------------ | --------------------------------- |
| LiveActivityUI                 | Root layout container             |
| LiveActivityUIExpandedLeading  | Leading region of expanded layout |
| LiveActivityUIExpandedTrailing | Trailing region                   |
| LiveActivityUIExpandedCenter   | Center region                     |
| LiveActivityUIExpandedBottom   | Bottom region                     |

These components help structure the expanded Dynamic Island.

***

# 9. Best Practices

## 9.1 contentState must be JSON-serializable

The following are not allowed:

- Functions
- Date objects (must use timestamps)
- Class instances
- Non-serializable structures

## 9.2 Live Activity registration must be in a standalone file

This is required due to UI compilation and ActivityKit rules.

## 9.3 Live Activities survive script termination

If your script needs to keep running (e.g., timers), use:

```ts
BackgroundKeeper.keepAlive();
```

***

# 10. Minimal Example

```ts
const activity = MyLiveActivity();

await activity.start({ mins: 10 });

await activity.update({ mins: 5 });

await activity.end({ mins: 0 }, { dismissTimeInterval: 0 });
```

# 11. Notes

- Live Activity starts asynchronously. You need to wait for `start` to return `true` before calling `update` and `end`.
- Live Activity cannot access documents and iCloud directories. If you want to access files or render images, you must save them to `FileManager.appGroupDocumentsDirectory`. For example, to render an image, you save it to `FileManager.appGroupDocumentsDirectory`, then use `<Image filePath={Path.join(FileManager.appGroupDocumentsDirectory, 'example.png')} />` to render it.
- Live Activity can access the Storage data shared with the app.
