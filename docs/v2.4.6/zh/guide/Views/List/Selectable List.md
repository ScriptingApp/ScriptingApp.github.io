---
title: 可选择的列表
description: 实现单选和多选的列表功能。

---

`List.selection` 用于为 `List` 组件提供**选择状态绑定能力**，用于实现列表的：

* 单选模式（Single Selection）
* 多选模式（Multiple Selection）
* 与编辑模式（`EditButton`）联动的批量选择行为

---

## 一、API 定义

```ts
type ListProps = {
  selection?: Observable<string | null> | Observable<string[]>
  ...
}

declare const List: FunctionComponent<ListProps>
```

---

## 二、selection 类型说明

`selection` 通过 `Observable` 的泛型类型自动区分选择模式：

| 模式 | Observable 类型          | 说明         | 
| -- | ---------------------- | ---------- |
| 单选 | `Observable<string \| null>`     | 仅允许选中一个元素 |
| 多选 | `Observable<string[]>` | 允许同时选中多个元素 |

---

## 三、selection 与 ForEach 的自动绑定规则

当 `List` 绑定 `selection` 时，`ForEach` 的 `data` **必须满足以下规则**：

```ts
ForEach 的 data 数组中，每一个元素都必须包含：

{
  id: string
}
```

系统行为规则如下：

1. `id` 会被自动作为该行的 **唯一选择标识**
2. 当用户点击某一行时：

   * 单选模式：`selected.value` 会被自动设置为该行的 `id`
   * 多选模式：该 `id` 会被自动加入或移出 `selected.value` 数组
3. 不需要手动在 `onTap` 中处理选中逻辑
4. `id` 必须唯一且稳定，否则会导致选择状态错乱或失效

---

## 四、单选模式（Single Selection）

### 1. 定义方式

```tsx
const selected = useObservable<string | null>(null)
```

### 2. 使用示例

```tsx
function View() {
  const selected = useObservable<string | null>(null)

  const options = useObservable<{ id: string }[]>(() =>
    new Array(10).fill(0).map((_, i) => ({ id: i.toString() }))
  )

  return <NavigationStack>
    <List selection={selected}>
      <ForEach
        data={options}
        builder={item =>
          <Text>{item.id}</Text>
        }
      />
    </List>
  </NavigationStack>
}
```

### 3. 状态说明

* `null`：当前没有选中任何项
* `"3"`：当前选中 `id === "3"` 的项

---

## 五、多选模式（Multiple Selection）

### 1. 定义方式

```tsx
const selected = useObservable<string[]>([])
```

### 2. 使用示例

```tsx
function View() {
  const dismiss = Navigation.useDismiss()
  const selected = useObservable<string[]>([])

  const options = useObservable<{ id: string }[]>(() =>
    new Array(30).fill(0).map((_, i) => ({
      id: i.toString() 
    }))
  )

  console.log(selected.value)

  return <NavigationStack>
    <List
      navigationTitle="Page Title"
      navigationBarTitleDisplayMode="inline"
      toolbar={{
        topBarLeading: <Button
          title="Done"
          action={dismiss}
        />,
        topBarTrailing: <EditButton />
      }}
      selection={selected}
    >
      <ForEach
        data={options}
        builder={item =>
          <Text>{item.id}</Text>
        }
      />
    </List>
  </NavigationStack>
}
```

### 3. 状态说明

`selected.value` 始终为一个字符串数组，例如：

```ts
["2", "5", "8"]
```

表示当前有 3 项被同时选中。

---

## 六、selection 与 EditButton 的编辑模式行为

当 `List` 绑定了 `selection` 后：

1. `EditButton` 会自动启用选择编辑模式
2. 进入编辑模式后：

   * 单选：点击某一项即切换选中项
   * 多选：支持多项同时勾选
3. 退出编辑模式后：

   * `selected.value` 会被 **自动重置**

     * 单选模式重置为 `null`
     * 多选模式重置为空数组 `[]`

该行为与 SwiftUI 原生编辑模式保持一致。

---

## 七、selection 的程序化控制

除了用户交互以外，也可以通过代码主动修改选中状态。

### 单选模式

```ts
selected.setValue("5")
```

### 多选模式

```ts
selected.setValue(["1", "3", "7"])
```

设置后 UI 会自动同步对应的勾选状态。

---

## 八、selection 与 NavigationStack 的兼容性

`List.selection` 可以安全地在 `NavigationStack` 内使用，不会影响：

* 页面导航行为
* Toolbar 显示
* EditButton 编辑模式
* 页面返回逻辑

标准推荐结构如下：

```tsx
<NavigationStack>
  <List selection={selected}>
    ...
  </List>
</NavigationStack>
```

---

## 九、常见错误说明

### 1. selection 类型错误

错误：

```ts
const selected = useObservable<number | null>(null)
```

正确：

```ts
const selected = useObservable<string | null>(null)
```

目前 `selection` 仅支持 `string` 作为选择标识类型。

---

### 2. 多选模式初始化错误

错误：

```ts
const selected = useObservable<string[]>(null)
```

正确：

```ts
const selected = useObservable<string[]>([])
```

---

### 3. data 未包含 id:string

错误示例：

```tsx
const options = [{ name: "A" }, { name: "B" }]
```

该写法将导致：

* selection 无法正常工作
* 勾选状态丢失
* 列表复用异常

---

## 十、适用场景

`List.selection` 适用于以下场景：

* 单选设置项（主题、语言、偏好）
* 批量删除
* 批量导出
* 批量分享
* 文件管理器
* 通讯录选择
* 任务列表勾选
