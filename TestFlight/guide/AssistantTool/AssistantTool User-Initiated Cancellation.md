# AssistantTool User-Initiated Cancellation

To improve the user experience of long-running tools, AssistantTool introduces support for **user-initiated cancellation**.
When a user cancels a tool while it is executing, developers may optionally provide an `onCancel` callback to return partially completed results. If `onCancel` is not implemented, cancellation is handled automatically by the system and no additional logic is required.

This mechanism is particularly suitable for search, analysis, crawling, batch processing, and other multi-step or time-consuming tools.

***

## Capability Overview

The cancellation mechanism introduces the following APIs:

```ts
type OnCancel = () => string | null | undefined

var onCancel: OnCancel | null | undefined

const isCancelled: boolean
```

***

## Core Semantics

### onCancel Is Optional

- Implementing `onCancel` is optional
- Not implementing `onCancel` is a fully valid and supported usage

When `onCancel` is not set:

- If the user clicks Cancel, the tool is marked as cancelled
- Any results returned by the execution function after cancellation are automatically ignored
- The Assistant does not consume or process those results

The outcome is that developers do not need to write any additional logic to handle cancellation unless they explicitly want to return partial results.

***

### Purpose of onCancel

The sole purpose of implementing `onCancel` is to proactively return **partially completed results** when a user cancels execution.

It is an experience optimization, not a required responsibility.

***

## Semantics of isCancelled

- `AssistantTool.isCancelled` becomes `true` immediately after the user cancels
- It can be read at any point during execution
- It is intended to control whether subsequent steps should continue running

Typical uses include breaking loops, skipping expensive operations, and releasing resources early.

***

## When and Where to Register onCancel

`onCancel` must be registered **inside the tool execution function**.

Reasons:

- Each tool execution has its own lifecycle
- After execution completes, the system automatically resets `onCancel` to `null`
- Registering `onCancel` outside the execution function has no effect

Valid locations include:

- `registerExecuteTool`
- `registerExecuteToolWithApproval`

***

## Minimal Example Without onCancel

```ts
const executeTool = async () => {
  await doSomethingSlow()

  return {
    success: true,
    message: "Operation completed."
  }
}
```

Behavior:

- If the user cancels, the tool is marked as cancelled
- The returned result is automatically ignored
- No additional cancellation handling is required

***

## Example With onCancel and Partial Results

```ts
const executeTool = async () => {
  const partialResults: string[] = []

  AssistantTool.onCancel = () => {
    return [
      "Operation was cancelled by the user.",
      "Partial results:",
      ...partialResults
    ].join("\n")
  }

  for (const item of items) {
    if (AssistantTool.isCancelled) break
    const result = await process(item)
    partialResults.push(result)
  }

  return {
    success: true,
    message: partialResults.join("\n")
  }
}
```

Behavior:

- When the user cancels, `onCancel` is invoked immediately
- Partially completed results are returned to the Assistant
- Subsequent execution stops based on `isCancelled`

***

## Typical Use Cases

Good candidates for implementing `onCancel` include:

- Multi-source search and aggregation
- Crawling and parsing multiple documents
- Project-wide scanning and analysis
- Batch computation or generation tasks
- Long-running reasoning or processing pipelines

Cases where `onCancel` is usually unnecessary include:

- Tools that complete almost instantly
- Operations with no meaningful intermediate results
- Tasks where cancellation produces no useful partial output

***

## Return Value Guidelines for onCancel

Return values from `onCancel` follow these rules:

- Returning a `string`
  The string is used as the cancellation message sent to the Assistant

- Returning `null` or `undefined`
  Indicates that no message should be returned (valid but generally not recommended)

Recommended practices:

- Clearly state that the operation was cancelled by the user
- Explicitly label partial output as partial results when applicable

***

## Relationship to the Approval Flow

- `onCancel` applies only during the execution phase
- It does not affect the Approval Request phase
- It works for both manually approved tools and auto-approved tools

Important distinction:

- `secondaryConfirmed`
  Indicates the user declined execution during the approval phase

- `onCancel`
  Indicates the user cancelled during execution after approval

***

## Common Mistakes and Caveats

### Registering onCancel Outside the Execution Function

This is ineffective because the execution context has already ended.

***

### Performing Expensive or Side-Effect Operations in onCancel

`onCancel` should return quickly and must not initiate network requests, file writes, or other side effects.

***

### Ignoring isCancelled During Execution

Even with `onCancel` implemented, long-running logic should explicitly check `isCancelled` to avoid unnecessary resource usage.

***

## Recommended Execution Structure

```ts
const executeTool = async () => {
  const partial = []

  AssistantTool.onCancel = () => {
    return formatPartialResult(partial)
  }

  for (const item of items) {
    if (AssistantTool.isCancelled) break
    const r = await process(item)
    partial.push(r)
  }

  if (AssistantTool.isCancelled) {
    return
  }

  return {
    success: true,
    message: formatFinalResult(partial)
  }
}
```

***

## Design Philosophy

- User cancellation is a normal interaction, not an error
- `onCancel` is an optional enhancement, not a requirement
- Not implementing `onCancel` does not break tool behavior
- The system automatically ignores results after cancellation
- Implement `onCancel` only to provide a more graceful completion experience

***

## Summary

- AssistantTool supports user-initiated cancellation during execution
- `onCancel` allows returning partially completed results
- `isCancelled` enables early termination of execution logic
- Cancellation is safely handled even without custom logic
- Developers are not required to manage cancellation explicitly
