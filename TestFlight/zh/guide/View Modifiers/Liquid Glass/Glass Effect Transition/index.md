Liquid Glass 在 iOS 26 引入了更先进的几何匹配与材质过渡能力。
Scripting 完整支持这些特性，并通过 `glassEffectTransition`、`glassEffectID`、`glassEffectUnion`、`GlassEffectContainer` 以及 `NamespaceReader` 组合实现自然、顺滑且结构化的玻璃动画体验。

本文将详细说明：

- 什么是 Glass Effect Transition
- 三种过渡类型
- 为什么需要 glassEffectID 与 namespace
- glassEffectUnion 的作用
- NamespaceReader 的设计目的与机制
- 实际示例解析
- 最佳实践

***

# 1. 概述：什么是 Glass Effect Transition

`glassEffectTransition` 用于指定 Liquid Glass 在视图出现、消失或布局变化期间应如何过渡。

```ts
type GlassEffectTransition = 'identity' | 'materialize' | 'matchedGeometry'
```

Glass Effect Transition 控制三个核心内容：

1. **玻璃材质如何出现 / 消失**
2. **玻璃的几何形状是否会参与动画**
3. **玻璃是否与容器中其他视图的几何形状匹配**

过渡效果只影响“玻璃材质本身”，而不是普通视图的 opacity 或 scale。

***

# 2. 三种过渡类型

## 2.1 identity（无过渡）

```tsx
glassEffectTransition="identity"
```

含义：

- 不应用任何几何或材质动画。
- 内容会直接呈现，不做淡入或几何匹配。

适用于：

- 禁用动画
- 确保界面非常静态
- 开发调试

***

## 2.2 materialize（材质出现动画）

```tsx
glassEffectTransition="materialize"
```

特点：

- 内容会逐渐淡入。
- Liquid Glass 材质会以柔和方式出现和消失。
- 不进行几何匹配，不尝试从其他玻璃形状“过渡”。

适用于：

- 材质出现／消失强调明显
- 不需要几何跟随效果
- 简单切换菜单或按钮

***

## 2.3 matchedGeometry（匹配几何）

```tsx
glassEffectTransition="matchedGeometry"
```

特点：

- 玻璃材质会尝试“继承”同一 namespace 内、相同 ID 的玻璃形状。
- 在视图切换时，从旧形状平滑过渡到新形状。
- 需要使用 `glassEffectID` 指定对应关系。

适用于：

- 复杂菜单切换
- 视图替换（Edit → Home）
- 需要视觉连续性的动画

是 Liquid Glass 最强大也是最常用的模式。

***

# 3. glassEffectID 与 namespace：匹配几何的核心

## 3.1 为什么需要 ID？

几何匹配动画需要知道：

- “旧玻璃”是谁
- “新玻璃”是谁

因此必须给玻璃效果一个身份标识：

```tsx
glassEffectID={{
  id: 1,
  namespace
}}
```

如果两个玻璃视图：

- 位于相同 namespace
- glassEffectID 的 id 相同

系统会认为它们是同一“玻璃实体”的不同状态，允许过渡。

***

## 3.2 为什么必须有 namespace？

SwiftUI 的 matchedGeometry 效果依赖 `@Namespace`，在 Scripting 中我们通过 `NamespaceReader` 暴露给 TSX。

`NamespaceReader` 提供：

```tsx
<NamespaceReader>
  {namespace => (
    ... 在此作用域中所有 glassEffectID 都应使用这个 namespace ...
  )}
</NamespaceReader>
```

原因：

- namespace 用于组织 matchedGeometry 的作用域
- 同一 namespace 内的 ID 才能互相匹配
- 不同 namespace 之间永远不会彼此动画匹配

***

# 4. glassEffectUnion：玻璃材质的联合区域

除了匹配几何形状外，Liquid Glass 还能把多个玻璃区域合并为一个连续材质区域：

```tsx
glassEffectUnion={{
  id: 1,
  namespace
}}
```

效果：

- 相同 union ID 的按钮共享同一个玻璃材质分区
- 多个按钮可看起来像“同一块玻璃切出来的”
- 提升视觉统一性

通常和 matchedGeometry 同时使用。

