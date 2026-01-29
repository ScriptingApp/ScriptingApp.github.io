---
title: 颜色
description: Color API 支持多种颜色格式，包括 HEX 字符串、RGBA 字符串以及预定义的颜色关键字。

---

`Color` API 支持多种颜色格式，包括 HEX 字符串、RGBA 字符串和预定义颜色关键字。它与 SwiftUI 的颜色系统无缝集成，提供鲜艳且可自适应的颜色，用于设计出色的 UI。

---

## `Color` 类型

`Color` 类型可以采用以下三种格式来表示颜色：

1. **HEX 字符串**：标准的十六进制颜色代码。
2. **RGBA 字符串**：类似 CSS 的字符串格式，包含红色、绿色、蓝色以及透明度通道。
3. **关键字颜色**：一组预定义的系统和语义化颜色。

---

### 支持的格式

#### 1. HEX 字符串 (`ColorStringHex`)

- **格式**: `#RRGGBB` 或者 `#RGB`
- **示例**:
  ```tsx
  const primaryColor: Color = "#FF5733"
  const secondaryColor: Color = "#333"
  ```

---

#### 2. RGBA 字符串 (`ColorStringRGBA`)

- **格式**: `rgba(R, G, B, A)`
  - `R`: 红色, 取值范围 0–255
  - `G`: 绿色, 取值范围 0–255
  - `B`: 蓝色, 取值范围 0–255
  - `A`: 透明度, 取值范围 0–1
- **示例**:
  ```tsx
  const transparentBlack: Color = "rgba(0, 0, 0, 0.5)"
  const semiTransparentRed: Color = "rgba(255, 0, 0, 0.8)"
  ```

---

#### 3. 关键字颜色 (`KeywordsColor`)

系统中预定义的颜色，根据当前系统外观（浅色/深色模式）和辅助功能设置进行自适应。这些颜色可以与原生 iOS 应用保持一致的视觉效果。

- **示例**:
  ```tsx
  const systemAccent: Color = "accentColor"
  const systemBackground: Color = "systemBackground"
  const linkColor: Color = "link"
  const customGray: Color = "systemGray4"
  ```

---

### 关键字颜色列表

#### 系统颜色
- `accentColor`
- `systemRed`, `systemGreen`, `systemBlue`, `systemOrange`, `systemYellow`, `systemPink`, `systemPurple`, `systemTeal`, `systemIndigo`, `systemBrown`, `systemMint`, `systemCyan`

#### 语义化颜色
- **标签类 (Labels)**: `label`, `secondaryLabel`, `tertiaryLabel`, `quaternaryLabel`  
- **填充颜色 (Fill Colors)**: `systemFill`, `secondarySystemFill`, `tertiarySystemFill`, `quaternarySystemFill`
- **背景色 (Backgrounds)**:
  - `systemBackground`, `secondarySystemBackground`, `tertiarySystemBackground`
  - `systemGroupedBackground`, `secondarySystemGroupedBackground`, `tertiarySystemGroupedBackground`
- **分割线 (Separators)**: `separator`, `opaqueSeparator`

#### 传统颜色 (Legacy Colors)
- `black`, `darkGray`, `lightGray`, `white`, `gray`, `red`, `green`, `blue`, `cyan`, `yellow`, `magenta`, `orange`, `purple`, `brown`, `clear`

---

### 在 TSX 组件中的使用

```tsx
import { View, Text, VStack } from 'scripting'

function MyView() {
  return (
    <VStack background="systemBackground">
      <Text foregroundStyle="accentColor">
        Welcome to the Scripting App!
      </Text>
    </VStack>
  )
}
```

在这个组件中，使用了自适应的系统颜色，以与 iOS 的外观设置保持一致。

---

### 注意事项
- **性能**: 当使用关键字颜色时，应用会根据系统设置（如深色模式）自动更新颜色。
- **校验**: 若颜色字符串不符合预期格式，运行时可能抛出错误。请确保所使用的颜色字符串是有效的。