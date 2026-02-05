---
title: 新的 List 视图修饰符
description: 这些修饰符可用于精细控制 <List> 中每一个区块（Section）的布局与样式。
---

##属性概览

| 属性名                       | 类型                                                        | 系统要求  | 说明                                      |
| ---------------------------- | ----------------------------------------------------------- | --------- | ----------------------------------------- |
| `listSectionIndexVisibility` | `Visibility`                                                | iOS 26.0+ | 控制 List 右侧 Section 索引条的可见性     |
| `listSectionMargins`         | `number \| EdgeSets \| { edges: EdgeSets; length: number }` | iOS 26.0+ | 自定义 Section 边距，替换系统默认边距规则 |
| `sectionIndexLabel`          | `string`                                                    | iOS 26.0+ | 设置 Section 在索引条中的字符标签         |
| `sectionActions`             | `VirtualNode`                                               | iOS 18.0+ | 为 Section 添加自定义操作区域             |

---

##1. listSectionIndexVisibility

```ts
/**
 * Sets the visibility of the list section index.
 * @available iOS 26.0+.
 */
listSectionIndexVisibility?: Visibility
```

### 功能说明

控制 List 的右侧索引条是否显示。常用于需要类似通讯录 A-Z 快速跳转的场景。

可选值：

- `"visible"`
- `"hidden"`
- `"automatic"`（系统自行判断）

### 示例

```tsx
<List listSectionIndexVisibility="visible">
  <ForEach
    data={groups}
    builder={(group) => (
      <Section header={<Text>{group.title}</Text>} sectionIndexLabel={group.title}>
        {group.items.map((item) => (
          <Text key={item}>{item}</Text>
        ))}
      </Section>
    )}
  />
</List>
```

---

##2. listSectionMargins

```ts
/**
 * Set the section margins for the specific edges.
 * @available iOS 26.0+.
 */
listSectionMargins?: number | EdgeSets | {
  edges: EdgeSets
  length: number
}
```

### 功能说明

设置 Section 的外边距，完全替换系统默认边距。可使用数值、 EdgeSets，或指定边的写法。

### 三种写法说明

### 2.1 使用单一数字作为四边边距

```tsx
listSectionMargins={12}
```

### 2.2 使用 EdgeInsets

```tsx
listSectionMargins={"all"}
```

### 2.3 针对特定边设置长度

```tsx
listSectionMargins={{
  edges: "horizontal",
  length: 20
}}
```

此写法等同于 SwiftUI 中：

```swift
.listSectionMargins(.horizontal, 20)
```

### 示例

```tsx
<Section
  header={<Text>Favorites</Text>}
  listSectionMargins={{
    edges: "vertical",
    12
  }}
>
  <Text>Item A</Text>
  <Text>Item B</Text>
</Section>
```

---

##3. sectionIndexLabel

```ts
/**
 * Sets the label that is used in a section index.
 * @available iOS 26.0+.
 */
sectionIndexLabel?: string
```

### 功能说明

为 Section 设置索引条的显示字符，一般为单字母，如 “A”、“B”、“C”。

### 示例

```tsx
<Section header={<Text>A</Text>} sectionIndexLabel="A">
  <Text>Adam</Text>
  <Text>Ana</Text>
</Section>
```

---

##4. sectionActions

```ts
/**
 * Adds custom actions to a section.
 * @available iOS 18.0+
 */
sectionActions?: VirtualNode
```

### 功能说明

为 Section 添加自定义操作按钮、菜单等 UI，位置通常显示在 Section Header 区域的右侧。

### 示例：添加刷新按钮

```tsx
<Section
  header={<Text>Downloads</Text>}
  sectionActions={<Button title="Refresh" action={() => doRefresh()} />}>
  <Text>File 1</Text>
  <Text>File 2</Text>
</Section>
```

### 示例：添加菜单动作

```tsx
<Section
  header={<Text>Photos</Text>}
  sectionActions={
    <Menu title="Actions">
      <Button title="Upload All" action={() => uploadAll()} />
      <Button title="Delete All" action={() => deleteAll()} />
    </Menu>
  }>
  {photos.map((photo) => (
    <Text key={photo.id}>{photo.name}</Text>
  ))}
</Section>
```

---

##完整示例

```tsx
<List listSectionIndexVisibility="visible">
  <ForEach
    data={groups}
    builder={(group) => (
      <Section
        header={<Text>{group.title}</Text>}
        sectionIndexLabel={group.title}
        listSectionMargins={12}
        sectionActions={<Button title="Refresh" action={() => refreshGroup(group)} />}>
        {group.items.map((item) => (
          <Text key={item}>{item}</Text>
        ))}
      </Section>
    )}
  />
</List>
```
