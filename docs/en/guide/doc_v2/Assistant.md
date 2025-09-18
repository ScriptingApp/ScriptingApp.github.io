---
title: Assistant
---
The `Assistant` module provides a powerful API that allows users to request structured JSON data from the assistant. This functionality can be used for automation tasks such as extracting bill details, categorizing expenses, or parsing text data.

---

## `isAvailable` Variable

### Description

Indicates whether the Assistant API is available.

* This status depends on the selected AI provider and whether a valid API Key is configured.
* If the appropriate API Key is not provided, the Assistant API will be unavailable.

---

## `requestStructuredData` Method

### Description

`requestStructuredData` allows users to send a text prompt to the assistant and receive structured data in JSON format based on a defined schema.

### Syntax

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

### Parameters

* `prompt` (`string`):
  The natural language prompt describing the task or content to be parsed.

* `schema` (`JSONSchemaArray | JSONSchemaObject`):
  A schema describing the structure of the expected output in JSON format.

* `options` *(optional)*:

  * `provider`:
    Specifies the AI provider to use. Supported values:

    * `"openai"`
    * `"gemini"`
    * `"anthropic"`
    * `"deepseek"`
    * `"pollinations"`
    * `{ custom: string }`: Use a custom provider with the given name.
  * `modelId`:
    The model identifier for the selected provider. You must ensure the specified ID matches a model supported by that provider (e.g., `"gpt-4-turbo"` for OpenAI, or `"gemini-1.5-pro"` for Gemini). If not specified, the app will use the default model configured for the provider.

### Return Value

Returns a `Promise` resolving to structured JSON data that matches the `schema` definition, with a type of `R`.

---

## JSON Schema Definition

The `schema` parameter defines the expected shape of the JSON response.

### `JSONSchemaType`

```ts
type JSONSchemaType = JSONSchemaPrimitive | JSONSchemaArray | JSONSchemaObject
```

#### Primitive

```ts
type JSONSchemaPrimitive = {
  type: "string" | "number" | "boolean"
  required?: boolean
  description: string
}
```

#### Array

```ts
type JSONSchemaArray = {
  type: "array"
  items: JSONSchemaType
  required?: boolean
  description: string
}
```

#### Object

```ts
type JSONSchemaObject = {
  type: "object"
  properties: Record<string, JSONSchemaType>
  required?: boolean
  description: string
}
```

---

## Example: Parsing Bill Information

Suppose you want to extract details from a bill:

```ts
const someBillDetails = `
- Amount: $15.00
- Date: 2024-03-11 14:30
- Location: City Center Parking Lot
- Category: Parking
`

const prompt = `Please parse the following bill and output the structured data: ${someBillDetails}`

const schema: JSONSchemaObject = {
  type: "object",
  properties: {
    totalAmount: { 
      type: "number",
      required: true,
      description: "Total bill amount"
    },
    category: {
      type: "string",
      required: true,
      description: "Bill category"
    },
    date: {
      type: "string",
      required: false,
      description: "Bill date"
    },
    location: {
      type: "string",
      required: false,
      description: "Bill location"
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

### Sample Output

```json
{
  "totalAmount": 15.00,
  "category": "Parking",
  "date": "2024-03-11 14:30",
  "location": "City Center Parking Lot"
}
```

---

## Usage Considerations

1. **Define a clear `schema`**
   Ensure the schema accurately represents the expected data shape.

2. **Use `required` wisely**
   If a field must be present, set `required: true`. Otherwise, it may be omitted.

3. **Choose the right provider and model**
   You can explicitly select providers and models based on their capabilities and pricing.

4. **Handle errors gracefully**
   Always use `try-catch` to manage potential parsing failures.

```ts
try {
  const result = await Assistant.requestStructuredData(prompt, schema, {
    provider: { custom: "my-api" },
    modelId: "my-model"
  })
  console.log("Parsed result:", result)
} catch (err) {
  console.error("Failed to parse structured data:", err)
}
```
