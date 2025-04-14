The `Assistant` module provides a powerful API that allows users to request structured JSON data from the assistant. This functionality can be used for automation tasks such as extracting bill details, categorizing expenses, or parsing text data.

## `isAvailable` Variable

### Description
Indicates whether the Assistant API is available.
   * This status depends on the selected AI provider and whether a valid API Key is configured.
   * If the appropriate API Key is not provided, the Assistant API will be unavailable.

## `requestStructuredData` Method

### Description
`requestStructuredData` allows users to send a text prompt to the assistant and receive structured data in JSON format based on a defined schema.

### Syntax
```ts
function requestStructuredData<R>(
  prompt: string,
  schema: JSONSchemaArray | JSONSchemaObject
): Promise<R>
```

### Parameters
- `prompt` (`string`): The input prompt describing the content to be parsed.
- `schema` (`JSONSchemaArray | JSONSchemaObject`): The expected output JSON schema, defining the structure of the returned data.

### Return Value
Returns a `Promise` resolving to structured JSON data that matches the `schema` definition, with a type of `R`.

---

## JSON Schema Definition
The `schema` parameter in the `requestStructuredData` method defines the structure of the returned JSON data, with the following types:

### `JSONSchemaType`
```ts
type JSONSchemaType = JSONSchemaPrimitive | JSONSchemaArray | JSONSchemaObject
```

Primitive data type definition:
```ts
type JSONSchemaPrimitive = {
    type: "string" | "number" | "boolean"
    required?: boolean
    description: string
}
```

Array type definition:
```ts
type JSONSchemaArray = {
    type: "array"
    items: JSONSchemaType
    required?: boolean
    description: string
}
```

Object type definition:
```ts
type JSONSchemaObject = {
    type: "object"
    properties: Record<string, JSONSchemaType>
    required?: boolean
    description: string
}
```

### Example
```ts
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
```

---

## Example Usage

### Parsing Bill Information
Suppose we have a bill, and we need to extract its amount, date, category, and location.

```ts
const someBillDetails = `
- Amount: $15.00
- Date: 2024-03-11 14:30
- Location: City Center Parking Lot
- Category: Parking
`

const prompt = `Please parse the following bill and output the structured data: ${someBillDetails}`

const data = await Assistant.requestStructuredData(
  prompt,
  schema
)
console.log(data)
```

### Possible Output
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
1. **Ensure the `schema` is correctly defined**: The JSON schema should match the expected data format.
2. **Use `required` attributes carefully**: If a field is essential, set `required: true`.
3. **Provide a clear `prompt`**: A detailed `prompt` improves the accuracy of the assistant's response.
4. **Error Handling**: Since `requestStructuredData` returns a `Promise`, handle potential errors using `try-catch`.

Example error handling:
```ts
try {
  const data = await Assistant.requestStructuredData(
    prompt,
    schema
  )
  console.log("Parsed result:", data)
} catch (error) {
  console.error("Parsing failed:", error)
}
```
