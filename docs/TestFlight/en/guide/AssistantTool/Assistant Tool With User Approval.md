---
title: Assistant Tool With User Approval
description: Learn how to implement an Assistant Tool with user approval.
tag: PRO
---

The approval-required AssistantTools typically involve **privacy, permissions, data modification, or irreversible actions**, and therefore must obtain explicit user consent before execution.

---

## When Approval Is Required

An AssistantTool **must** use the approval model if it meets any of the following criteria:

* Accesses user-private data (location, photos, contacts, calendar, health data, etc.)
* Triggers system permission prompts
* Modifies, deletes, or batch-writes user files
* Produces long-lasting or irreversible effects
* Requires the user to understand and confirm what will happen before execution

The purpose of approval is **informed consent**, not blocking functionality.

---

## `assistant_tool.json` Configuration

Approval-required tools must explicitly declare approval behavior:

```json
{
  "displayName": "Request Current Location",
  "id": "request_current_location",
  "description": "Requests the user's current location one time.",
  "icon": "location.fill",
  "color": "systemBlue",
  "parameters": [],
  "requireApproval": true,
  "autoApprove": true,
  "scriptEditorOnly": false
}
```

### Key Fields

* `requireApproval: true`
  Indicates that the tool must enter the approval flow before execution (either manual approval or auto-approval).

* `autoApprove` (**tool-level auto-approval permission**)
  `autoApprove` determines **whether this specific tool is allowed to be auto-approved**.

  Auto-approval occurs **only when both conditions are met**:

  1. The user has enabled *auto-approve tools* in the **chat preset**
  2. The tool itself declares `autoApprove: true`

  As a result:

  * User enables auto-approve, tool sets `autoApprove: false` → **manual approval is still required**
  * Tool sets `autoApprove: true`, user has not enabled auto-approve → **manual approval is still required**
  * User enables auto-approve **and** tool sets `autoApprove: true` → **the tool is automatically approved and executed**

* `scriptEditorOnly`
  Determines whether the tool is restricted to the script editor context.

---

## The Two-Phase Approval Model

Approval-required AssistantTools always follow a **two-phase model**:

1. **Approval Request Phase**
   Generates the approval UI (or explanatory text in auto-approval cases).

2. **Execute-With-Approval Phase**
   Executes the actual logic after approval has been granted (manually or automatically).

These phases are implemented using two separate registration APIs.

---

## Registering the Approval Request Function

### Registration

```ts
AssistantTool.registerApprovalRequest<P>(requestFn)
```

### Function Signature

```ts
type AssistantToolApprovalRequestFn<P> = (
  params: P,
  scriptEditorProvider?: ScriptEditorProvider
) => Promise<{
  title?: string
  message: string
  previewButton?: {
    label: string
    action: () => void
  }
  primaryButtonLabel?: string
  secondaryButtonLabel?: string
}>
```

---

### Approval Request Design Principles

* The `message` must clearly explain **what will happen** and **why approval is required**
* Use user-friendly language, not implementation details
* **No side effects must occur in this phase**
* All real operations must be performed in the execute phase

---

### Basic Example

```ts
const approvalRequest: AssistantToolApprovalRequestFn<{}> = async () => {
  return {
    message: "The assistant wants to request your current location.",
    primaryButtonLabel: "Allow",
    secondaryButtonLabel: "Cancel"
  }
}

AssistantTool.registerApprovalRequest(approvalRequest)
```

---

## Using the Preview Button

The `previewButton` allows users to inspect the **expected outcome before approving**.

Appropriate use cases include:

* File modifications (showing diffs)
* Batch edit previews
* Data export summaries

### Example: File Diff Preview

```ts
const approvalRequest: AssistantToolApprovalRequestFn<{ path: string }> = async (
  params,
  editor
) => {
  if (!editor) {
    return { message: "This tool must be used in the script editor." }
  }

  const current = await editor.getFileContent(params.path)

  return {
    message: `The assistant wants to modify ${params.path}.`,
    primaryButtonLabel: "Apply Changes",
    secondaryButtonLabel: "Cancel",
    previewButton: {
      label: "Preview Diff",
      action: () => {
        if (current != null) {
          editor.openDiffEditor(params.path, current + "\n// New content")
        }
      }
    }
  }
}
```

---

## Registering the Execute-With-Approval Function

### Registration

```ts
AssistantTool.registerExecuteToolWithApproval<P>(executeFn)
```

### Function Signature

```ts
type AssistantToolExecuteWithApprovalFn<P> = (
  params: P,
  userAction: UserActionForApprovalRequest,
  scriptEditorProvider?: ScriptEditorProvider
) => Promise<{
  success: boolean
  message: string
}>
```

---

## Handling `userAction`

```ts
type UserActionForApprovalRequest = {
  primaryConfirmed: boolean
  secondaryConfirmed: boolean
}
```

Handling rules:

* Execute real logic **only if** `primaryConfirmed === true`
* `secondaryConfirmed === true` usually means the user cancelled
* If both values are `false`, treat it as an unconfirmed or aborted flow

### Example: Location Request

```ts
const executeWithApproval: AssistantToolExecuteWithApprovalFn<{}> = async (
  params,
  { primaryConfirmed }
) => {
  if (!primaryConfirmed) {
    return {
      success: false,
      message: "User cancelled the location request."
    }
  }

  try {
    const location = await Location.requestCurrent()
    return {
      success: true,
      message: [
        "User location retrieved successfully.",
        `<latitude>${location.latitude}</latitude>`,
        `<longitude>${location.longitude}</longitude>`
      ].join("\n")
    }
  } catch {
    return {
      success: false,
      message: "Failed to retrieve user location."
    }
  }
}
```

---

## `autoApprove` and `userAction` Semantics

When auto-approval actually occurs (user enables auto-approve **and** the tool sets `autoApprove: true`):

* The system skips manual user interaction
* The execute phase is still invoked
* `userAction` represents an equivalent of **primary confirmation** (e.g. `primaryConfirmed: true`)

Therefore, execution logic must **always** gate side effects on `primaryConfirmed`, ensuring compatibility with:

* Manual approval
* Automatic approval
* Explicit cancellation

---

## `scriptEditorProvider` in Approval-Required Tools

* If `scriptEditorOnly: true`:

  * Both approval request and execute functions receive `scriptEditorProvider`
  * Can be used for diffs, file access, lint inspection, etc.

* If `scriptEditorOnly: false`:

  * `scriptEditorProvider` may be `undefined`
  * Editor capabilities must not be assumed

---

## Designing the Execution Message

For approval-required tools, the returned `message` should:

* Clearly indicate success, failure, or cancellation
* Provide structured output when appropriate
* Help the Assistant reason about the result

Examples:

```text
Location request was cancelled by the user.
```

```text
Location retrieved successfully.
<latitude>39.9042</latitude>
<longitude>116.4074</longitude>
```

---

## Using Test Functions

Registered functions return test helpers:

```ts
testApprovalFn({})
testExecuteFn({}, { primaryConfirmed: true, secondaryConfirmed: false })
```

These are intended for validating logic paths and return values, not for simulating real system permission dialogs.

---

## Design Summary

* Approval exists to ensure **informed user consent**
* `autoApprove` is a **tool-level permission**, not a global switch
* Auto-approval requires both user preset and tool consent
* Never perform side effects during the approval request phase
* Always guard execution logic with `primaryConfirmed`
* Use previews whenever file or data changes are involved
