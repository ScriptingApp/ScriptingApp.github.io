---
title: 液态玻璃效果
---

**GlassEffect、GlassEffectContainer、UIGlass** 等相关 API 基于 SwiftUI 新引入的 Liquid Glass 技术，让开发者能够在脚本中以 TSX 方式使用流体化、动态的玻璃材质效果，并支持过渡动画、匹配几何、联合玻璃区域等高级特性。

---

## 1. Liquid Glass 概述

Liquid Glass 是 iOS 26 新增的视觉效果系统，用于创建带有流动质感、半透明材质与动态边界的玻璃效果。与早期的 `blur` 或 `material` 不同，Liquid Glass 提供了：

- 动态玻璃形状（使用 Shape）
- 基于几何匹配的过渡动画
- 可交互的玻璃（interactive）
- 可指定 tint 色彩的玻璃材质
- 可组合多个视图的玻璃“联合”

---

## 2. GlassEffect 基础用法

所有支持玻璃效果的视图，都可以通过 `glassEffect` 修饰符添加 Liquid Glass 材质。

### 属性定义

```ts
type GlassProps = {
  glassEffect?:
    | boolean
    | UIGlass
    | Shape
    | {
        glass: UIGlass;
        shape: Shape;
      };

  glassEffectTransition?: GlassEffectTransition;

  glassEffectID?: {
    id: string | number;
    namespace: NamespaceID;
  };

  glassEffectUnion?: {
    id: string | number;
    namespace: NamespaceID;
  };
};
```

---

## 2.1 `glassEffect`

glassEffect 有四种主要使用方式：

### 方式一：启用默认玻璃材质

```tsx
<Text glassEffect>Foo</Text>
```

使用系统默认的 Liquid Glass 材质（相当于 `UIGlass.regular()`）。

---

### 方式二：使用指定的 UIGlass

```tsx
<Text glassEffect={UIGlass.regular().interactive(false)}>Foo</Text>
```

可以链式配置 tint、interactive 等属性。

---

### 方式三：设置玻璃的形状（Shape）

```tsx
<Text glassEffect={{ glass: UIGlass.regular(), shape: { type: "rect", cornerRadius: 10 } }}>
  Foo
</Text>
```

或直接传入 Shape：

```tsx
<Text
  glassEffect={{
    type: "rect",
    cornerRadius: 10,
  }}>
  Foo
</Text>
```

表示该视图的玻璃材质会严格限定在指定几何图形内。

---

### 方式四：Boolean 短写

```tsx
<View glassEffect />
```

等同于默认 UIGlass.regular()。

---

## 3. UIGlass 类

`UIGlass` 用于描述玻璃材质本身，可以选用内置材质或链式组合属性。

### 可用静态方法

| 方法                 | 描述                                               |
| -------------------- | -------------------------------------------------- |
| `UIGlass.clear()`    | 完全透明的玻璃材质，用于融合或叠加效果。           |
| `UIGlass.regular()`  | 默认的 Liquid Glass 材质。                         |
| `UIGlass.identity()` | 身份材质，不会改变内容外观，相当于不应用玻璃效果。 |

### 链式配置方法

```ts
interactive(value?: boolean): UIGlass
tint(color: Color): UIGlass
```

示例：

```tsx
glassEffect={UIGlass.regular().interactive().tint("red")}
```

---

## 4. GlassEffectTransition（玻璃过渡动画）

```ts
type GlassEffectTransition = "identity" | "materialize" | "matchedGeometry";
```

### 三种模式说明

| transition          | 描述                                                                 |
| ------------------- | -------------------------------------------------------------------- |
| `'identity'`        | 不应用任何几何或材质的动画变化。                                     |
| `'materialize'`     | 内容渐入，同时玻璃材质出现或消失，但不尝试匹配几何形状。             |
| `'matchedGeometry'` | 根据容器内其他玻璃形状的几何信息匹配过渡动画，具备更自然的动画效果。 |

### 使用方式

```tsx
<Text glassEffect glassEffectTransition="materialize">
  Foo
</Text>
```

matchedGeometry 通常需要配合 `glassEffectID` 或 `glassEffectUnion` 使用。

---

## 5. glassEffectID 与 glassEffectUnion

Liquid Glass 支持“识别”不同视图间的玻璃效果，用于 matched geometry 动画或合并多块玻璃区域。

---

## 5.1 glassEffectID

为玻璃效果赋予唯一的 ID，用于 matchedGeometry 动画。

```tsx
<Text glassEffect glassEffectID={{ id: "avatar", namespace }}>
  Foo
</Text>
```

多个视图使用相同 ID + namespace 时，系统会尝试匹配形状，从而产生流体几何动画效果。

---

## 5.2 glassEffectUnion

用于将多个玻璃效果统一为一个更大区域。

```tsx
<Text glassEffect glassEffectUnion={{ id: 1, namespace }} />
```

多个视图的玻璃材质将被合并，形成更一致的视觉区域。

---

## 6. GlassEffectContainer

`GlassEffectContainer` 是用于组织和管理玻璃效果的容器。容器内部的所有 glassEffect 视图，都能参与几何匹配、联合效果和过渡动画。

### 示例

```tsx
<GlassEffectContainer>
  <HStack spacing={40}>
    <Image glassEffect systemName="1.circle" />
    <Image glassEffect systemName="2.circle" />
  </HStack>
</GlassEffectContainer>
```

在容器中：

- matchedGeometry 正常工作
- glassEffectUnion 可以跨子视图生效
- glassEffectID 的动画效果可互相关联

GlassEffectContainer 不需要额外参数，但提供了玻璃效果组织空间。

---

## 7. 按钮的玻璃样式 buttonStyle

Scripting 在 iOS 26 提供新增按钮样式：

- `"glass"`
- `"glassProminent"`

示例：

```tsx
<Button title="Glass" action={...} buttonStyle="glass" />
<Button title="Glass Prominent" action={...} buttonStyle="glassProminent" />

<Button
  title="Glass & Tint"
  buttonStyle="glass"
  tint="red"
/>
```

这些按钮会自动使用 Liquid Glass 材质，并适配 tint、press 动效。

---

## 8. 实战示例说明

以下示例展示完整的用法，包括：

- 背景图片
- Glass 按钮
- GlassEffectContainer
- 使用 UIGlass 自定义玻璃
- 使用指定形状的玻璃

```tsx
<GlassEffectContainer>
  <HStack spacing={40}>
    <Image
      systemName="1.circle"
      frame={{ width: 80, height: 80 }}
      font={36}
      glassEffect
      offset={{ x: 30, y: 0 }}
    />
    <Image
      systemName="2.circle"
      frame={{ width: 80, height: 80 }}
      font={36}
      glassEffect
      offset={{ x: -30, y: 0 }}
    />
  </HStack>
</GlassEffectContainer>
```

---

## 9. 使用建议与最佳实践

### 1. 大量玻璃视图应包裹在同一个 GlassEffectContainer

可提高动画一致性与性能。

### 2. 使用 matchedGeometry 时务必提供 glassEffectID

否则无法产生几何跟随动画。

### 3. 复杂的玻璃区域可使用 glassEffectUnion 合并

让多个子视图形成连续材质。

### 4. 为了避免过度渲染，玻璃不应嵌套太深

可以多用 ZStack 管理效果。

### 5. UIGlass.identity 非常适合“禁用玻璃但保持结构”

它允许你保留现有布局但不实际渲染材质。
