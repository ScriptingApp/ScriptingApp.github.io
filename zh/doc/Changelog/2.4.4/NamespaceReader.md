# 命名空间读取器（NamespaceReader）

`NamespaceReader` 用于 **创建并管理一个几何动画命名空间（Namespace）**。
该命名空间是实现以下能力的**前提条件**：

- `matchedGeometryEffect`（组件级几何联动动画）
- `matchedTransitionSource`（页面级导航转场动画）
- `navigationTransition`（如 zoom 转场）

可以将 `NamespaceReader` 理解为：

> 一个“动画坐标系提供者”，用于告诉系统：哪些视图属于**同一组几何动画作用域**。

***

## 一、API 角色说明

`NamespaceReader` 并不是一个普通的 UI 组件，而是一个 **命名空间生成器**，用于：

- 创建一个全新的 `NamespaceID`
- 通过 render function 方式暴露给子视图使用
- 作为几何匹配动画系统的“分组边界”

它在 Scripting 中对应 SwiftUI 的：

- `@Namespace`
- `Namespace.ID`

***

## 二、基本使用方式

### 1. 最小用法结构

```tsx
<NamespaceReader>
  {namespace => (
    // 在这个作用域内
    // 使用 namespace 绑定 matchedGeometryEffect 或 matchedTransitionSource
  )}
</NamespaceReader>
```

说明：

- `NamespaceReader` 是一个 **函数式子节点组件**
- 其子节点必须是一个函数
- 该函数的参数 `namespace` 即为当前创建的命名空间实例

***

## 三、Namespace 的本质作用

### 1. 命名空间的真正含义

`namespace` 的本质作用是：

- 把一组“逻辑上可能互相关联的视图”
- 显式地声明为：

  > “它们允许进行几何匹配动画”

如果没有相同的 `namespace`：

- 即使两个视图的 `id` 完全一致
- 依然 **不会产生任何几何动画**

***

### 2. Namespace 的隔离能力

| 情况                       | 是否发生几何匹配 |
| ------------------------ | -------- |
| 相同 `id` + 相同 `namespace` | 会        |
| 相同 `id` + 不同 `namespace` | 不会       |
| 不同 `id` + 相同 `namespace` | 不会       |
| 不同 `id` + 不同 `namespace` | 不会       |

结论：

> **必须同时满足 `id` 与 `namespace` 完全一致，系统才会建立几何匹配关系。**

***

## 四、NamespaceReader 与几何动画系统的关系

### 1. 与 matchedGeometryEffect 的关系

- `matchedGeometryEffect` 依赖 `namespace` 建立“跨视图几何映射”
- `NamespaceReader` 是 `matchedGeometryEffect` 的 **前置条件**
- 没有 `NamespaceReader`：

  - `matchedGeometryEffect` 无法工作

***

### 2. 与 matchedTransitionSource 的关系

- 页面级转场动画依赖 `namespace` 来配对：

  - 转场源视图
  - 目标页面
- `NamespaceReader` 用于：

  - 在源页面生成 namespace
  - 并传递给目标页面作为统一坐标系统

***

## 五、最基础的 NamespaceReader 示例（组件级）

```tsx
const expanded = useObservable(false)

<NamespaceReader>
  {namespace => (
    <VStack>
      {!expanded.value && (
        <Circle
          matchedGeometryEffect={{
            id: "shape",
            namespace
          }}
          onTapGesture={() => {
            expanded.setValue(true)
          }}
        />
      )}

      {expanded.value && (
        <Circle
          frame={{ width: 200, height: 200 }}
          matchedGeometryEffect={{
            id: "shape",
            namespace,
            isSource: false
          }}
        />
      )}
    </VStack>
  )}
</NamespaceReader>
```

该示例中：

- `NamespaceReader` 负责创建动画坐标系
- 两个 `Circle` 因为：

  - `id` 相同
  - `namespace` 相同
    从而建立起几何联动关系

***

## 六、导航转场中的 NamespaceReader 典型结构

```tsx
<NamespaceReader>
  {namespace => (
    <NavigationLink
      destination={
        <DetailPage
          navigationTransition={{
            type: "zoom",
            namespace,
            sourceID: "cover"
          }}
        />
      }
    >
      <Image
        source="cover"
        matchedTransitionSource={{
          id: "cover",
          namespace
        }}
      />
    </NavigationLink>
  )}
</NamespaceReader>
```

该结构说明：

- `namespace` 由 `NamespaceReader` 生成
- 同时被：

  - 源视图使用
  - 目标页面使用
- 从而建立完整的页面级共享几何动画

***

## 七、命名空间的生命周期与作用范围

### 1. 生命周期

- `NamespaceReader` 每次创建：

  - 都会生成一个 **全新的 namespace**
- 该 namespace 的生命周期：

  - 仅存在于当前组件树
  - 随组件卸载而销毁

***

### 2. 作用范围

- namespace 只对其 render function 内部的视图生效
- 不可跨越组件树自动共享
- 如果需要跨组件共享：

  - 必须通过 props 显式传递 `namespace`

***

## 八、常见错误与排查要点

### 1. 动画完全不生效

请检查：

- 是否真的使用了 `NamespaceReader`
- 是否正确接收并传递了 `namespace`
- source 与 target 是否引用的是 **同一个 namespace 实例**

***

### 2. 动画偶尔失效、不稳定

常见原因：

- `NamespaceReader` 被条件渲染反复销毁与重建
- 每次重建都会生成新的 namespace
- 导致旧视图与新视图：

  - 实际上不在同一个动画坐标系中

建议：

- 将 `NamespaceReader` 放在 **稳定的父级节点**
- 避免在 `if / ternary` 结构中频繁切换

***

### 3. 多个 NamespaceReader 嵌套导致动画错乱

问题表现：

- id 相同
- 但实际 namespace 不同
- 系统无法建立匹配关系

排查思路：

- 确认 source 与 target 是否真的来自：

  - 同一个 `NamespaceReader` 实例

***

## 九、设计层面的使用建议

1. 一个独立动画区域使用一个 `NamespaceReader`
2. 不要为每一个视图都单独创建 `NamespaceReader`
3. 页面级动画：

   - NamespaceReader 应放在整个页面的根节点
4. 组件级动画：

   - NamespaceReader 应包裹同一个逻辑模块
5. 同一个 namespace 内：

   - 不要复用相同的 `id` 给不相关的视图

***

## 十、适用场景总结

适合使用 `NamespaceReader` 的场景：

- 卡片 → 详情页的共享元素动画
- Tab 指示器几何联动
- 图片放大预览
- 列表项 → 详情内容过渡
- 多视图间的空间连续动画

不需要使用 `NamespaceReader` 的场景：

- 普通 opacity / scale 动画
- 单视图内部的简单过渡
- 不涉及跨视图几何同步的动画
