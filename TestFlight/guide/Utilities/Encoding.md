# Encoding

The `Encoding` type defines a set of supported character encodings used by methods like:

- `Data.fromRawString(str, encoding)` — converts a text string into binary data using the specified encoding.
- `Data.toRawString(encoding)` — converts binary data back into a string using the specified encoding.

These encodings allow interoperability with various text formats and systems, ensuring compatibility across languages and platforms.

***

## Available Encodings

| Encoding                | Description                                                                                                                                                                                                                  |
| ----------------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| **"utf-8" / "utf8"**    | UTF-8 (8-bit Unicode Transformation Format). The most common encoding for web and modern text processing. Efficient for ASCII-compatible text and supports all Unicode characters.                                           |
| **"utf-16" / "utf16"**  | UTF-16 (16-bit Unicode Transformation Format). Common in Windows and Apple platforms. Each character typically uses 2 bytes.                                                                                                 |
| **"utf-32" / "utf32"**  | UTF-32 (32-bit Unicode Transformation Format). Fixed 4-byte representation per character, used for direct Unicode code point manipulation.                                                                                   |
| **"ascii"**             | American Standard Code for Information Interchange. Represents English letters, digits, and basic symbols using one byte (0–127).                                                                                            |
| **"iso2022JP"**         | ISO-2022-JP. A Japanese character encoding used for emails and legacy systems. Supports JIS X 0201/0208 character sets.                                                                                                      |
| **"isoLatin1"**         | ISO-8859-1 (Latin-1). Covers Western European languages such as English, French, German, and Spanish.                                                                                                                        |
| **"japaneseEUC"**       | EUC-JP (Extended Unix Code for Japanese). Another Japanese encoding, used mainly in Unix systems.                                                                                                                            |
| **"macOSRoman"**        | Apple’s MacRoman encoding, historically used on classic Mac OS before Unicode adoption.                                                                                                                                      |
| **"nextstep"**          | NextStep encoding (NS encoding). A legacy encoding from NeXTSTEP systems. Rarely used today.                                                                                                                                 |
| **"nonLossyASCII"**     | Non-lossy ASCII encoding. Ensures that any Unicode string can be safely represented as ASCII escape sequences and later restored without data loss.                                                                          |
| **"shiftJIS"**          | Shift-JIS encoding for Japanese text, commonly used on Windows in Japan.                                                                                                                                                     |
| **"symbol"**            | Symbol encoding, used for specialized symbol fonts such as the Symbol typeface.                                                                                                                                              |
| **"unicode"**           | A general alias for Unicode encodings (usually UTF-16). Behaves similarly to `"utf16"`.                                                                                                                                      |
| **"utf16BigEndian"**    | UTF-16 with big-endian byte order. The most significant byte (MSB) comes first.                                                                                                                                              |
| **"utf16LittleEndian"** | UTF-16 with little-endian byte order. The least significant byte (LSB) comes first.                                                                                                                                          |
| **"utf32BigEndian"**    | UTF-32 with big-endian byte order.                                                                                                                                                                                           |
| **"utf32LittleEndian"** | UTF-32 with little-endian byte order.                                                                                                                                                                                        |
| **"windowsCP1250"**     | Windows code page 1250 for Central and Eastern European languages (e.g., Polish, Czech, Hungarian).                                                                                                                          |
| **"windowsCP1251"**     | Windows code page 1251 for Cyrillic scripts (e.g., Russian, Bulgarian, Serbian).                                                                                                                                             |
| **"windowsCP1252"**     | Windows code page 1252 for Western European languages (similar to Latin-1 but includes additional symbols).                                                                                                                  |
| **"windowsCP1253"**     | Windows code page 1253 for Greek language support.                                                                                                                                                                           |
| **"windowsCP1254"**     | Windows code page 1254 for Turkish language support.                                                                                                                                                                         |
| **"gbk"**               | GBK (Guojia Biaozhun Kuozhan). A widely used simplified Chinese character encoding, extending GB2312 to include traditional Chinese and Japanese kana. It is backward compatible with GB2312.                                |
| **"gb18030"**           | GB18030 (National Standard of the People's Republic of China). A superset of GBK and GB2312, and the official mandatory standard in China. Fully compatible with Unicode and capable of representing all Unicode characters. |

***

## Example Usage

### Converting a String to Data and Back

```ts
// Convert a UTF-8 string to binary data
const text = "こんにちは世界"  // "Hello World" in Japanese
const utf8Data = Data.fromRawString(text, "utf-8")

// Convert the binary data back to a string
const decoded = utf8Data.toRawString("utf-8")

console.log(decoded) // Output: こんにちは世界
```

***

### Using a Different Encoding

```ts
// Encode using Shift-JIS (Japanese)
const sjisData = Data.fromRawString("テスト", "shiftJIS")

// Decode back from Shift-JIS
const decodedSJIS = sjisData.toRawString("shiftJIS")
console.log(decodedSJIS) // Output: テスト
```

***

### Example for Windows Encodings

```ts
// Encode text with Central European characters
const text = "Příliš žluťoučký kůň úpěl ďábelské ódy"
const data = Data.fromRawString(text, "windowsCP1250")
const result = data.toRawString("windowsCP1250")
console.log(result)
```

***

## Notes

- When encoding or decoding fails (e.g., using the wrong encoding for the data), the returned string may contain invalid characters (�).
- For most use cases, `"utf-8"` is recommended due to its compatibility and efficiency.
- Legacy encodings such as `"shiftJIS"`, `"iso2022JP"`, and `"windowsCP125x"` are provided for interoperability with older file formats and systems.
