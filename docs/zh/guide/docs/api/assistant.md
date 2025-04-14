# Assistant

`Assistant` 模块提供了强大的 API，使您能够从助手请求结构化的 JSON 数据。此功能可用于自动化任务，例如提取账单详情、分类支出或解析文本数据。

## `isAvailable` 变量

表示 Assistant API 是否可用

-   这个状态根据您当前选择的 AI 提供商以及是否配置了一个可用的 API Key 判断。
-   如何没有提供 API Key，Assistant API 将不可用，尝试调用会失败。

## `requestStructuredData` 方法

### 方法描述

`requestStructuredData` 允许用户向助手发送文本提示，并根据定义的 JSON 结构模式获取结构化数据。

### 语法

```ts
function requestStructuredData<R>(prompt: string, schema: JSONSchemaArray | JSONSchemaObject): Promise<R>;
```

### 参数

-   `prompt` (`string`)：提供给助手的输入提示，描述要解析的内容。
-   `schema` (`JSONSchemaArray | JSONSchemaObject`)：预期的输出 JSON 结构模式，定义返回数据的格式。

### 返回值

返回解析为符合 `schema` 定义的结构化 JSON 数据的 `Promise`，数据类型为 `R`。

## JSON 结构模式定义

在 `requestStructuredData` 方法中，`schema` 参数用于定义返回数据的 JSON 结构，其数据类型如下：

### `JSONSchemaType`

```ts
type JSONSchemaType = JSONSchemaPrimitive | JSONSchemaArray | JSONSchemaObject;
```

基础数据类型定义：

```ts
type JSONSchemaPrimitive = {
    type: "string" | "number" | "boolean";
    required?: boolean;
    description: string;
};
```

数组类型定义：

```ts
type JSONSchemaArray = {
    type: "array";
    items: JSONSchemaType;
    required?: boolean;
    description: string;
};
```

对象类型定义：

```ts
type JSONSchemaObject = {
    type: "object";
    properties: Record<string, JSONSchemaType>;
    required?: boolean;
    description: string;
};
```

### 示例

```ts
const schema: JSONSchemaObject = {
    type: "object",
    properties: {
        totalAmount: {
            type: "number",
            required: true,
            description: "账单总金额",
        },
        category: {
            type: "string",
            required: true,
            description: "账单分类",
        },
        date: {
            type: "string",
            required: false,
            description: "账单日期",
        },
        location: {
            type: "string",
            required: false,
            description: "账单发生地点",
        },
    },
};
```

## 示例用法

### 解析账单信息

假设我们有一张账单，需要提取其中的金额、日期、分类和地点信息。

```ts
const someBillDetails = `
- 金额: $15.00
- 日期: 2024-03-11 14:30
- 位置: 市中心停车场
- 分类: 停车费
`;

const prompt = `请解析以下账单并输出结构化数据: ${someBillDetails}`;

const data = await Assistant.requestStructuredData(prompt, schema);
console.log(data);
```

### 可能的返回结果

```json
{
    "totalAmount": 15.0,
    "category": "停车费",
    "date": "2024-03-11 14:30",
    "location": "市中心停车场"
}
```

## 使用注意事项

1. **确保 `schema` 定义准确**：JSON 结构模式应与实际需要的数据格式一致。
2. **`required` 属性的使用**：如果某字段必须返回，请将 `required` 设为 `true`。
3. **尽可能提供清晰的 `prompt`**：更详细的 `prompt` 可提高助手返回数据的准确性。
4. **错误处理**：`requestStructuredData` 返回 `Promise`，应使用 `try-catch` 处理可能的错误。

示例错误处理：

```ts
try {
    const data = await Assistant.requestStructuredData(prompt, schema);
    console.log("解析结果:", data);
} catch (error) {
    console.error("解析失败:", error);
}
```
