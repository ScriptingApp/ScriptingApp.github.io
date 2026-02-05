# Overview and Workflow

AssistantTool is an extensible tool mechanism in **Scripting** that provides system-level capabilities to the Assistant. By defining and implementing Assistant Tools, script authors can expose structured functionality—such as device access, file manipulation, and data processing—that the Assistant can invoke during a conversation and then continue reasoning based on the execution result.

The design of AssistantTool focuses on two core goals:

- Granting the Assistant additional capabilities while maintaining strong control and transparency, especially for sensitive operations that require explicit user approval.
- Providing clear inputs, clear outputs, and testability, so tools can be reasoned about, validated, and safely composed by the Assistant.

***

## Types of AssistantTools

From an execution model perspective, AssistantTool has two primary types, corresponding to two different registration APIs.

### Tools Without User Approval

- `assistant_tool.json`: `requireApproval: false`
- Code registration:

  - `AssistantTool.registerExecuteTool<P>(executeFn)`

Typical use cases include:

- Pure computation or data transformation
- Formatting, parsing, or code generation
- Non-sensitive operations that do not access device permissions or private user data

In this mode, the tool is executed immediately once the Assistant decides to invoke it.

***

### Tools With User Approval

- `assistant_tool.json`: `requireApproval: true`
- Code registration:

  - `AssistantTool.registerApprovalRequest<P>(requestFn)`
  - `AssistantTool.registerExecuteToolWithApproval<P>(executeFn)`

Typical use cases include:

- Accessing privacy-sensitive resources (location, photos, contacts, calendar, etc.)
- Modifying user data or project files
- Any operation where the user should explicitly understand and confirm what will happen

Optionally, tools can provide a preview action that allows the user to inspect the expected outcome before approving execution.

> The `autoApprove` flag determines **whether this specific tool is allowed to be auto-approved**.

***

## Script-Editor-Only Tools

The `scriptEditorOnly` field in `assistant_tool.json` determines whether a tool can only be used inside the script editor.

- `scriptEditorOnly: false`

  - The tool may be invoked in regular Assistant conversations.
  - A `ScriptEditorProvider` instance is usually not available.

- `scriptEditorOnly: true`

  - The tool is restricted to the script editor context.
  - Execution functions receive an additional `scriptEditorProvider?: ScriptEditorProvider` parameter.
  - Intended for editor-centric tools such as code formatting, batch file edits, diff previews, or lint-driven refactors.

***

## Tool Creation and File Structure

When an AssistantTool is created, the system generates two files:

- `assistant_tool.json`
  Declares the tool’s metadata, parameters, and execution constraints.

- `assistant_tool.tsx`
  Contains the implementation logic and registers the tool using the AssistantTool APIs.

### Responsibility of `assistant_tool.json`

The configuration file is responsible for:

- UI presentation (displayName, icon, color, description)
- Tool routing (unique `id`)
- Invocation constraints (parameters, requireApproval, autoApprove, scriptEditorOnly)

Execution logic is never implemented in this file and always lives in `assistant_tool.tsx`.

***

## Parameters and Input Mapping

Tool input parameters are defined in `assistant_tool.json` and are passed into execution functions as a typed `params` object.

These parameters are provided to:

- `AssistantToolApprovalRequestFn<P>(params, scriptEditorProvider?)`
- `AssistantToolExecuteWithApprovalFn<P>(params, userAction, scriptEditorProvider?)`
- `AssistantToolExecuteFn<P>(params, scriptEditorProvider?)`

Key conventions:

- `P` is a TypeScript type declared in `assistant_tool.tsx`.
- The runtime maps JSON parameters into the `params` object.
- Tools without parameters typically use `P = {}`.

***

## Runtime Execution Flow

From a runtime perspective, a complete tool invocation follows one of the flows below.

### Approval-Required Flow

1. The Assistant selects a tool and constructs `params`.
2. The system invokes the registered approval request function.
3. The approval request returns:

   - A message shown to the user
   - Optional title
   - Optional preview button
   - Optional primary and secondary button labels
4. The user’s selection is captured as `UserActionForApprovalRequest`.
5. The system invokes the execution function registered via `registerExecuteToolWithApproval`.
6. The execution function returns `{ success, message }` to the Assistant.

***

### No-Approval Flow

1. The Assistant selects a tool and constructs `params`.
2. The system directly invokes the execution function registered via `registerExecuteTool`.
3. The execution function returns `{ success, message }` to the Assistant.

***

## Tool Output Contract

All execution functions return a uniform result structure:

```ts
{
  success: boolean
  message: string
}
```

The `message` field is treated as structured output consumable by the Assistant. Recommended patterns include:

- Natural language summaries for simple results
- Lightweight markup for structured data
- Multi-line output where the first line is a summary and subsequent lines provide details

Returning excessively large raw data is discouraged. For editor-related tools, previews and diffs should be surfaced through UI mechanisms instead.

***

## Test Functions

Each registration API returns a corresponding test function for use inside the script editor:

- Approval request registration → approval request test function
- Execution with approval registration → execution test function with user action
- Execution without approval registration → execution test function

These functions allow developers to:

- Validate parameter mapping
- Verify execution logic and output
- Debug tools without relying on an actual Assistant conversation

***

## Progress Reporting

`AssistantTool.report(message: string, id?: string)` can be used to emit progress updates while a tool is running. The parameter `id` can be used to update an existing report.

Typical use cases include:

- Long-running operations
- Multi-step processes
- Debugging and observability

Progress messages should be meaningful and not emitted excessively.
