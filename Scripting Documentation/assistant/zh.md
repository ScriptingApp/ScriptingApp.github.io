`Assistant` 模块提供了一套强大的 API，允许用户通过智能助手请求结构化的 JSON 数据。该功能可用于自动化任务，例如提取账单信息、分类支出、解析文本等。

---

## `isAvailable` 变量

### 描述

表示 Assistant API 当前是否可用。

* 此状态取决于所选的 AI 提供商及其 API 密钥是否已配置。
* 如果未提供有效的 API Key，Assistant API 将无法使用。

---

## `requestStructuredData` 方法

### 描述

`requestStructuredData` 允许用户发送自然语言提示，并根据定义好的 JSON Schema 接收结构化数据响应。

### 语法

```ts
function requestStructuredData<R>(
  prompt: string,
  schema: JSONSchemaArray | JSONSchemaObject,
  options?: {
    provider: "openai" | "gemini" | "anthropic" | "deepseek" | "pollinations" | { custom: string }
    modelId?: string
  }
): Promise<R>
```

### 参数说明

* `prompt` (`string`)：
  自然语言提示，用于描述要解析的内容或任务。

* `schema` (`JSONSchemaArray | JSONSchemaObject`)：
  定义返回 JSON 数据结构的模式。

* `options`（可选）：

  * `provider`：
    指定要使用的 AI 提供商。支持以下值：

    * `"openai"`：使用 OpenAI 模型（如 GPT-4）
    * `"gemini"`：使用 Google Gemini
    * `"anthropic"`：使用 Claude 系列
    * `"deepseek"`：使用 DeepSeek 模型
    * `"pollinations"`：使用 Pollinations 模型
    * `{ custom: string }`：指定自定义的 API 提供商名称

  * `modelId`：
    指定提供商对应的模型 ID（如 `"gpt-4-turbo"`、`"gemini-1.5-pro"` 等）。如果未指定，将使用 app 中当前默认模型。

### 返回值

返回一个 `Promise`，解析为符合 `schema` 所定义结构的 JSON 数据，类型为 `R`。

---

## JSON Schema 定义

`schema` 参数定义了返回数据的结构类型：

### `JSONSchemaType`

```ts
type JSONSchemaType = JSONSchemaPrimitive | JSONSchemaArray | JSONSchemaObject
```

#### 原始类型（Primitive）

```ts
type JSONSchemaPrimitive = {
  type: "string" | "number" | "boolean"
  required?: boolean
  description: string
}
```

#### 数组类型（Array）

```ts
type JSONSchemaArray = {
  type: "array"
  items: JSONSchemaType
  required?: boolean
  description: string
}
```

#### 对象类型（Object）

```ts
type JSONSchemaObject = {
  type: "object"
  properties: Record<string, JSONSchemaType>
  required?: boolean
  description: string
}
```

---

## 示例：提取账单信息

假设你有一段账单文本，想要提取金额、日期、类别和地点：

```ts
const someBillDetails = `
- 金额：$15.00
- 日期：2024-03-11 14:30
- 地点：城市中心停车场
- 类别：停车
`

const prompt = `请解析以下账单信息并输出结构化数据：${someBillDetails}`

const schema: JSONSchemaObject = {
  type: "object",
  properties: {
    totalAmount: {
      type: "number",
      required: true,
      description: "账单总金额"
    },
    category: {
      type: "string",
      required: true,
      description: "账单类别"
    },
    date: {
      type: "string",
      required: false,
      description: "账单日期"
    },
    location: {
      type: "string",
      required: false,
      description: "账单地点"
    }
  }
}

const data = await Assistant.requestStructuredData(
  prompt,
  schema,
  {
    provider: "openai",
    modelId: "gpt-4-turbo"
  }
)

console.log(data)
```

### 可能的输出结果：

```json
{
  "totalAmount": 15.00,
  "category": "停车",
  "date": "2024-03-11 14:30",
  "location": "城市中心停车场"
}
```

---

## 使用注意事项

1. **确保 `schema` 定义合理**
   返回的数据结构必须与定义的 schema 匹配，否则可能解析失败。

2. **合理设置 `required` 字段**
   对于必须存在的字段，务必设置 `required: true`，可选字段可省略。

3. **明确选择 provider 和 modelId**
   如需使用特定模型（如 GPT-4），应通过 `options` 参数指定提供商和模型 ID。

4. **建议加入错误处理逻辑**

```ts
try {
  const result = await Assistant.requestStructuredData(prompt, schema, {
    provider: { custom: "my-ai-backend" },
    modelId: "my-custom-model"
  })
  console.log("解析结果：", result)
} catch (err) {
  console.error("解析失败：", err)
}
```
