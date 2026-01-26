# AssistantTool

**Assistant Tool** is a system extension mechanism within the Scripting application that enhances the capabilities of an intelligent assistant (Assistant). By defining and implementing an Assistant Tool, developers can provide the Assistant with auxiliary functionalities such as device capability access, file reading/writing, and data analysis. This improves both the intelligence and practicality of the Assistant.

This document uses an example tool, **"Request Current Location"**, to illustrate the full implementation process, including tool creation, configuration file explanation, execution logic, and detailed descriptions of various functions.

***

## 1. Tool Creation Process

1. Open any scripting project and click the “Add Assistant Tool” button in the file manager interface.
2. Fill in the relevant information about the Assistant Tool in the configuration popup window.
3. After clicking “Save,” the system will automatically generate two files in the script:

- `assistant_tool.json`: Describes the tool’s metadata and parameter information.
- `assistant_tool.tsx`: Implements the tool’s execution logic.

***

## 2. Configuration File: `assistant_tool.json`

This file declares the basic information and behavior settings of the tool. Below is a sample content and explanation of each field:

```json
{
  "displayName": "Request Current Location",
  "id": "request_current_location",
  "description": "This tool allows you to request the one-time delivery of the latitude and longitude of the user’s current location.",
  "icon": "location.fill",
  "color": "systemBlue",
  "parameters": [],
  "requireApproval": true,
  "autoApprove": true,
  "scriptEditorOnly": false
}
```

### Field Descriptions:

| Field              | Type    | Description                                            |
| ------------------ | ------- | ------------------------------------------------------ |
| `displayName`      | string  | Name displayed in the UI                               |
| `id`               | string  | Unique identifier for the tool (must be unique)        |
| `description`      | string  | Description of the tool’s functionality                |
| `icon`             | string  | Name of the SF Symbols icon used                       |
| `color`            | string  | Primary color of the tool                              |
| `parameters`       | array   | Parameters required by the tool (empty means no input) |
| `requireApproval`  | boolean | Whether user approval is required                      |
| `autoApprove`      | boolean | Whether Assistant can auto-approve                     |
| `scriptEditorOnly` | boolean | Whether the tool can only be used in the script editor |

***

## 3. Execution Logic Example: `assistant_tool.tsx`

```tsx
type RequestCurrentLocationParams = {};

const locationApprovalRequest: AssistantToolApprovalRequestFn<
  RequestCurrentLocationParams
> = async (params) => {
  return {
    message: "The assistant wants to request your current location.",
    primaryButtonLabel: "Allow",
  };
};

const requestCurrentLocation: AssistantToolExecuteWithApprovalFn<
  RequestCurrentLocationParams
> = async (params, { primaryConfirmed, secondaryConfirmed }) => {
  try {
    const location = await Location.requestCurrent();
    if (location) {
      return {
        success: true,
        message: [
          "The user's current location info:",
          `<latitude>${location.latitude}</latitude>`,
          `<longitude>${location.longitude}</longitude>`,
        ].join("\n"),
      };
    }
    return {
      success: false,
      message:
        "Failed to request user's current location, ask user to check the device's location permission.",
    };
  } catch {
    return {
      success: false,
      message:
        "Failed to request user's current location, ask user to check the device's location permission.",
    };
  }
};

const testRequestLocationApprovalFn =
  AssistantTool.registerApprovalRequest(locationApprovalRequest);

const testRequestLocationExecuteFn =
  AssistantTool.registerExecuteToolWithApproval(requestCurrentLocation);

// Test the tool in the script editor:
testRequestLocationApprovalFn({});
testRequestLocationExecuteFn(
  {},
  {
    primaryConfirmed: true,
    secondaryConfirmed: false,
  },
);
```

***

## 4. AssistantTool Registration Functions Explained

### 1. `registerApprovalRequest`

Registers a function to request user approval before executing the tool.

```ts
function registerApprovalRequest<P>(
  requestFn: AssistantToolApprovalRequestFn<P>,
): AssistantToolApprovalRequestTestFn<P>;
```

**Parameters**:

- `requestFn(params, scriptEditorProvider?)`: Returns a prompt with messages and button labels.
- `params`: Input parameters for the tool.
- `scriptEditorProvider`: Available only when `scriptEditorOnly` is set to true, provides file access for the script.

**Return Value**:

A test function for simulating approval requests in the script editor.

***

### 2. `registerExecuteToolWithApproval`

Registers an execution function that requires user approval.

```ts
function registerExecuteToolWithApproval<P>(
  executeFn: AssistantToolExecuteWithApprovalFn<P>,
): AssistantToolExecuteWithApprovalTestFn<P>;
```

**Parameters**:

- `params`: Input parameters for execution.
- `userAction`: User's choice in the approval prompt:

```ts
type UserActionForApprovalRequest = {
  primaryConfirmed: boolean;
  secondaryConfirmed: boolean;
};
```

- `scriptEditorProvider`: Same as above.

**Return Value**:

Returns an object:

```ts
{
  success: boolean;
  message: string;
}
```

- `success`: Whether execution succeeded.
- `message`: Message returned to the Assistant.

***

### 3. `registerExecuteTool`

Registers a tool that does **not** require user approval.

```ts
function registerExecuteTool<P>(
  executeFn: AssistantToolExecuteFn<P>,
): AssistantToolExecuteTestFn<P>;
```

**Use Case**: Suitable for non-sensitive operations or those that don’t involve device permissions.

***

### 4. Testing Functions

Each registration function returns a test function that can be used in the script:

```ts
testApprovalRequestFn({ ...params });
testExecuteFn(
  { ...params },
  {
    primaryConfirmed: true,
    secondaryConfirmed: false,
  },
);
testExecuteToolFn({ ...params });
```

***

## 5. ScriptEditorProvider Interface

When `scriptEditorOnly: true` is set, the system provides a `ScriptEditorProvider` interface that allows access to the script project’s file system and syntax info.

Capabilities include:

- File read/write (read, update, write, insert, replace)
- Diff comparison (`openDiffEditor`)
- Linting results (`getLintErrors`)
- List all files/folders in the project

Useful for tools that edit scripts, perform formatting, or batch modifications.

***

## 6. Execution and User Experience Flow

1. The Assistant determines whether to invoke a tool during a conversation.
2. If the tool requires approval, a dialog box is displayed:
   - The prompt is provided by `registerApprovalRequest`.
   - Once the user clicks “Allow,” the tool logic is executed.
3. Execution results are returned to the Assistant through the `message` field, and shown to the user.

***

## 7. Tools That Don’t Require Approval

If you don’t want to show an approval prompt, simply use `registerExecuteTool` and set `requireApproval: false` in `assistant_tool.json`.

```ts
AssistantTool.registerExecuteTool<MyParams>(async (params) => {
  return {
    success: true,
    message: "Tool executed successfully.",
  };
});
```

***

## 8. Summary

Assistant Tool is an extensible module provided by the Scripting application, supporting scenarios such as user authorization, file manipulation, and system-level access. The development process includes:

1. Creating the tool in a scripting project;
2. Configuring its metadata;
3. Implementing and registering the logic functions;
4. Testing tool behavior with test functions;
5. Triggering tool execution automatically or manually within Assistant conversations.
