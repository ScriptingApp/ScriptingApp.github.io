# 请求结构化数据

`requestStructuredData` 用于向 Assistant 请求**严格符合指定 JSON Schema 的结构化 JSON 数据**。
该 API 适合在你需要**可预测、可直接用于程序逻辑**的数据结果时使用，而不是自由文本。

典型使用场景包括：

- 从自然语言中提取结构化字段
- 解析发票、收据、账单、票据
- 生成配置对象、规则数据
- 在不同 AI Provider / Model 之间获得一致的数据结构

***

## 支持的 JSON Schema 类型

Scripting 提供了一套轻量级、跨模型可用的 Schema 描述方式，由三种基础类型组成。

### Primitive（基础类型）

```ts
type JSONSchemaPrimitive = {
  type: "string" | "number" | "boolean"
  required?: boolean
  description: string
}
```

***

### Object（对象类型）

```ts
type JSONSchemaObject = {
  type: "object"
  properties: Record<string, JSONSchemaType>
  required?: boolean
  description: string
}
```

***

### Array（数组类型）

```ts
type JSONSchemaArray = {
  type: "array"
  items: JSONSchemaType
  required?: boolean
  description: string
}
```

***

## API 定义

### 不包含图片输入

```ts
function requestStructuredData<R>(
  prompt: string,
  schema: JSONSchemaArray | JSONSchemaObject,
  options?: {
    provider: Provider
    modelId?: string
  }
): Promise<R>
```

***

### 包含图片输入

```ts
function requestStructuredData<R>(
  prompt: string,
  images: string[],
  schema: JSONSchemaArray | JSONSchemaObject,
  options?: {
    provider: Provider
    modelId?: string
  }
): Promise<R>
```

***

## 参数说明

### prompt

- 类型：`string`
- 必填
- 向模型说明**需要解析或生成什么结构化数据**
- 强烈建议在 prompt 中明确：

  - 时间格式（如 ISO-8601）
  - 金额是否为纯数字
  - 缺失字段的处理规则

***

### images（可选）

- 类型：`string[]`
- 每一项必须是 Data URI，例如：

```text
data:image/png;base64,iVBORw0KGgoAAAANS...
```

- 并非所有 Provider / Model 都支持图片输入
- 图片数量过多可能导致请求失败

***

### schema

- 类型：`JSONSchemaArray | JSONSchemaObject`
- 必填
- 定义模型**唯一允许返回的 JSON 结构**
- 每一个字段都应提供清晰的 `description`，这是保证结果稳定的关键

***

### options.provider

- 类型：`Provider`
- 可选，未指定时使用 Assistant 当前默认 Provider
- 支持：

  - `"openai"`
  - `"gemini"`
  - `"anthropic"`
  - `"deepseek"`
  - `"openrouter"`
  - `{ custom: string }`

***

### options.modelId（可选）

- 类型：`string`
- 指定具体模型 ID
- 必须与 Provider 实际支持的模型匹配
- 未指定时使用 Provider 默认模型

***

## 返回值

```ts
Promise<R>
```

- `R` 为调用方声明的泛型类型
- 返回结果应严格符合 Schema 描述
- 若模型无法生成合法结构，Promise 将被 reject

***

## 使用示例

### 示例一：解析票据 / 收据，提取消费项目、时间和金额

该示例演示如何将一段票据文本解析为结构化数据，包括：

- 整体消费时间（`purchasedAt`）
- 币种（`currency`）
- 消费项目列表（`items`）

  - 项目名称
  - 项目时间（若无则为空）
  - 金额
- 合计金额（`total`）

```ts
type ReceiptItem = {
  name: string
  time: string
  amount: number
}

type ReceiptParsed = {
  purchasedAt: string
  currency: string
  items: ReceiptItem[]
  total: number
}

const receiptText = `
Star Coffee
2026-01-08 14:23
Latte (Large)   $5.50
Blueberry Muffin $3.20
Tax             $0.79
Total           $9.49
`

const parsed = await Assistant.requestStructuredData<ReceiptParsed>(
  [
    "请分析以下票据文本，并提取结构化信息：",
    "- purchasedAt：整体消费时间，使用 ISO-8601 格式，若无法判断则返回空字符串",
    "- currency：币种代码（如 USD / EUR / CNY），若无法判断则返回空字符串",
    "- items：仅包含实际消费项目，不包含税费、合计等行",
    "  - name：项目名称",
    "  - time：项目级时间，若无则返回空字符串",
    "  - amount：数值类型的金额",
    "- total：合计金额，若无则返回 -1",
    "",
    "票据内容：",
    receiptText
  ].join("\n"),
  {
    type: "object",
    description: "票据解析结果",
    properties: {
      purchasedAt: {
        type: "string",
        description: "整体消费时间（ISO-8601），若无则为空字符串"
      },
      currency: {
        type: "string",
        description: "币种代码，若无法判断则为空字符串"
      },
      items: {
        type: "array",
        description: "消费项目列表（不包含税费、合计等）",
        items: {
          type: "object",
          description: "单个消费项目",
          properties: {
            name: {
              type: "string",
              description: "项目名称"
            },
            time: {
              type: "string",
              description: "项目时间（ISO-8601），若无则为空字符串"
            },
            amount: {
              type: "number",
              description: "项目金额"
            }
          }
        }
      },
      total: {
        type: "number",
        description: "合计金额，若不存在则为 -1"
      }
    }
  },
  {
    provider: "openai"
  }
)

// 建议在业务层将空字符串 / -1 归一化为 null
console.log(parsed)
```

***

### 示例二：生成数组结构

```ts
type Expense = {
  name: string
  amount: number
}

const expenses = await Assistant.requestStructuredData<Expense[]>(
  "列出三项常见的日常支出及其大致金额",
  {
    type: "array",
    description: "支出列表",
    items: {
      type: "object",
      description: "单项支出",
      properties: {
        name: {
          type: "string",
          description: "支出名称"
        },
        amount: {
          type: "number",
          description: "金额"
        }
      }
    }
  },
  {
    provider: "gemini"
  }
)
```

***

### 示例三：结合图片生成结构化结果

```ts
type ImageSummary = {
  description: string
  containsText: boolean
}

const summary = await Assistant.requestStructuredData<ImageSummary>(
  "分析这张图片的主要内容",
  ["data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD..."],
  {
    type: "object",
    description: "图片分析结果",
    properties: {
      description: {
        type: "string",
        description: "图片内容描述"
      },
      containsText: {
        type: "boolean",
        description: "是否包含可识别文本"
      }
    }
  },
  {
    provider: "openai"
  }
)
```

***

## 使用建议与注意事项

- 当返回结果用于业务逻辑时，优先使用 `requestStructuredData`
- Schema 描述越明确，结果越稳定
- 复杂业务规则不要放在 Schema 中，应由业务代码处理
