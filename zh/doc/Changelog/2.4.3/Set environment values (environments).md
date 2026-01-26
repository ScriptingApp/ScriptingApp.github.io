# 设置环境变量 (environments)

`environments` 是 Scripting 新增的视图修饰符，用于向当前视图树（View Hierarchy）注入特定的 environment values。
它的作用与 SwiftUI 的 `.environment()` 类似，但基于 Scripting 的设计进行了显式声明和类型收敛，避免隐式行为。

目前 `environments` 支持以下 environment 值：

- `editMode`: 控制视图的编辑模式（如 List 的编辑状态）
- `openURL`: 自定义打开链接（URL）的处理方式

这些 environment 值会影响其子视图中的行为与交互能力。

***

# 修饰符定义

```ts
environments?: {
  editMode?: Observable<EditMode>;
  openURL?: (url: string) => OpenURLActionResult;
};
```

***

# 一、editMode（编辑模式）

`editMode` 用于设置当前视图树中所有支持编辑模式的组件的编辑状态。

典型用途：

- 控制 `List` 的编辑状态
- 启用批量删除、移动操作
- 与用户交互同步（如切换编辑按钮）

## 类型定义

```ts
class EditMode {
  readonly value: "active" | "inactive" | "transient" | "unknown"
  readonly isEditing: boolean

  static active(): EditMode
  static inactive(): EditMode
  static transient(): EditMode
}
```

### `value` 含义

| 值           | 描述           |
| ----------- | ------------ |
| `active`    | 编辑模式已开启      |
| `inactive`  | 编辑模式已关闭      |
| `transient` | 临时状态（如交互中切换） |
| `unknown`   | 非预期状态，通常不需使用 |

### 与 `Observable` 配合使用

由于 editMode 是动态值，必须使用 `Observable<EditMode>` 传递，以便视图随编辑状态变化而刷新。

***

## editMode 使用示例

```tsx
const editMode = useObservable(() => EditMode.active())

<List
  environments={{
    editMode: editMode
  }}
>
  <ForEach
    editActions="all"
    data={items}
    builder={item => <Text key={item.id}>{item}</Text>}
  />
</List>
```

说明：

- 将 `editMode` 设置到 List 的 environment 中
- List 中的 `ForEach` 会根据该状态启用、禁用删除/移动等编辑能力
- 修改 `editMode.value` 将自动刷新界面

***

# 二、openURL（自定义 URL 打开行为）

`openURL` environment 允许为当前视图树定义一套自定义的 URL 打开逻辑。
这会覆盖如 `<Link>`、`Text(url:)` 等组件的默认行为。

用途示例：

- 控制 URL 在 App 内打开还是系统浏览器打开
- 根据 URL 类型执行不同逻辑
- 拦截 URL 点击并进行验证或跳转处理

## 类型定义

```ts
openURL?: (url: string) => OpenURLActionResult;
```

***

# OpenURLActionResult

自定义 URL 打开逻辑的返回类型。

```ts
class OpenURLActionResult {
  type: string

  static handled(): OpenURLActionResult
  static discarded(): OpenURLActionResult

  static systemAction(options?: {
    url?: string
    prefersInApp: boolean // Requires iOS26.0+
  }): OpenURLActionResult
}
```

## 作用说明

| 返回值                     | 含义                         |
| ----------------------- | -------------------------- |
| `handled()`             | URL 已处理，不执行默认行为            |
| `discarded()`           | 忽略该 URL                    |
| `systemAction(options)` | 要求系统打开给定 URL（支持 App 内或外打开） |

***

## openURL 使用示例

```tsx
<Group
  environments={{
    openURL: (url) => {
      return OpenURLActionResult.systemAction({
        url,
        prefersInApp: false
      })
    }
  }}
>
  {urls.map(url =>
    <Link url={url}>{url}</Link>
  )}
</Group>
```

说明：

- 所有 `<Link>` 均会交给自定义的 `openURL` 方法处理
- 示例将所有 URL 交由系统处理，并要求“非 App 内打开（prefersInApp: false）”

***

# 使用总结

| environment key | 类型                             | 作用范围      | 使用场景         |
| --------------- | ------------------------------ | --------- | ------------ |
| `editMode`      | `Observable<EditMode>`         | 影响所有可编辑组件 | List 编辑、批量操作 |
| `openURL`       | `(url) => OpenURLActionResult` | 所有链接组件    | 自定义 URL 处理逻辑 |

***

# 完整示例：同时使用 editMode 与 openURL

```tsx
const editMode = useObservable(() => EditMode.inactive())

<VStack
  environments={{
    editMode,
    openURL: (url) => {
      if (url.startsWith("https://safe.com")) {
        return OpenURLActionResult.systemAction({ url, prefersInApp: true })
      }
      return OpenURLActionResult.discarded()
    }
  }}
>
  <Button
    title="Toggle Edit"
    action={() => {
      editMode.value = editMode.value.isEditing
        ? EditMode.inactive()
        : EditMode.active()
    }}
  />

  <List>
    ...
  </List>

  <Link url="https://safe.com">Safe Link</Link>
  <Link url="https://blocked.com">Blocked Link</Link>
</VStack>
```

***

# 注意事项

1. `environments` 为局部作用域，仅影响其子视图。
2. `editMode` 必须是 `Observable<EditMode>` 才能触发界面更新。
3. `openURL` 若返回 `handled()`，将阻止默认行为。
4. `systemAction` 中的 `prefersInApp` 会影响是否在 App 内打开链接。
5. 与 SwiftUI 不同，Scripting 的 `environment` 是显式声明，不会隐式传播所有 key。
