---
title: Assistant Tool Without User Approval
description: Learn how to implement an Assistant Tool without user approval.
tag: PRO
---

Tools without approval are intended for **low-risk, non-sensitive, and side-effect-free operations** that the Assistant can execute immediately.

---

## 1. When to Use Tools Without Approval

Before choosing this model, you should clearly understand its boundaries.

### Suitable Scenarios

Tools without approval are appropriate when the tool:

* Does not access system permissions or private user data
* Does not read or modify sensitive user information
* Does not perform irreversible or destructive operations
* Performs pure logic, computation, or deterministic transformations

Typical examples include:

* Code or text formatting
* Parsing structured data (JSON, YAML, CSV)
* Generating boilerplate or template code
* Safe and predictable edits inside the script editor

---

### Unsuitable Scenarios

Do **not** use tools without approval when the tool:

* Accesses location, photos, contacts, calendar, or similar data
* Writes or overwrites user files in an irreversible way
* Triggers system dialogs or permission requests
* Produces results that are difficult for the user to anticipate

These cases should use **approval-required AssistantTools** (see Document 3).

---

## 2. Configuration in `assistant_tool.json`

For a tool that does not require approval, the configuration must explicitly declare:

```json
{
  "displayName": "Format Script",
  "id": "format_script",
  "description": "Formats the current script files according to the project style.",
  "icon": "wand.and.stars",
  "color": "systemIndigo",
  "parameters": [],
  "requireApproval": false,
  "autoApprove": false,
  "scriptEditorOnly": true
}
```

### Key Fields

* `requireApproval: false`
  Indicates that the tool will execute immediately without showing an approval dialog.

* `autoApprove`
  Typically irrelevant in this mode and can be set to `false`.

* `scriptEditorOnly`
  Determines whether the tool is restricted to the script editor.
  When `true`, the execution function receives a `ScriptEditorProvider`.

---

## 3. Execution Registration API

Tools without approval register a single execution function:

```ts
AssistantTool.registerExecuteTool<P>(executeFn)
```

The corresponding function signature is:

```ts
type AssistantToolExecuteFn<P> = (
  params: P,
  scriptEditorProvider?: ScriptEditorProvider
) => Promise<{
  success: boolean
  message: string
}>
```

---

## 4. Minimal Example (No Parameters)

```ts
type FormatParams = {}

const formatScript: AssistantToolExecuteFn<FormatParams> = async (
  params,
  scriptEditorProvider
) => {
  if (!scriptEditorProvider) {
    return {
      success: false,
      message: "This tool can only be used inside the script editor."
    }
  }

  const files = scriptEditorProvider.getAllFiles()

  for (const file of files) {
    const content = await scriptEditorProvider.getFileContent(file)
    if (!content) continue

    const formatted = content.trim()
    await scriptEditorProvider.updateFileContent(file, formatted)
  }

  return {
    success: true,
    message: "All script files have been formatted successfully."
  }
}

const testFormatTool = AssistantTool.registerExecuteTool(formatScript)
```

---

## 5. Example with Parameters

### Parameter Definition

```ts
type ReplaceParams = {
  searchText: string
  replaceText: string
}
```

### Execution Logic

```ts
const replaceInScripts: AssistantToolExecuteFn<ReplaceParams> = async (
  params,
  scriptEditorProvider
) => {
  if (!scriptEditorProvider) {
    return {
      success: false,
      message: "Script editor context is required."
    }
  }

  const files = scriptEditorProvider.getAllFiles()
  let affectedFiles = 0

  for (const file of files) {
    const content = await scriptEditorProvider.getFileContent(file)
    if (!content) continue

    if (!content.includes(params.searchText)) continue

    const updated = content.replaceAll(
      params.searchText,
      params.replaceText
    )

    await scriptEditorProvider.updateFileContent(file, updated)
    affectedFiles++
  }

  return {
    success: true,
    message: `Replaced text in ${affectedFiles} file(s).`
  }
}

AssistantTool.registerExecuteTool(replaceInScripts)
```

---

## 6. Designing the Return Message

The `message` field is **consumed by the Assistant** and should be treated as structured output rather than raw logs.

Recommended guidelines:

* The first line should summarize the result
* Avoid returning excessively large or unstructured content
* Use multi-line output or lightweight markup when structure is helpful

Examples:

```text
Operation completed successfully.
Affected files: 3
```

or:

```text
Replacement summary:
<files>3</files>
<search>foo</search>
<replace>bar</replace>
```

---

## 7. Error Handling Guidelines

* Convert all expected failures into `{ success: false, message }`
* Avoid throwing uncaught exceptions
* Error messages should be clear and actionable, without exposing internal details

Example:

```ts
return {
  success: false,
  message: "Invalid parameters: searchText cannot be empty."
}
```

---

## 8. Progress Reporting (Optional)

For long-running tools, progress updates can be reported via:

```ts
AssistantTool.report("Formatting file: index.tsx")
```

Use progress reporting sparingly and only at meaningful stages.

---

## 9. Using the Test Function

`registerExecuteTool` returns a test function that can be executed inside the script editor:

```ts
testFormatTool({})
```

Test functions are useful for:

* Verifying parameter mapping
* Validating execution logic
* Debugging tools without triggering an Assistant conversation

---

## 10. Best Practices Summary

* “No approval” does not mean “no risk” — evaluate carefully
* Keep tool behavior deterministic and predictable
* Avoid hidden side effects
* Design output messages to support the Assistant’s next reasoning step
