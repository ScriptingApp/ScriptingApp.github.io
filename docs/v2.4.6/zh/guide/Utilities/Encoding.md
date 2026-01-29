---
title: 编码
description: 该类型定义了支持的字符编码集。

---

`Encoding` 类型定义了可用于文本与二进制数据之间转换的字符编码集。
常用于以下方法：

* `Data.fromRawString(str, encoding)` — 使用指定编码将字符串转换为二进制数据。
* `Data.toRawString(encoding)` — 使用指定编码将二进制数据解码为字符串。

通过这些编码类型，可以在不同系统、语言和文件格式之间正确地读写文本内容。

---

## 可用编码列表

| 编码名称                    | 说明                                                              |
| ----------------------- | --------------------------------------------------------------- |
| **"utf-8" / "utf8"**    | UTF-8（8位 Unicode 转换格式）。目前最常用的文本编码方式，与 ASCII 兼容，几乎支持所有语言字符。      |
| **"utf-16" / "utf16"**  | UTF-16（16位 Unicode 转换格式），广泛用于 Windows 和 Apple 系统，每个字符通常占 2 个字节。 |
| **"utf-32" / "utf32"**  | UTF-32（32位 Unicode 转换格式），每个字符固定使用 4 个字节，适合直接处理 Unicode 码点。      |
| **"ascii"**             | 美国信息交换标准码（ASCII），仅包含英文字母、数字及基础符号（0–127），为最早的文本编码标准。             |
| **"iso2022JP"**         | ISO-2022-JP，日本语编码格式，常用于电子邮件或旧系统中，支持 JIS X 0201/0208 字符集。        |
| **"isoLatin1"**         | ISO-8859-1（Latin-1），覆盖西欧语言，如英语、法语、德语、西班牙语等。                     |
| **"japaneseEUC"**       | EUC-JP（扩展 Unix 编码），另一种日本语编码方式，主要用于 Unix 系统。                     |
| **"macOSRoman"**        | MacRoman 编码，早期 Mac OS 系统使用的本地编码格式，现已较少使用。                       |
| **"nextstep"**          | NeXTSTEP 系统使用的旧编码格式，属于历史遗留类型。                                   |
| **"nonLossyASCII"**     | 无损 ASCII 编码。通过转义序列将任意 Unicode 字符安全地表示为 ASCII，并可无损还原。            |
| **"shiftJIS"**          | Shift-JIS，日本语编码格式，Windows 日本系统中广泛使用。                            |
| **"symbol"**            | Symbol 字体编码，用于符号类字体（如数学符号、特殊字符）。                                |
| **"unicode"**           | Unicode 编码的通用别名（通常等同于 UTF-16）。                                  |
| **"utf16BigEndian"**    | UTF-16 大端序编码（高位字节在前）。                                           |
| **"utf16LittleEndian"** | UTF-16 小端序编码（低位字节在前）。                                           |
| **"utf32BigEndian"**    | UTF-32 大端序编码。                                                   |
| **"utf32LittleEndian"** | UTF-32 小端序编码。                                                   |
| **"windowsCP1250"**     | Windows 代码页 1250，用于中欧和东欧语言（如波兰语、捷克语、匈牙利语）。                      |
| **"windowsCP1251"**     | Windows 代码页 1251，用于西里尔文字（如俄语、保加利亚语、塞尔维亚语）。                      |
| **"windowsCP1252"**     | Windows 代码页 1252，用于西欧语言，与 Latin-1 相似，但包含更多符号。                   |
| **"windowsCP1253"**     | Windows 代码页 1253，用于希腊语。                                         |
| **"windowsCP1254"**     | Windows 代码页 1254，用于土耳其语。                                        |
| **"gbk"**    | GBK（国家标准扩展码），是简体中文常用的字符编码，向下兼容 GB2312，并扩展了繁体字和日文假名，主要用于中国大陆的 Windows 系统。 |
| **"gb18030"**  | GB18030 是中国国家标准编码，兼容 GBK 和 GB2312，支持完整 Unicode 字符集，是目前中国大陆的强制性编码标准。      |

---

## 示例

### 示例一：UTF-8 编码与解码

```ts
import { Data } from 'scripting'

// 使用 UTF-8 将字符串转换为二进制数据
const text = "こんにちは世界" // 日语“你好，世界”
const utf8Data = Data.fromRawString(text, "utf-8")

// 使用 UTF-8 解码回字符串
const decoded = utf8Data.toRawString("utf-8")

console.log(decoded) // 输出: こんにちは世界
```

---

### 示例二：使用 Shift-JIS 编码

```ts
// 使用 Shift-JIS 编码（日本常用编码）
const sjisData = Data.fromRawString("テスト", "shiftJIS")

// 解码回字符串
const decodedSJIS = sjisData.toRawString("shiftJIS")
console.log(decodedSJIS) // 输出: テスト
```

---

### 示例三：Windows 代码页示例

```ts
// 使用中欧字符示例
const text = "Příliš žluťoučký kůň úpěl ďábelské ódy"
const data = Data.fromRawString(text, "windowsCP1250")
const result = data.toRawString("windowsCP1250")
console.log(result)
```

---

## 注意事项

* 若使用了错误的编码进行解码，字符串中可能出现乱码或替代符号（如 “�”）。
* 推荐默认使用 `"utf-8"`，它是最通用、最兼容的编码格式。
* 旧式编码（如 `"shiftJIS"`、`"iso2022JP"`、`"windowsCP125x"`）主要用于与旧文件或系统兼容的场景。
* 在处理网络数据或文件存储时，确保读写双方使用相同的编码格式，避免出现文字乱码。
