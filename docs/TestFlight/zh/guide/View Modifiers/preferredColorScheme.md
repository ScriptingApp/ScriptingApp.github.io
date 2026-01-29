---
title: 首选配色模式
description: 指定该视图层级使用的系统配色模式（浅色或深色）。

---

指定该视图层级使用的系统配色模式（浅色或深色）。通常用于控制系统覆盖元素的显示样式。

### 类型

```ts
preferredColorScheme?: "light" | "dark"
```

### 示例

```tsx
<NavigationStack>
  <List preferredColorScheme="dark">
    <Text>暗色模式视图</Text>
  </List>
</NavigationStack>
```