---
title: Displaying text
description: Display formatted text.

---
        
The `Text` component is used to display one or more lines of read-only text in the Scripting app. It supports plain text, attributed text (Markdown), and rich text styling.

---

## **Type Definitions**

### `TextProps`
Defines the properties that can be passed to the `Text` component. There are three possible structures for the `TextProps` type:

1. **Plain Text Props**
   - `children` (optional): 
     - Type: `null | string | number | boolean | Array<string | number | boolean | undefined | null>`
     - Description: The content to render as plain text. Can be a single value or an array of values.
   - Example:
     ```tsx
     <Text>Simple plain text</Text>
     ```

2. **Markdown Text Props**
   - `attributedString` (optional): 
     - Type: `string`
     - Description: Specifies the text content in Markdown format.
   - Example:
     ```tsx
     <Text attributedString="**Bold** _Italic_ [Link](https://example.com)" />
     ```

3. **Rich Text Props**
   - `styledText` (optional): 
     - Type: `StyledText`
     - Description: Specifies rich text content with customizable styles and attributes.
   - Example:
     ```tsx
     const richText: StyledText = {
       font: "title",
       bold: true,
       underlineStyle: "single",
       underlineColor: "#0000FF",
       content: "Rich styled text"
     }
     <Text styledText={richText} />
     ```

---

### `UnderlineStyle`
Defines the available underline styles for rich text:
- `"byWord"`: Underline each word.
- `"double"`: Double underline.
- `"patternDash"`: Dashed underline.
- `"patternDashDot"`: Dash-dot underline.
- `"patternDashDotDot"`: Dash-dot-dot underline.
- `"patternDot"`: Dotted underline.
- `"single"`: Single underline.
- `"thick"`: Thick underline.

---

### `StyledText`
Defines the structure for rich text styling:
- `font` (optional): Specifies the font name. Example: `"title"`, `"body"`.
- `fontDesign` (optional): Customizes the font design. Example: `"serif"`, `"monospaced"`.
- `fontWeight` (optional): Adjusts font weight. Example: `"light"`, `"bold"`.
- `italic` (optional): Adds italic styling. Type: `boolean`.
- `bold` (optional): Adds bold styling. Type: `boolean`.
- `baselineOffset` (optional): Adjusts text's baseline position. Type: `number`.
- `kerning` (optional): Adjusts spacing between characters. Type: `number`.
- `monospaced` (optional): Uses a monospaced font. Type: `boolean`.
- `monospacedDigit` (optional): Ensures consistent width for numeric characters. Type: `boolean`.
- `underlineColor` (optional): Color for the underline. Type: `Color`.
- `underlineStyle` (optional): Style for the underline. Type: `UnderlineStyle`.
- `strokeColor` (optional): Color for the text stroke. Type: `Color`.
- `strokeWidth` (optional): Width of the text stroke. Type: `number`.
- `strikethroughColor` (optional): Color for the strikethrough. Type: `Color`.
- `strikethroughStyle` (optional): Style for the strikethrough. Type: `UnderlineStyle`.
- `foregroundColor` (optional): Text color. Type: `Color`.
- `backgroundColor` (optional): Background color for the text. Type: `Color`.
- `content` (required): Specifies the text content. Can be a string or an array of strings and `StyledText` objects.
- `link` (optional): URL to linkify the text. Type: `string`.
- `onTapGesture` (optional): A function to execute when the text is tapped. Type: `() => void`.

---

## **`Text` Component**

### **Description**
A view that displays one or more lines of read-only text. The content can be styled using the properties in `TextProps`.

### **Example Usages**

1. **Plain Text**
   ```tsx
   <Text font="title">
     Hello world!
   </Text>
   ```

2. **Markdown Text**
   ```tsx
   <Text attributedString="This is **bold**, _italic_, and a [link](https://example.com)." />
   ```

3. **Rich Text**
   ```tsx
   const richText: StyledText = {
     font: "body",
     bold: true,
     underlineStyle: "single",
     underlineColor: "#00FF00",
     foregroundColor: "#FF0000",
     content: [
       "Part 1, ",
       {
         content: "Styled",
         italic: true,
         strokeColor: "#0000FF",
         strokeWidth: 2
       },
       ", Part 2"
     ]
   }

   <Text styledText={richText} />
   ```

---

## Notes
- **Default Font:** When `font` is not specified, the default system font is used.
- **Performance:** For dynamic or frequently updating content, ensure the `styledText` object remains immutable to avoid unnecessary re-renders.
- **Tap Gestures:** Use the `onTapGesture` property within `StyledText` to add interactivity.
