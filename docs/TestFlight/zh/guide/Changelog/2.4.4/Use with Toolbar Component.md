---
title: 使用 Toolbar 组件
description: 使用 Toolbar 组件在视图的导航栏或工具栏区域中添加各种项目。
---

Scripting 的工具栏系统不仅支持直接在 `toolbar` 属性中传入 `ToolBarProps` 对象，也支持使用与 SwiftUI 结构一致的 `<Toolbar>`、`<ToolbarItem>`、`<ToolbarItemGroup>`、`<ToolbarSpacer>`、`<DefaultToolbarItem>` 等组件，构建更灵活、更强大的导航栏和工具栏布局。

这些组件能够提供更精细的控制，允许开发者像 SwiftUI 一样以声明式方式编排工具栏内容，并为复杂布局提供更高可读性和可维护性。

---

##基本概念

工具栏组件始终通过视图的 `toolbar` 属性使用：

```tsx
<List toolbar={<Toolbar>{/* 工具栏项 */}</Toolbar>}>{/* 主内容 */}</List>
```

`toolbar` 可以接受：

- `ToolBarProps` 对象（与原机制一致）
- `VirtualNode`（必须为 `<Toolbar>` 组件）

使用 `<Toolbar>` 时，所有内容都通过 `<ToolbarItem>` 系列组件明确定义位置和呈现方式。

---

##Toolbar

`Toolbar` 组件是工具栏的容器，用于包含多个工具栏项。它本身不定义位置，内部的 `ToolbarItem` 或 `ToolbarItemGroup` 决定实际布局。

## 用法示例

```tsx
<List
  toolbar={
    <Toolbar>
      <ToolbarItem placement="topBarLeading">
        <Button title="关闭" action={() => dismiss()} />
      </ToolbarItem>
      <ToolbarItem placement="topBarTrailing">
        <Button title="完成" action={() => handleDone()} />
      </ToolbarItem>
    </Toolbar>
  }>
  {/* 主内容 */}
</List>
```

---

##ToolbarItem

`ToolbarItem` 表示放置在工具栏指定位置的单个项目。

## 参数说明

| 参数        | 类型                   | 默认值      | 说明                                                                 |
| ----------- | ---------------------- | ----------- | -------------------------------------------------------------------- |
| `placement` | `ToolbarItemPlacement` | `automatic` | 指定工具栏位置，如 `topBarLeading`、`navigation`、`primaryAction` 等 |
| `children`  | `VirtualNode`          | 无          | 工具栏项的实际内容，例如按钮或文本                                   |

## 示例

```tsx
<Toolbar>
  <ToolbarItem placement="navigation">
    <Button title="返回" action={Navigation.useDismiss()} />
  </ToolbarItem>
</Toolbar>
```

---

##ToolbarItemGroup

`ToolbarItemGroup` 用于在同一位置放置多个工具栏项目，所有子项目将作为一组呈现。

## 参数说明

| 参数        | 类型                   | 默认值      | 说明           |
| ----------- | ---------------------- | ----------- | -------------- |
| `placement` | `ToolbarItemPlacement` | `automatic` | 工具栏位置     |
| `children`  | 多个 VirtualNode       | 无          | 多个工具栏元素 |

## 示例

```tsx
<Toolbar>
  <ToolbarItemGroup placement="topBarTrailing">
    <Button title="刷新" action={reload} />
    <Button title="更多" action={openMenu} />
  </ToolbarItemGroup>
</Toolbar>
```

---

##ToolbarSpacer

`ToolbarSpacer` 用于在工具栏项之间添加空白区域，适合需要自定义布局的场景。

## 参数说明

| 参数        | 类型                    | 默认值      | 说明                             |
| ----------- | ----------------------- | ----------- | -------------------------------- |
| `sizing`    | `'fixed' \| 'flexible'` | `flexible`  | 控制 Spacer 是否固定大小或可伸缩 |
| `placement` | `ToolbarItemPlacement`  | `automatic` | Spacer 所在位置                  |

### 行为说明

- `flexible`: 工具栏中的弹性空间，它会占据剩余区域。
- `fixed`: 提供固定间隔，适合多个按钮之间进行细微布局。

## 示例：在同一组中强制按钮分隔

```tsx
<Toolbar>
  <ToolbarItem placement="topBarTrailing">
    <Button title="Edit" action={edit} />
  </ToolbarItem>
  <ToolbarSpacer sizing="fixed" placement="topBarTrailing" />
  <ToolbarItem placement="topBarTrailing">
    <Button title="Save" action={save} />
  </ToolbarItem>
</Toolbar>
```

---

##DefaultToolbarItem

```ts
type ToolbarDefaultItemKind = "sidebarToggle" | "search" | "title";

type DefaultToolbarItemProps = {
  kind: ToolbarDefaultItemKind;
  placement?: ToolbarItemPlacement;
};

declare const DefaultToolbarItem: FunctionComponent<DefaultToolbarItemProps>;
```

用于渲染系统提供的默认工具栏项目，例如侧边栏切换按钮、搜索按钮、标题显示等。

## 参数说明

| 参数        | 类型                                     | 默认值      | 说明                 |
| ----------- | ---------------------------------------- | ----------- | -------------------- |
| `kind`      | `"sidebarToggle" \| "search" \| "title"` | 无          | 选择系统默认项目类型 |
| `placement` | `ToolbarItemPlacement`                   | `automatic` | 放置位置             |

## 示例：添加默认的搜索栏按钮

```tsx
<Toolbar>
  <DefaultToolbarItem kind="search" placement="topBarTrailing" />
</Toolbar>
```

---

##综合示例：使用 Toolbar 构建复杂工具栏

```tsx
<NavigationStack>
  <List
    toolbar={
      <Toolbar>
        {/* 左侧导航按钮 */}
        <ToolbarItem placement="navigation">
          <Button title="返回" action={Navigation.useDismiss()} />
        </ToolbarItem>

        {/* 标题 */}
        <DefaultToolbarItem kind="title" />

        {/* 右侧一组按钮 */}
        <ToolbarItem placement="topBarTrailing">
          <Button title="编辑" action={edit} />
        </ToolbarItem>
        <ToolbarSpacer sizing="fixed" placement="topBarTrailing" />
        <ToolbarItem placement="topBarTrailing">
          <Button title="完成" action={finish} />
        </ToolbarItem>

        {/* 底部区域按钮 */}
        <ToolbarItem placement="bottomBar">
          <Button title="帮助" action={showHelp} />
        </ToolbarItem>
      </Toolbar>
    }>
    {/* 主内容 */}
  </List>
</NavigationStack>
```

此结构灵活而清晰，可复现 SwiftUI 中复杂的工具栏布局。

---

##与 ToolBarProps 的关系

在 API 层面：

| 方式                                        | 说明                                   |
| ------------------------------------------- | -------------------------------------- |
| `toolbar={ { topBarTrailing: <Button/> } }` | 简洁、直观，适合简单场景               |
| `toolbar={<Toolbar>...</Toolbar>}`          | 可组合，可精确布局，适合复杂、多组内容 |

两种方式完全兼容，可根据需要选择。

---

##总结

Toolbar 组件提供了高度灵活的工具栏布局能力，包括：

- 单项工具栏项 (`ToolbarItem`)
- 工具栏项目组 (`ToolbarItemGroup`)
- 自适应空白区域 (`ToolbarSpacer`)
- 系统默认工具栏元素 (`DefaultToolbarItem`)
- 容器式声明 (`<Toolbar>`)
