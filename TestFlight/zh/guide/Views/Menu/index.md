# 菜单

Scripting 提供的 `Menu` 是一个交互式菜单组件，用于展示一组操作项或子菜单。该组件可以作为操作容器，也支持嵌套结构，适合在工具栏、上下文菜单或紧凑布局中统一管理多个相关操作。

其行为类似于 SwiftUI 中的 `Menu`，支持纯文本标签和自定义视图标签，并可配置点击时的默认行为。

***

## 用途

使用 `Menu` 可以将多个相关操作整合为一个统一入口，提升界面整洁性与可用性。菜单中可以包含多个 `Button` 组件，也可以嵌套其他 `Menu` 实现多级菜单结构。

***

## 属性定义

```ts
type MenuProps = {
  primaryAction?: () => void
  children?: VirtualNode | (VirtualNode | undefined | null)[]
} & (
  | {
      title: string
      systemImage?: string
    }
  | {
      label: VirtualNode
    }
)
```

### 基础属性

| 属性名             | 类型                | 说明                                 |
| --------------- | ----------------- | ---------------------------------- |
| `primaryAction` | `() => void`（可选）  | 点击菜单本身时触发的主操作，不展开子菜单。适合设置默认行为。     |
| `children`      | `VirtualNode` 或数组 | 菜单的内容，通常是 `Button` 或嵌套的 `Menu` 组件。 |

### 标签配置（二选一）

开发者必须指定以下两种标签方式之一：

#### 方式一：`title` 与可选的 `systemImage`

| 属性名           | 类型           | 说明                      |
| ------------- | ------------ | ----------------------- |
| `title`       | `string`     | 菜单标题，描述菜单的操作内容。         |
| `systemImage` | `string`（可选） | SF Symbols 图标名称，显示在标题旁。 |

#### 方式二：`label` 自定义视图标签

| 属性名     | 类型            | 说明                   |
| ------- | ------------- | -------------------- |
| `label` | `VirtualNode` | 自定义菜单标签视图，可组合图标、文本等。 |

***

## 示例：基础菜单结构

```tsx
<Menu title="操作">
  <Button title="重命名" action={rename} />
  <Button title="删除" action={delete} />
  <Menu title="复制">
    <Button title="复制" action={copy} />
    <Button title="复制格式" action={copyFormatted} />
  </Menu>
</Menu>
```

在此示例中：

- 主菜单为 `"操作"`，包含两个按钮和一个嵌套的 `"复制"` 子菜单；
- 子菜单中继续包含两个按钮。

***

## 示例：使用 `primaryAction` 和图标

```tsx
<Menu
  title="更多"
  systemImage="ellipsis"
  primaryAction={() => console.log("点击菜单")}
>
  <Button title="设置" action={openSettings} />
  <Button title="帮助" action={openHelp} />
</Menu>
```

- 用户点击菜单图标将触发 `primaryAction`；
- 长按或展开菜单时，会展示其 `children` 内容。

***

## 示例：使用自定义标签

```tsx
<Menu
  label={
    <HStack>
      <Image systemName="gear" />
      <Text>选项</Text>
    </HStack>
  }
>
  <Button title="配置" action={configure} />
</Menu>
```

此示例使用 `HStack` 组合图标与文本作为菜单标签，适合在复杂场景下灵活布局。

***

## 开发提示

- `Menu` 常用于 `toolbar`、`contextMenu` 等需要组合多个操作的界面中；
- 可无限嵌套子菜单，构建多层级操作结构；
- 若操作不多且用户期望直接执行某一默认行为，可设置 `primaryAction`；
- 自定义 `label` 可用于图标+文本的混合样式，提升可视性与品牌一致性。
