---
title: ScriptEditorProvider and Editor Types
description: Learn about ScriptEditorProvider and Editor Types.
tag: PRO
---

This document provides a detailed reference for editor-related capabilities available to AssistantTools in the **script editor context** (`scriptEditorOnly: true`). It explains the `ScriptEditorProvider` interface and its associated types, along with recommended usage patterns and constraints.

---

## 1. Role and Responsibilities of ScriptEditorProvider

`ScriptEditorProvider` is the communication interface between an AssistantTool and the **script editor**.

An instance of this interface is provided when:

* The tool declares `scriptEditorOnly: true` in `assistant_tool.json`
* The tool is executed inside the script editor (including via test functions)

Its primary responsibilities are:

* Providing controlled access to the script project’s file system
* Enabling structured and traceable file modifications
* Exposing lint and syntax diagnostics
* Supporting preview-first workflows via diff visualization

---

## 2. Project-Level Information

### `scriptName`

```ts
readonly scriptName: string
```

Represents the name of the current script project.

Typical use cases:

* Including scope information in the returned `message`
* Providing context in logs or `AssistantTool.report` output

---

## 3. File and Directory Discovery

### Checking File Existence

```ts
exists(relativePath: string): boolean
```

* `relativePath` is relative to the project root
* Commonly used for validation or conditional file creation

---

### Retrieving All Folders

```ts
getAllFolders(): string[]
```

Returns all folder paths in the project (relative paths).

Typical use cases:

* Generating files in bulk
* Inspecting project structure
* Building grouping or navigation logic

---

### Retrieving All Files

```ts
getAllFiles(): string[]
```

Returns all file paths in the project (relative paths).

Typical use cases:

* Project-wide scans
* Batch formatting, search, or replacement
* Mapping lint diagnostics to files

---

## 4. Reading and Writing File Content

### Reading File Content

```ts
getFileContent(relativePath: string): Promise<string | null>
```

* Returns `null` if the file does not exist
* Callers should handle the null case explicitly

---

### Updating an Entire File

```ts
updateFileContent(relativePath: string, content: string): Promise<boolean>
```

* Replaces the entire file content
* Suitable for deterministic operations such as formatting
* Not recommended for complex or fine-grained edits

---

### Writing to a File (Auto-Creation)

```ts
writeToFile(relativePath: string, content: string): Promise<boolean>
```

* Creates the file if it does not exist
* Overwrites existing content
* Commonly used for file generation or templates

---

## 5. Structured Editing APIs (Recommended)

For most editor tools, **structured edits are safer and more predictable** than full-file replacements.

---

### `ScriptEditorFileOperation`

```ts
type ScriptEditorFileOperation = {
  startLine: number
  content: string
}
```

Semantics:

* `startLine` is **1-based**
* `content` is the text to insert or replace
* The end line is implicit and determined by the editing operation

---

### Inserting Content

```ts
insertContent(
  relativePath: string,
  operations: ScriptEditorFileOperation[]
): Promise<boolean>
```

Behavior:

* Inserts content **before** the specified line
* Operations are applied in array order
* Line numbers refer to the original file state

Recommended practice: apply insert operations **from bottom to top** to avoid line-shift issues.

Typical use cases:

* Inserting imports, comments, or new functions
* Augmenting existing code blocks

---

### Replacing Content

```ts
replaceInFile(
  relativePath: string,
  operations: ScriptEditorFileOperation[]
): Promise<boolean>
```

Behavior:

* Replaces content starting at `startLine`
* Intended for precise, line-based substitutions
* Not suitable for fuzzy or pattern-based replacements

---

## 6. Diff Preview Support

### `openDiffEditor`

```ts
openDiffEditor(relativePath: string, content: string): void
```

Displays a diff view comparing:

* The current file content
* The provided prospective content

This method does **not** modify the file.

Recommended usage:

* During the Approval Request phase
* As the action of a `previewButton`
* Before any batch or destructive modifications

---

## 7. Lint and Syntax Diagnostics

### `ScriptLintError`

```ts
type ScriptLintError = {
  line: number
  message: string
}
```

Represents a single lint or syntax error.

---

### Retrieving Lint Errors

```ts
getLintErrors(): Record<string, ScriptLintError[]>
```

Return structure:

* Key: file path (relative)
* Value: array of lint errors for that file

---

### Common Usage Pattern

* Scan all lint errors
* Identify affected files and line numbers
* Optionally attempt safe, deterministic fixes
* Summarize diagnostics in the tool’s result message

Example:

```ts
const errors = editor.getLintErrors()

for (const file in errors) {
  for (const error of errors[file]) {
    // error.line
    // error.message
  }
}
```

---

## 8. Usage Constraints and Safety Guidelines

Important constraints and recommendations:

* All paths must be **relative paths**
* Do not assume file content always exists
* Avoid concurrent modifications to the same file
* Prefer structured edits over full replacements
* Provide diff previews for batch or impactful changes

---

## 9. Recommended Workflow for Editor-Based AssistantTools

A robust editor-based AssistantTool typically follows this flow:

1. Scan the project using `getAllFiles` or `getLintErrors`
2. Compute the intended changes
3. In the Approval Request phase:

   * Clearly explain the changes
   * Provide a diff preview via `openDiffEditor`
4. In the Execute phase:

   * Perform changes only after confirmation
   * Use structured editing APIs
5. Return a concise, structured execution summary

---

## 10. Summary

* `ScriptEditorProvider` is the bridge between AssistantTools and the script editor
* It enables **controlled, structured, and previewable** file operations
* Editor-based tools should prioritize predictability and user trust
* Combining Approval flows with previews leads to high-confidence editing experiences