**ScrollViewReader** 组件，用于在脚本中获得对可滚动内容的编程化控制能力，使开发者能够在运行时滚动至任意视图位置，包括列表项、文本节点等。

ScrollViewReader 与 SwiftUI 的行为保持一致：
开发者通过一个回调函数获得一个 `ScrollViewProxy` 实例，并可以在任意时机调用 `scrollTo(id)` 控制滚动视图的位置。

***

# ScrollViewProxy

`ScrollViewProxy` 是提供滚动控制的代理对象，由 `ScrollViewReader` 在渲染期间自动注入。

```ts
interface ScrollViewProxy {
    scrollTo: (id: string | number, anchor?: KeywordPoint | Point) => void;
}
```

## 方法

### scrollTo(id, anchor?)

滚动到某个具有指定 `id` 的元素。
该 `id` 必须在可滚动内容内存在，并通过 `key` 配置。

#### 参数说明

| 参数     | 类型             | 必须       | 说明 |                                         |
| ------ | -------------- | -------- | -- | --------------------------------------- |
| id     | `string`       | `number` | 是  | 要滚动到的目标元素的唯一标识符。通常对应 `<View key="xxx">` |
| anchor | `KeywordPoint` | `Point`  | 否  | 滚动目标在可视区域中的对齐方式。可为字符串关键字或坐标点。           |

### KeywordPoint 类型

属于字符串关键字，常用：

- `'top'`
- `'center'`
- `'bottom'`

### Point 类型

用于精确控制滚动位置：

```ts
type Point = {
  x: number
  y: number
}
```

***

# ScrollViewReader

ScrollViewReader 用于包裹可滚动内容，并提供一个 `scrollViewProxy` 以控制内部滚动。

```ts
type ScrollViewReaderProps = {
    children: (scrollViewProxy: ScrollViewProxy) => VirtualNode
};
declare const ScrollViewReader: FunctionComponent<ScrollViewReaderProps>
```

## Props 说明

| 名称       | 类型                                        | 必须 | 说明                                          |
| -------- | ----------------------------------------- | -- | ------------------------------------------- |
| children | `(proxy: ScrollViewProxy) => VirtualNode` | 是  | 回调函数，将滚动代理传给开发者，并返回 ScrollView、List 等可滚动视图。 |

***

# 使用说明

1. **ScrollViewReader 必须包裹 List、ScrollView 等可滚动组件**。
2. **回调中的 proxy 只在视图构建阶段提供一次**，开发者可利用 `useRef` 保存。
3. 支持在动画中使用，例如 `withAnimation`。
4. 锚点可选，不传则使用默认对齐方式。
5. 所有 ScrollView 内部节点都可以使用 `key` 来作为 `scrollTo` 的目标。

***

# 基础示例

下面是一个完整的使用示例，包括滚动到指定元素以及使用动画的方式。

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
  withAnimation
} from "scripting"

function Item({ index }: { index: number }) {
  return <Text>
    Item - {index}
  </Text>
}

function View() {
  const dismiss = Navigation.useDismiss()
  const proxyRef = useRef<ScrollViewProxy>()

  return <NavigationStack>
    <VStack navigationTitle="ScrollViewReader">

      <ScrollViewReader>
        {(proxy) => {
          // 记录 proxy 实例，供按钮点击时使用
          proxyRef.current = proxy

          return <List>
            {new Array(100).fill(0).map((_, index) =>
              <Item
                key={index}
                index={index}
              />
            )}
            <Text key="bottom">
              Bottom
            </Text>
          </List>
        }}
      </ScrollViewReader>

      <Button
        title="跳转"
        action={() => {
          if (proxyRef.current == null) {
            console.log("no proxy found")
            return
          }

          const index = Math.random() * 100 | 0

          withAnimation(() => {
            proxyRef.current?.scrollTo(index, "bottom")
            // proxyRef.current?.scrollTo("bottom", "bottom")
          })
        }}
      />

    </VStack>
  </NavigationStack>
}

async function run() {
  await Navigation.present(<View />)
  Script.exit()
}

run()
```

***

# 关于 ID（key）匹配的说明

`scrollTo(id)` 依赖于内部节点的 `key` 属性。
以下配置都可作为滚动目标：

```tsx
<Text key="bottom">Bottom</Text>
```

`key` 与 SwiftUI 的 `.id()` 行为保持一致。

***

# 动画支持

ScrollViewReader 支持结合 `withAnimation` 来进行平滑滚动。例如：

```tsx
withAnimation(() => {
  proxy.scrollTo("target", "center")
})
```

在动画块中触发滚动，将获得平滑过渡。

***

# 注意事项

1. **必须在 ScrollViewReader 回调中记录 proxy**，否则外部无法访问。
2. **必须确保目标元素存在并有唯一 id**，否则无法滚到目标位置。
3. **不支持在 ScrollViewReader 外部渲染可滚动组件**。
4. **滚动行为与 SwiftUI 基本一致**，包括 anchor 对齐方式。