***

# 5. 示例解析

以下示例展示菜单在两种布局之间切换，并使用动画呈现玻璃过渡：

```tsx
isAlternativeMenu.value
  ? <>
      <Button
        title="Home"
        glassEffectID={{id:1, namespace}}
        glassEffectUnion={{id:1,namespace}}
      />
      <Button
        title="Settings"
        glassEffectID={{id:2, namespace}}
        glassEffectUnion={{id:1,namespace}}
      />
    </>
  : <>
      <Button
        title="Edit"
        glassEffectID={{id:1, namespace}}
        glassEffectUnion={{id:1,namespace}}
      />
      <Button
        title="Erase"
        glassEffectID={{id:3, namespace}}
        glassEffectUnion={{id:1,namespace}}
        glassEffectTransition="materialize"
      />
      <Button
        title="Delete"
        glassEffectID={{id:2, namespace}}
        glassEffectUnion={{id:1,namespace}}
      />
    </>
```

重点说明：

### 1. 按钮之间共享 Union ID = 1

所有按钮（无论菜单 A 或 B）实际上共享一个玻璃材质“池”。
这样切换时材质背景连续且自然。

### 2. Home / Edit 共享 ID = 1

- 当菜单切换时，Edit → Home 的玻璃材质会自动匹配几何形状，触发 matchedGeometry 动画。

### 3. Delete / Settings 共享 ID = 2

- Delete → Settings 也会使用 matching transition。

### 4. Erase 设置了 materialize

```tsx
glassEffectTransition="materialize"
```

它不会尝试匹配几何，而是用材质淡入淡出的动画。
这可以让某个按钮以不同方式呈现，令人体验变化更明显。

### 5. 整个 HStack 包裹在 GlassEffectContainer

```tsx
<GlassEffectContainer>
  <HStack> ... </HStack>
</GlassEffectContainer>
```

容器提供：

- 匹配几何所需的上下文
- 优化渲染性能
- 让 union 生效

***

# 6. NamespaceReader：Scripting 如何暴露 @Namespace

在 SwiftUI 中：

```swift
@Namespace private var ns
```

只能在 SwiftUI View 中使用，无法直接从 TypeScript 中访问。

因此 Scripting 提供：

```tsx
<NamespaceReader>
  {namespace => (
    ...
  )}
</NamespaceReader>
```

### 作用：

1. 实际内部创建 SwiftUI 的 `@Namespace`
2. 自动管理生命周期
3. 将 namespace 提供给 TS
4. 保证同一 TSX 作用域使用同一个 namespace

等价于：

```tsx
@Namespace var namespace

glassEffectID={{ id: x, namespace }}
```

没有 NamespaceReader，无论 matchedGeometry 还是 union 都无法工作。

***

# 7. 动画触发方式（withAnimation）

玻璃过渡不会自行动画，必须使用动画触发状态切换：

```tsx
withAnimation(() => {
  isAlternativeMenu.setValue(
    !isAlternativeMenu.value
  )
})
```

匹配几何、材质出现动画等会自动附着到这次动画事务中。

***

# 8. 最佳实践

### 1. 所有参与动画的视图必须在同一个 GlassEffectContainer

否则 matchedGeometry 不会生效。

### 2. namespace 必须由同一个 NamespaceReader 提供

**不要跨层级或重复构造 namespace**。

### 3. glassEffectID 必须在两个状态中都出现

否则 SwiftUI 无法关联动画。

### 4. 若要连续的材质外观，应使用 glassEffectUnion

让按键像同一块玻璃切换。

### 5. 除特殊情况外，尽量使用 matchedGeometry

可获得更自然的“流动感”。

***

# 9. 总结

Glass Effect Transition 是 iOS 26 Liquid Glass 系统的核心特性之一，它让玻璃材质在视图切换中具备几何匹配、材质渐变与联合区域动画。

在 Scripting 中：

- `glassEffectTransition` 控制动画类型
- `glassEffectID` + `namespace` 让几何匹配成为可能
- `glassEffectUnion` 提供材质连续感
- `GlassEffectContainer` 管理动画环境
- `NamespaceReader` 使 TSX 能访问 SwiftUI 的 @Namespace
