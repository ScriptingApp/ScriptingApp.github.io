---
title: ForEach
description: 迭代动态数据
---

`ForEach` 是 Scripting 中用于渲染可变数量子视图的组件，用于构建动态列表、可编辑列表，以及支持系统级的删除与移动行为。其设计参考 SwiftUI 的 `ForEach`，并与 Scripting 的 `Observable` 状态管理系统深度集成。

组件支持两种模式：

1. **旧版模式（已不推荐使用）**：`count + itemBuilder`
2. **推荐的现代模式**：`data: Observable<T[]> + builder`

---

## 1. 类型定义

## ForEachDeprecatedProps（已不推荐）

```ts
type ForEachDeprecatedProps = {
  count: number;
  itemBuilder: (index: number) => VirtualNode;
  onDelete?: (indices: number[]) => void;
  onMove?: (indices: number[], newOffset: number) => void;
};
```

### 参数说明

#### count: number

要渲染的元素数量，`itemBuilder` 将从 0 到 `count - 1` 依次构建每个子视图。

#### itemBuilder(index)

基于索引构建一个 `VirtualNode`。

#### onDelete(indices)

注册删除行为。
当 ForEach 放置在 `List` 中时，如果提供 `onDelete`，将启用系统级的滑动删除交互。
回调触发时，`List` 中对应的行已被移除，你必须在回调中同步删除数据源中的对应项目。

#### onMove(indices, newOffset)

注册移动行为，用于支持编辑状态下的拖动排序。
如希望禁用移动能力，可传入 `null`。

---

## 2. ForEachProps（推荐使用）

```ts
type ForEachProps<T extends { id: string }> =
  | ForEachDeprecatedProps
  | {
      data: Observable<T[]>;
      builder: (item: T, index: number) => VirtualNode;
      editActions?: "delete" | "move" | "all" | null;
    };
```

### 参数说明

#### data: Observable\<T[]\>

一个可观察数组，数组元素必须包含唯一的 `id: string` 字段。

使用 `Observable` 的好处：

- 当数组变动（增删改）时，会自动触发 SwiftUI 刷新
- 可以保留动画
- 更接近 SwiftUI 中 `ForEach($items)` 的使用体验
- 支持与 `List`、`NavigationStack` 等组件无缝联动

#### builder(item, index)

用于基于当前数组的每个元素构建对应的 VirtualNode。

**注意：必须为返回的子节点提供唯一的 key（通常使用 item.id）。**

#### editActions: "delete" | "move" | "all" | null

控制 ForEach 的可编辑能力：

| 值         | 含义                       |
| ---------- | -------------------------- |
| `"delete"` | 仅启用删除                 |
| `"move"`   | 仅启用移动（拖动排序）     |
| `"all"`    | 同时启用删除与移动         |
| `null`     | 不提供任何编辑能力（默认） |

当 `ForEach` 位于 `List` 内部时，编辑能力会自动映射到系统提供的交互方式。

---

## 3. ForEachComponent 接口

```ts
interface ForEachComponent {
  <T extends { id: string }>(props: ForEachProps<T>): VirtualNode;
}
```

`ForEach` 是一个泛型组件，接受带有 `id` 的任意数据类型。

---

## 4. 系统级删除交互示例

当 `ForEach` 放在 `List` 内部，并使用 `data + builder` 模式时，系统会自动启用 swipe-to-delete，只需正确提供 `id` 和编辑能力。

### 示例代码

```tsx
function View() {
  const fruits = useObservable(() =>
    ["Apple", "Bananer", "Papaya", "Mango"].map((name, index) => ({
      id: index.toString(),
      name,
    })),
  );

  return (
    <NavigationStack>
      <List
        navigationTitle="Fruits"
        toolbar={{
          topBarTrailing: <EditButton />,
        }}>
        <ForEach data={fruits} builder={(item, index) => <Text key={item.id}>{item.name}</Text>} />
      </List>
    </NavigationStack>
  );
}
```

---

## 5. 使用建议与最佳实践

### 1. 推荐使用 `data: Observable<T[]>` 方案

新版 API 更接近 SwiftUI 行为，拥有更好的性能与类型推断支持，且未来将接入更多 SwiftUI-style 的能力。

### 2. 每个元素必须拥有 `id: string`

这是确保 Diff 和动画正确工作的基础。

### 3. 必须为 builder 返回的节点提供 `key={item.id}`

否则可能导致:

- 动画不生效
- 列表渲染混乱
- 删除或移动行为出错

### 4. 若需要与编辑按钮联动，必须放置于 `List` 中

并设置 toolbar：

```tsx
toolbar={{
  topBarTrailing: <EditButton />
}}
```
