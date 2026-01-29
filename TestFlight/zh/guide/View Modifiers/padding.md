# 间距

`padding` 属性用于设置视图内容与其边缘之间的间距，相当于 SwiftUI 中的 `padding` 修饰符。它有助于视图之间的分隔与整体布局美观。

## 定义

```ts
padding?: true | number | {
  horizontal?: number | true
  vertical?: number | true
  leading?: number | true
  trailing?: number | true
  top?: number | true
  bottom?: number | true
}
```

## 支持的写法

***

### 1. 默认边距

```ts
padding: true
```

为所有边应用系统默认的内边距。

#### 示例：

```tsx
<Text padding={true}>
  默认边距
</Text>
```

***

### 2. 统一边距

```ts
padding: 8
```

为所有边设置相同的数值边距。

#### 示例：

```tsx
<VStack padding={12}>
  <Text>统一边距</Text>
</VStack>
```

***

### 3. 指定边距对象

可以分别设置特定方向的边距。

```ts
padding: {
  horizontal: 16,
  vertical: 8
}
```

#### 可用属性说明：

| 属性名          | 含义说明                           |
| ------------ | ------------------------------ |
| `horizontal` | 同时设置 `leading` 和 `trailing` 边距 |
| `vertical`   | 同时设置 `top` 和 `bottom` 边距       |
| `leading`    | 设置前导边距（在 LTR 语言中为左侧）           |
| `trailing`   | 设置尾部边距（在 LTR 语言中为右侧）           |
| `top`        | 设置顶部边距                         |
| `bottom`     | 设置底部边距                         |

每个值可以是具体数值，也可以是 `true`，`true` 表示使用系统默认边距。

#### 示例：

```tsx
<Text
  padding={{
    top: 10,
    bottom: 10,
    horizontal: 16
  }}
>
  自定义边距
</Text>
```

#### 使用 `true` 设置特定边：

```tsx
<Text
  padding={{
    top: true,
    horizontal: 12
  }}
>
  混合边距
</Text>
```

***

## 注意事项

- `padding` 不会直接改变视图内容的大小，但会影响它与外部内容之间的间距。
- 可以灵活组合 `horizontal` / `vertical` 与 `leading` / `top` 等单项配置，单项配置会覆盖对应方向的组合配置。
- 合理使用 `padding` 能提升界面排版的整洁性与可读性。
