---
title: requestStructuredData
tag: PRO
---

`requestStructuredData` requests **structured JSON output** from the assistant that conforms to a provided JSON schema.
This API is designed for workflows where you want a predictable, programmatically usable result rather than free-form text.

Common use cases include:

* Extracting structured fields from natural language
* Parsing invoices, receipts, and tickets
* Generating configuration objects
* Normalizing data across different AI providers/models

---

## Supported JSON Schema Types

Scripting defines a lightweight schema structure with three building blocks.

### Primitive

```ts
type JSONSchemaPrimitive = {
  type: "string" | "number" | "boolean"
  required?: boolean
  description: string
}
```

---

### Object

```ts
type JSONSchemaObject = {
  type: "object"
  properties: Record<string, JSONSchemaType>
  required?: boolean
  description: string
}
```

---

### Array

```ts
type JSONSchemaArray = {
  type: "array"
  items: JSONSchemaType
  required?: boolean
  description: string
}
```

---

## API Signatures

### Without images

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

### With images

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

---

## Parameters

### prompt

* Type: `string`
* Required
* The instruction to the model describing what to extract or generate.
* For best reliability, explicitly specify:

  * expected formats (e.g., ISO date)
  * currency rules
  * how to handle missing fields

### images (optional)

* Type: `string[]`
* Each item must be a **data URI**, e.g. `data:image/png;base64,...`
* Not all providers/models support images.
* Avoid passing too many images to reduce failure risk.

### schema

* Type: `JSONSchemaArray | JSONSchemaObject`
* Required
* Defines the **only acceptable** JSON structure for the response.
* Every field should have a clear `description` to guide the model.

### options.provider

* Type: `Provider`
* Optional (uses the default configured provider if omitted)
* Supported:

  * `"openai" | "gemini" | "anthropic" | "deepseek" | "openrouter" | { custom: string }`

### options.modelId (optional)

* Type: `string`
* Must match a model actually supported by the chosen provider.
* If omitted, Scripting uses the provider’s default model.

---

## Return Value

```ts
Promise<R>
```

* `R` is the generic type you provide.
* The resolved value is expected to match your schema.
* The promise rejects if the assistant cannot return a valid structured result.

---

## Examples

### Example 1: Parse a receipt/bill into line items (time + amount)

This example asks the assistant to analyze a textual receipt and extract:

* receipt time (`purchasedAt`)
* line items (`items[]`)

  * item name
  * item time (if present; otherwise null)
  * amount
* total amount

```ts
type ReceiptItem = {
  name: string
  time: string | null
  amount: number
}

type ReceiptParsed = {
  purchasedAt: string | null
  currency: string | null
  items: ReceiptItem[]
  total: number | null
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
    "Analyze the receipt text below and extract:",
    "- purchasedAt: the purchase date/time in ISO-8601 if possible",
    "- currency: currency code if you can infer it (otherwise null)",
    "- items: only actual purchasable items (exclude tax/total lines)",
    "  - name: item name",
    "  - time: item-level time if present, otherwise null",
    "  - amount: numeric amount",
    "- total: numeric total if present, otherwise null",
    "",
    "Receipt:",
    receiptText
  ].join("\n"),
  {
    type: "object",
    description: "Parsed receipt content",
    properties: {
      purchasedAt: {
        type: "string",
        description: "Purchase date/time in ISO-8601 format if available, otherwise an empty string"
      },
      currency: {
        type: "string",
        description: "Currency code like USD/EUR/CNY if inferable, otherwise an empty string"
      },
      items: {
        type: "array",
        description: "Purchased line items (exclude tax/total/subtotal/service fee lines)",
        items: {
          type: "object",
          description: "A single purchased item line",
          properties: {
            name: {
              type: "string",
              description: "Item name"
            },
            time: {
              type: "string",
              description: "Item-level time in ISO-8601 if available, otherwise an empty string"
            },
            amount: {
              type: "number",
              description: "Item amount as a number"
            }
          }
        }
      },
      total: {
        type: "number",
        description: "Total amount if present, otherwise -1"
      }
    }
  },
  {
    provider: "openai"
  }
)

// Post-processing suggestion:
// Treat "" as null for purchasedAt/currency/time, and -1 as null for total.
console.log(parsed)
```

---

### Example 2: Generate an array

```ts
type Expense = {
  name: string
  amount: number
}

const expenses = await Assistant.requestStructuredData<Expense[]>(
  "List three common daily expenses with estimated amounts.",
  {
    type: "array",
    description: "A list of expenses",
    items: {
      type: "object",
      description: "A single expense item",
      properties: {
        name: { type: "string", description: "Expense name" },
        amount: { type: "number", description: "Estimated amount" }
      }
    }
  },
  { provider: "gemini" }
)
```

---

### Example 3: Use images + schema

```ts
type ImageSummary = {
  description: string
  containsText: boolean
}

const summary = await Assistant.requestStructuredData<ImageSummary>(
  "Analyze the image and summarize the main content.",
  ["data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD..."],
  {
    type: "object",
    description: "Image analysis result",
    properties: {
      description: { type: "string", description: "What the image shows" },
      containsText: { type: "boolean", description: "Whether readable text exists" }
    }
  },
  { provider: "openai" }
)
```

---

## Best Practices

* Make the schema explicit and descriptive; ambiguous schemas lead to unstable results.
* Prefer `requestStructuredData` over parsing free-form text when your output is used by program logic.
* For business-critical extraction (e.g., finance/receipts), add strict formatting rules in `prompt`.
