---
title: onDrag 和 onDrop 修饰符
description: 这些 API 允许视图作为拖动源、拖放目标或者同时，支持内部应用和跨应用拖拽。

---

Scripting 提供了一套与 SwiftUI Drag & Drop 行为模型高度一致的 API，用于在脚本中实现视图间、应用内或跨应用的拖拽与放置操作。

该能力主要由以下三部分构成：

* **onDrag**：将当前视图声明为拖拽源
* **onDrop**：将当前视图声明为放置目标
* **DropInfo / ItemProvider / UTType**：描述拖拽内容与状态的上下文对象

拖拽与放置是一个严格受系统控制的交互流程，部分 API 只能在特定回调中调用，文档中会明确指出这些限制。

---

## 核心数据类型

### DropInfo

`DropInfo` 描述一次拖拽在当前放置视图上的实时状态。该对象仅在 `onDrop` 相关回调中有效。

#### 属性

##### location: Point

* 表示拖拽当前位置
* 坐标空间为 **放置视图自身的本地坐标系**
* 可用于实现基于位置的高亮、插入指示线、排序逻辑等

#### 方法

##### hasItemsConforming(types: UTType[]): boolean

* 用于判断拖拽内容中，是否至少有一个项目符合指定的 UTType
* 常用于：

  * `validateDrop`
  * `dropEntered`
  * `dropUpdated`
* 不会实际加载数据，仅用于能力判断

##### itemProviders(types: UTType[]): ItemProvider[]

* 返回符合指定 UTType 的 `ItemProvider` 列表
* **仅允许在 `performDrop` 回调中调用**
* 在该方法返回后，系统将撤销对拖拽数据的访问权限

> 重要约束
> 必须在 `performDrop` 方法作用域内 **立即开始** 对 ItemProvider 的数据加载（如 `loadData`、`loadText`）。
> 不允许延迟到其他回调或异步逻辑中再发起加载。

---

## DropOperation

`DropOperation` 用于描述当前拖拽更新阶段，目标视图期望执行的操作类型。

可选值如下：

* `"copy"`
  表示复制数据（最常见，用于文件、文本、图片等）

* `"move"`
  表示移动数据（通常仅用于应用内部拖拽）

* `"cancel"`
  取消本次拖拽，不执行任何数据传输

* `"forbidden"`
  明确禁止当前拖拽行为，系统通常会显示禁止指示

`DropOperation` 通常由 `dropUpdated` 回调返回，用于动态控制拖拽行为。

---

## DragDropProps

`DragDropProps` 是所有支持拖拽与放置能力的视图可选属性集合。

---

## onDrag

### 用途

将当前视图声明为 **拖拽源**，允许用户从该视图开始一次拖拽操作。

### 定义

```ts
onDrag?: {
  data: () => ItemProvider
  preview: VirtualNode
}
```

### 参数说明

#### data

```ts
data: () => ItemProvider
```

* 返回一个 `ItemProvider`
* 用于描述拖拽时传递的数据内容
* 支持文本、图片、文件、URL、自定义类型等
* 每次拖拽开始时调用

> 建议
> 仅在该回调中构造 ItemProvider，不要复用旧实例，以确保数据状态正确。

#### preview

```ts
preview: VirtualNode
```

* 指定拖拽开始后显示的预览视图
* 系统会自动将其渲染为拖拽浮层
* 预览视图默认居中于源视图

---

## onDrop

### 用途

将当前视图声明为 **放置目标**，并通过一组回调精细控制拖拽验证、状态变化与最终数据接收。

### 定义

```ts
onDrop?: {
  types: UTType[]
  validateDrop?: (info: DropInfo) => boolean
  dropEntered?: (info: DropInfo) => void
  dropUpdated?: (info: DropInfo) => DropOperation | null
  dropExited?: (info: DropInfo) => void
  performDrop: (info: DropInfo) => boolean
}
```

---

### onDrop.types

```ts
types: UTType[]
```

* 声明该视图 **允许接收的内容类型**
* 如果拖拽内容不包含任意一个匹配类型：

  * 放置区域不会激活
  * `validateDrop` 不会被调用
  * 视觉高亮不会出现

---

### validateDrop

```ts
validateDrop?: (info: DropInfo) => boolean
```

* 用于判断是否允许开始一次放置操作
* 返回 `false` 将直接拒绝拖拽
* 常见用途：

  * 检查类型数量
  * 校验业务状态（如只允许空列表接收）

默认行为：始终返回 `true`

---

### dropEntered

```ts
dropEntered?: (info: DropInfo) => void
```

* 当拖拽进入放置区域时触发
* 通常用于：

  * 显示高亮
  * 显示插入占位符
  * 触发动画状态

---

### dropUpdated

```ts
dropUpdated?: (info: DropInfo) => DropOperation | null
```

* 当拖拽在放置区域内部移动时反复调用
* 用于动态返回期望的 `DropOperation`

返回值说明：

* 返回具体的 `DropOperation`：更新当前拖拽行为
* 返回 `null`：

  * 使用上一次返回的有效值
  * 若没有历史值，默认使用 `"copy"`

---

### dropExited

```ts
dropExited?: (info: DropInfo) => void
```

* 当拖拽离开放置区域时触发
* 常用于清理高亮、移除占位 UI

---

### performDrop

```ts
performDrop: (info: DropInfo) => boolean
```

* **最关键的回调**
* 表示用户已松手，系统允许你读取拖拽数据
* 返回值：

  * `true`：表示成功接收并处理了拖拽
  * `false`：表示放置失败

#### 重要约束（必须遵守）

* 必须在该方法作用域内：

  * 调用 `info.itemProviders(...)`
  * 并立即开始数据加载
* 不允许：

  * 将 ItemProvider 保存到外部
  * 在异步回调中延迟访问拖拽数据

这是系统级安全限制，不遵守将导致数据无法访问。

---

## 典型使用流程总结

1. 用户从 `onDrag` 视图开始拖拽
2. 系统根据 `onDrop.types` 判断是否激活目标
3. 调用 `validateDrop`
4. 进入放置区域 → `dropEntered`
5. 移动过程中 → 多次 `dropUpdated`
6. 离开区域 → `dropExited`
7. 松手 → `performDrop`
8. 在 `performDrop` 中读取并处理数据

---

## 设计建议与最佳实践

* 始终精确声明 `UTType`，避免过于宽泛
* 在 `dropUpdated` 中返回 `"forbidden"` 可显式阻止非法拖拽
* 复杂数据解析逻辑应在 `ItemProvider` 加载完成后的异步回调中完成，而不是在 `performDrop` 中同步阻塞
* 跨应用拖拽时，优先使用系统标准类型（text、image、file、url）
