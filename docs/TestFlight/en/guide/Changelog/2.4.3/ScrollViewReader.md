---
title: ScrollViewReader
description: Allowing scripts to programmatically control scrolling position within scrollable content such as List or ScrollView.
---

The **ScrollViewReader** component equivalent to SwiftUI’s ScrollViewReader, allowing scripts to programmatically control scrolling position within scrollable content such as `List` or `ScrollView`.

---

## ScrollViewProxy

`ScrollViewProxy` represents the programmatic interface for controlling scrolling. It is provided by `ScrollViewReader` during rendering.

```ts
interface ScrollViewProxy {
  scrollTo: (id: string | number, anchor?: KeywordPoint | Point) => void;
}
```

## Methods

### scrollTo(id, anchor?)

Scrolls the closest scrollable container until the element with the specified `key` becomes visible.

#### Parameters

| Parameter | Type           | Required | Description |
| --------- | -------------- | -------- | ----------- | -------------------------------------------------------------------------------------------------------- |
| id        | `string`       | `number` | Yes         | The `key` of the target element. Must match the `key` assigned to a child inside the scrollable content. |
| anchor    | `KeywordPoint` | `Point`  | No          | Controls how the target is aligned within the visible area. Optional.                                    |

### KeywordPoint

Predefined scroll alignment keywords:

- `'top'`
- `'center'`
- `'bottom'`

### Point

Precise alignment coordinates:

```ts
type Point = {
  x: number;
  y: number;
};
```

---

## ScrollViewReader Component

```ts
type ScrollViewReaderProps = {
  children: (scrollViewProxy: ScrollViewProxy) => VirtualNode;
};
declare const ScrollViewReader: FunctionComponent<ScrollViewReaderProps>;
```

## Props

| Name     | Type                                      | Required | Description                                                                  |
| -------- | ----------------------------------------- | -------- | ---------------------------------------------------------------------------- |
| children | `(proxy: ScrollViewProxy) => VirtualNode` | Yes      | A function that receives a `ScrollViewProxy` and returns scrollable content. |

---

## Behavior and Usage Notes

1. ScrollViewReader must wrap a `List`, `ScrollView`, or another scrollable container.
2. The `proxy` is created once during rendering. Use `useRef` if you need to store it.
3. `scrollTo` works only with elements that have a **unique `key`**.
4. Using `withAnimation` enables smooth scrolling.
5. The API follows React’s identity model, but scroll behavior matches SwiftUI.

---

## Example Usage

```tsx
import {
  Button,
  Navigation,
  NavigationStack,
  Script,
  Text,
  List,
  ScrollViewReader,
  ScrollView,
  VStack,
  useRef,
  ScrollViewProxy,
} from "scripting";

function Item({ index }: { index: number }) {
  return <Text>Item - {index}</Text>;
}

function View() {
  const dismiss = Navigation.useDismiss();
  const proxyRef = useRef<ScrollViewProxy>();

  return (
    <NavigationStack>
      <VStack navigationTitle="ScrollViewReader">
        <ScrollViewReader>
          {(proxy) => {
            // Store the proxy instance
            proxyRef.current = proxy;

            return (
              <List>
                {new Array(100).fill(0).map((_, index) => (
                  <Item key={index} index={index} />
                ))}
                <Text key="bottom">Bottom</Text>
              </List>
            );
          }}
        </ScrollViewReader>

        <Button
          title="Jump"
          action={() => {
            if (proxyRef.current == null) {
              console.log("no proxy found");
              return;
            }

            const index = (Math.random() * 100) | 0;

            withAnimation(() => {
              proxyRef.current?.scrollTo(index);

              // Scroll to the element identified by key="bottom"
              // proxyRef.current?.scrollTo("bottom", "bottom")
            });
          }}
        />
      </VStack>
    </NavigationStack>
  );
}

async function run() {
  await Navigation.present({
    element: <View />,
  });
  Script.exit();
}

run();
```

---

## How `key` Works in Scripting

Scripting does not support `.id()` as in SwiftUI.
Instead:

```tsx
<Text key="bottom">Bottom</Text>
```

- `key` identifies the element within the virtual node tree
- `scrollTo("bottom")` will scroll to this element
- `key` must be stable and unique, similar to React and SwiftUI’s `.id()`

---

## Animation Support

Scroll operations can be wrapped in `withAnimation` to enable smooth transitions:

```tsx
withAnimation(() => {
  proxy.scrollTo("targetKey", "center");
});
```

The animation behavior follows SwiftUI’s animation engine.

---

## Important Notes

1. Every scroll target must have a unique `key`.
2. `scrollTo` will not work without a matching `key`.
3. The scrollable content must be inside the same ScrollViewReader.
4. The alignment anchor is optional but useful for precise positioning.
5. The API mirrors SwiftUI’s ScrollViewReader logic but adopts React-style identity handling.
