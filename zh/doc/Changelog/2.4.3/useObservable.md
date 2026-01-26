# useObservable

Scripting 提供一套响应式状态系统，由 `Observable<T>` 与 `useObservable<T>` 组成，用于驱动组件渲染、与动画系统协同工作，并与 SwiftUI 的双向绑定能力保持一致（例如 `List(selection:)`、`NavigationStack(path:)` 等未来扩展接口）。

***

# 1. Observable\<T>

`Observable<T>` 是一个可观察的数据容器，当 `.value` 更新时，会触发依赖该值的 UI 自动重新渲染。

## 1.1 类定义

```ts
class Observable<T> {
  constructor(initialValue: T);
  value: T;
  setValue(value: T): void;
  subscribe(callback: (value: T, oldValue: T) => void): void;
  unsubscribe(callback: (value: T, oldValue: T) => void): void;
  dispose(): void;
}
```

***

## 1.2 属性与方法说明

### value

存储当前值。读取 `.value` 不会产生副作用。

### setValue(newValue)

更新值，并触发 UI 重绘：

```ts
observable.setValue(newValue);
```

支持任何类型 `T`（包括对象、数组、字面量、类实例等）。

### subscribe / unsubscribe

用于在组件体系外手动监听值变化。

### dispose

释放监听器和内部资源。
一般无需手动调用，仅在高级场景使用。

***

# 2. useObservable\<T>

`useObservable<T>` 是在组件内部创建本地状态的 Hook。
返回值为 `Observable<T>`，用于驱动 UI 更新。

## 2.1 函数签名

```ts
declare function useObservable<T>(): Observable<T | undefined>;
declare function useObservable<T>(value: T): Observable<T>;
declare function useObservable<T>(initializer: () => T): Observable<T>;
```

***

## 2.2 初始化方式

### 1. 无初始值（value 为 undefined）

```tsx
const data = useObservable<string>();
```

### 2. 直接提供初始值

```tsx
const count = useObservable(0);
```

### 3. 惰性初始化（初次渲染时执行）

```tsx
const user = useObservable(() => createDefaultUser());
```

***

# 3. 在 UI 中使用 Observable

在组件中，只需读取 `.value`：

```tsx
<Text>{name.value}</Text>
```

当 `.setValue` 被调用，组件会自动重新渲染：

```tsx
<Button title="Tap" action={() => name.setValue("Updated")} />
```

无需手动触发更新，行为与 React useState 类似，但带来更 SwiftUI 式的数据绑定体验。

***

# 4. 与动画协同工作

Observable 是动画触发源。
支持以下场景：

## 4.1 显式动画：withAnimation

```tsx
withAnimation(() => {
  size.setValue(size.value + 20);
});
```

任何依赖 `size.value` 的视图都会执行动画。

***

## 4.2 隐式动画：animation 修饰符

视图可通过 animation 属性监听某个值的变化并执行动画。

### 正确写法：

```tsx
animation={{
  animation: Animation.spring({ duration: 0.3 }),
  value: size.value
}}
```

示例：

```tsx
<Rectangle
  frame={{
    width: size.value,
    height: size.value,
  }}
  animation={{
    animation: Animation.easeIn(0.25),
    value: size.value,
  }}
/>
```

***

# 5. 与 SwiftUI Binding 风格的 API 对接（扩展能力）

Observable 将作为未来 Scripting 的标准双向绑定机制，用于支持 SwiftUI 风格的 API，例如：

### 5.1 List(selection:)

```tsx
const selection = useObservable<string | undefined>(undefined)

<List selection={selection}>
  ...
</List>
```

### 5.2 NavigationStack(path:)

```tsx
const path = useObservable<string[]>([])

<NavigationStack path={path}>
  ...
</NavigationStack>
```

这类 API 使用方式与 SwiftUI 一致，开发者无需学习额外的绑定机制。

***

# 6. ForEach：推荐使用 Observable 数据源

为了获得更接近 SwiftUI 的体验，推荐使用：

```tsx
<ForEach data={observableArray} builder={(item, index) => <Text>{item.name}</Text>} />
```

其中：

```ts
T extends { id: string }
```

为什么推荐这种写法：

- 性能更佳
- 插入与删除动画体验更自然

示例：

```tsx
const items = useObservable([
  { id: "1", name: "Apple" },
  { id: "2", name: "Banana" }
])

<ForEach
  data={items}
  editActions="all"
  builder={(item) => <Text>{item.name}</Text>}
/>
```

***

# 7. 综合示例

```tsx
export function Demo() {
  const visible = useObservable(true);
  const size = useObservable(100);

  return (
    <VStack spacing={20}>
      {visible.value && (
        <Rectangle
          frame={{
            width: size.value,
            height: size.value,
          }}
          background="blue"
          animation={{
            animation: Animation.spring({ duration: 0.4, bounce: 0.3 }),
            value: size.value,
          }}
          transition={Transition.opacity()}
        />
      )}

      <Button
        title="Toggle Visible"
        action={() => {
          withAnimation(() => {
            visible.setValue(!visible.value);
          });
        }}
      />

      <Button
        title="Resize"
        action={() => {
          withAnimation(Animation.easeOut(0.25), () => {
            size.setValue(size.value === 100 ? 160 : 100);
          });
        }}
      />
    </VStack>
  );
}
```

***

# 8. 总结

- `Observable<T>` 是 Scripting 中的核心响应式数据结构
- `useObservable` 在组件内创建状态，支持任意类型 T
- 与 UI 自动联动，无需额外刷新逻辑
- 为动画系统提供依赖值，用于属性动画与显式动画
- 为未来的 SwiftUI 风格 API 提供双向绑定能力
- ForEach 推荐使用 `data: Observable<Array<T>>`，获得一致的 SwiftUI 体验
