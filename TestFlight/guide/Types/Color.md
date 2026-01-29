# Color

The `Color` API supports various color formats, including HEX strings, RGBA strings, and predefined color keywords. It integrates seamlessly with SwiftUI's color system to provide vibrant, adaptive colors for your UI designs.

## `Color` Type

The `Color` type can represent colors in one of three formats:

1. **HEX String**: Standard hexadecimal color codes.
2. **RGBA String**: CSS-like color strings with red, green, blue, and alpha components.
3. **Keyword Colors**: A set of predefined system and semantic colors.

### Supported Formats

#### 1. HEX String (`ColorStringHex`)

- **Format**: `#RRGGBB` or `#RGB`
- **Example**:
  ```tsx
  const primaryColor: Color = "#FF5733"
  const secondaryColor: Color = "#333"
  ```

#### 2. RGBA String (`ColorStringRGBA`)

- **Format**: `rgba(R, G, B, A)`
  - `R`: Red, 0–255
  - `G`: Green, 0–255
  - `B`: Blue, 0–255
  - `A`: Alpha, 0–1 (transparency)
- **Example**:
  ```tsx
  const transparentBlack: Color = "rgba(0, 0, 0, 0.5)"
  const semiTransparentRed: Color = "rgba(255, 0, 0, 0.8)"
  ```

#### 3. Keyword Colors (`KeywordsColor`)

Predefined system colors that adapt to the current system appearance (light or dark mode) and accessibility settings. These colors provide consistency with native iOS apps.

- **Examples**:
  ```tsx
  const systemAccent: Color = "accentColor"
  const systemBackground: Color = "systemBackground"
  const linkColor: Color = "link"
  const customGray: Color = "systemGray4"
  ```

### List of Keyword Colors

#### System Colors

- `accentColor`
- `systemRed`, `systemGreen`, `systemBlue`, `systemOrange`, `systemYellow`, `systemPink`, `systemPurple`, `systemTeal`, `systemIndigo`, `systemBrown`, `systemMint`, `systemCyan`

#### Semantic Colors

- **Labels**: `label`, `secondaryLabel`, `tertiaryLabel`, `quaternaryLabel`
- **Fill Colors**: `systemFill`, `secondarySystemFill`, `tertiarySystemFill`, `quaternarySystemFill`
- **Backgrounds**:
  - `systemBackground`, `secondarySystemBackground`, `tertiarySystemBackground`
  - `systemGroupedBackground`, `secondarySystemGroupedBackground`, `tertiarySystemGroupedBackground`
- **Separators**: `separator`, `opaqueSeparator`

#### Legacy Colors

- `black`, `darkGray`, `lightGray`, `white`, `gray`, `red`, `green`, `blue`, `cyan`, `yellow`, `magenta`, `orange`, `purple`, `brown`, `clear`

### Usage in TSX Components

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

This component uses system adaptive colors to maintain consistency with the iOS appearance.

### Notes

- **Performance**: When using keyword colors, the app ensures the color adapts dynamically to system settings such as Dark Mode.
- **Validation**: Invalid color strings may throw errors during runtime. Ensure your color strings conform to the expected format.
