# Assistant Conversation APIs PRO

The Conversation APIs are used to **start, control, and present a system-hosted Assistant chat session**.
A conversation corresponds to a **fully managed chat page**, where Scripting handles the UI, streaming output, provider selection, and message lifecycle.

Key differences from other Assistant APIs:

- Conversation APIs are designed for **interactive chat experiences**
- UI, streaming, and message handling are managed by the system
- Developers control **when the conversation starts, ends, and is shown**

***

## Conversation Lifecycle

A typical conversation follows this lifecycle:

1. `startConversation` — create a conversation (optionally auto-start)
2. `present` — display the Assistant chat page
3. User interacts with the Assistant
4. `dismiss` — temporarily hide the chat page (conversation continues)
5. `present` — show the same conversation again
6. `stopConversation` — terminate the conversation and release resources

Important rules:

- **Only one active conversation can exist at a time**
- Calling `startConversation` while a conversation is active throws an error
- Calling `stopConversation` automatically calls `dismiss`

***

## startConversation

### API Definition

```ts
function startConversation(options: {
  message: string
  images?: UIImage[]
  autoStart?: boolean
  systemPrompt?: string
  modelId?: string
  provider?: Provider
}): Promise<void>
```

***

### Parameters

#### options.message

- Type: `string`
- Required
- The **initial user message** of the conversation
- Equivalent to the first user input in the chat UI

***

#### options.images (optional)

- Type: `UIImage[]`
- Sent together with the initial message
- Common use cases:

  - Image analysis
  - Starting a conversation from a photo or screenshot

***

#### options.autoStart (optional)

- Type: `boolean`
- Default: `false`

Behavior:

- `true`

  - The assistant immediately starts generating a reply
- `false`

  - The conversation is created but not sent automatically
  - Typically used when the user should press “Send” manually

***

#### options.systemPrompt (optional)

- Type: `string`

Behavior:

- If omitted:

  - The built-in Scripting Assistant system prompt is used
  - Assistant Tools are available
- If provided:

  - Fully replaces the default system prompt
  - **Assistant Tools are disabled**

Typical use cases:

- Creating a highly customized chat role
- Running the model without any tool access

***

#### options.modelId (optional)

- Type: `string`
- Specifies the model to use for this conversation
- Users may still change the model in the chat UI (if allowed)

***

#### options.provider (optional)

- Type: `Provider`
- Specifies the default provider for the conversation
- Users may change the provider in the chat UI (if allowed)

***

### Return Value

```ts
Promise<void>
```

- Resolves when the conversation is successfully created
- Rejects if a conversation already exists

***

## present

### API Definition

```ts
function present(): Promise<void>
```

***

### Behavior

- Presents the Assistant chat page for the current conversation
- If the page is already presented, calling this has no effect
- Can be called:

  - After `startConversation`
  - After `dismiss` to re-present the same conversation

***

### Return Value

```ts
Promise<void>
```

- Resolves when the chat page is dismissed by the user

***

## dismiss

### API Definition

```ts
function dismiss(): Promise<void>
```

***

### Behavior

- Dismisses the Assistant chat page
- **Does not stop the conversation**
- Conversation state and history are preserved

Typical use cases:

- Temporarily hiding the chat UI
- Navigating to another page or task

***

### Return Value

```ts
Promise<void>
```

***

## stopConversation

### API Definition

```ts
function stopConversation(): Promise<void>
```

***

### Behavior

- Fully terminates the current conversation
- Automatically calls `dismiss`
- Cleans up conversation state and resources
- After calling this, a new conversation may be started

***

### Return Value

```ts
Promise<void>
```

***

## Conversation State Flags

### Assistant.isAvailable

```ts
const isAvailable: boolean
```

- Indicates whether the current user has access to the Assistant
- If `false`, all Conversation APIs are unavailable

***

### Assistant.isPresented

```ts
const isPresented: boolean
```

- Indicates whether the Assistant chat page is currently presented

***

### Assistant.hasActiveConversation

```ts
const hasActiveConversation: boolean
```

- Indicates whether there is an active conversation
- Commonly used to guard against duplicate `startConversation` calls

***

## Examples

### Example 1: Typical usage

```ts
await Assistant.startConversation({
  message: "Help me summarize this article.",
  autoStart: true
})

await Assistant.present()
```

***

### Example 2: Create a conversation without auto-sending

```ts
await Assistant.startConversation({
  message: "Let's discuss system architecture design.",
  autoStart: false
})

await Assistant.present()
// User manually presses Send in the UI
```

***

### Example 3: Dismiss and re-present the same conversation

```ts
await Assistant.startConversation({
  message: "Analyze this image.",
  images: [image],
  autoStart: true
})

await Assistant.present()

await Assistant.dismiss()

// Later, re-present the same conversation
await Assistant.present()
```

***

### Example 4: Stop the current conversation and start a new one

```ts
if (Assistant.hasActiveConversation) {
  await Assistant.stopConversation()
}

await Assistant.startConversation({
  message: "Start a new topic.",
  autoStart: true
})

await Assistant.present()
```

***

## Best Practices

- Treat Conversation APIs as a **managed chat UI**
- Do not mix Conversation APIs with `requestStreaming` in the same flow
- Always check `hasActiveConversation` before calling `startConversation`
- For one-shot or data-oriented tasks, prefer:

  - `requestStructuredData`
  - `requestStreaming`
- Use Conversation APIs when continuous user interaction is required

***

## Design Boundaries

- Conversation APIs are not suitable for headless or background tasks
- Not intended for fully automated workflows
- Not ideal when you need strict control over prompts, tokens, or output format
