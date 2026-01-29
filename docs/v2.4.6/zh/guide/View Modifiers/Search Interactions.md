---
title: 搜索交互
description: 你可以为列表等滚动视图添加搜索栏，控制搜索栏的显示位置、状态，监听输入变化，并动态显示搜索建议。

---

Scripting 支持与 SwiftUI 类似的搜索功能。你可以为列表等滚动视图添加搜索栏，控制搜索栏的显示位置、状态，监听输入变化，并动态显示搜索建议。

---

## `searchable`

为视图添加搜索栏，并将搜索文本与状态绑定。

### 类型

```ts
searchable?: {
  value: string
  onChanged: (value: string) => void
  placement?: SearchFieldPlacement
  prompt?: string
  presented?: {
    value: boolean
    onChanged: (value: boolean) => void
  }
}
```

### 参数说明

* `value`: 当前搜索输入的文本（受控状态）。
* `onChanged`: 每当用户输入发生变化时调用，传入新的搜索内容。
* `placement`: 控制搜索栏的显示位置（可选）。
* `prompt`: 搜索栏中的提示占位文本（可选）。
* `presented`: 控制搜索栏是否处于激活状态，可以主动打开或关闭搜索界面（可选）。

### 示例

```tsx
function SearchExample() {
  const [query, setQuery] = useState("")
  const [showSearch, setShowSearch] = useState(false)

  return (
    <List
      searchable={{
        value: query,
        onChanged: setQuery,
        placement: "navigationBarDrawer",
        prompt: "搜索项目",
        presented: {
          value: showSearch,
          onChanged: setShowSearch,
        }
      }}
    >
      <Text>当前搜索内容：{query}</Text>
    </List>
  )
}
```

### `SearchFieldPlacement` 可选值

| 值                                       | 描述                           |
| --------------------------------------- | ---------------------------- |
| `'automatic'`                           | 系统自动决定搜索栏位置（默认）。             |
| `'navigationBarDrawer'`                 | 在导航栏下方作为抽屉式显示。               |
| `'navigationBarDrawerAlwaysDisplay'`    | 始终显示抽屉搜索栏。                   |
| `'navigationBarDrawerAutomaticDisplay'` | 根据需要自动显示抽屉搜索栏。               |
| `'toolbar'`                             | 显示在工具栏中。                     |
| `'sidebar'`                             | 显示在侧边栏（适用于 iPad 或 macOS 风格）。 |

---

## `searchSuggestions`

设置搜索建议的内容区域，在用户输入时显示一组建议项。

### 类型

```ts
searchSuggestions?: VirtualNode
```

### 示例

```tsx
const suggestions = useMemo(() => [
  {
    label: "🍎 Apple",
    value: "Apple"
  },
  {
    label: "🍌 Bananer",
    value: "Bananer"
  }
], [])
const filteredSuggestions = useMemo(() => {
  if (!/\S+/.test(query)) {
    return suggestions
  }
  const q = query.toLowerCase()
  return suggestions.filter(s =>
    s.label.toLowerCase().includes(q) ||
    s.value.toLowerCase().includes(q))
}, [query, suggestions])

<List
  searchable={{
    value: query,
    onChanged: setQuery
  }}
  searchSuggestions={
    <>
      {filteredSuggestions.map(s =>
        <Text
          searchCompletion={s.value}
        >{s.label}</Text>
      )}
    </>
  }
/>
```

---

## `searchSuggestionsVisibility`

控制搜索建议的显示位置和是否可见。

### 类型

```ts
searchSuggestionsVisibility?: {
  visibility: 'visible' | 'hidden'
  placements: SearchSuggestionsPlacementSet
}
```

### `SearchSuggestionsPlacementSet` 可选值

| 值           | 描述                |
| ----------- | ----------------- |
| `'content'` | 在主内容区域中显示建议项。     |
| `'menu'`    | 在弹出菜单或下拉列表中显示建议项。 |
| `'all'`     | 同时适用于所有可用位置。      |

### 示例

```tsx
<List
  searchSuggestionsVisibility={{
    visibility: 'visible',
    placements: 'menu'
  }}
/>
```

---

## `searchCompletion`

将某个视图（如 `<Text>`）标记为可点击的搜索建议项，并指定点击后填入搜索框的值。

### 类型

```ts
searchCompletion?: string
```

### 示例

```tsx
<Text searchCompletion="Mango">🥭 芒果</Text>
```

当用户点击该建议项后，搜索栏将自动填入 `"Mango"`。

---

## 小结

| 修饰符                           | 功能说明               |
| ----------------------------- | ------------------ |
| `searchable`                  | 添加搜索栏，绑定搜索状态与行为。   |
| `searchSuggestions`           | 提供搜索建议项列表。         |
| `searchSuggestionsVisibility` | 控制建议项的显示位置和是否可见。   |
| `searchCompletion`            | 设置建议项点击后自动填入搜索栏的值。 |
