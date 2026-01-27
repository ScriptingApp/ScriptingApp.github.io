# ContentUnavailableView

`ContentUnavailableView` is a UI component designed to present a view when the content in your app is unavailable. It typically shows a title, an optional description, and an action area, making it clear to users that content is missing or not yet available. This component can be used in places like lists, where no data is available to show to the user.

## Props

### Common Properties

You can pass one of two structures of properties to the `ContentUnavailableView` component:

1. **String-based Props:**
   - `title` (string): The main title to display, typically describing the content that is unavailable.
   - `systemImage` (string): A system icon to visually represent the unavailable content. This is used to enhance the UI and provide an intuitive, recognizable symbol.
   - `description` (string, optional): A brief text description of the unavailable content. This is optional and can be omitted if not needed.

2. **VirtualNode-based Props:**
   - `label` (VirtualNode): A virtual node, typically a `Text` or any other UI component, that will serve as the label describing the unavailable content.
   - `description` (VirtualNode | null, optional): A virtual node, usually a `Text` component, that provides more detailed information about the unavailable content. If you don't need a description, this can be set to `null`.
   - `actions` (Array of VirtualNode | null, optional): An optional list of action buttons or links to display. These actions can be buttons, links, or other components, and they can be `null` if no actions are needed.

## Example Usage

### 1. Simple Usage with Strings

```tsx
function View({documents}: {documents: {name: string}[]}) {
  return (
    <NavigationStack>
      <List
        overlay={
          documents.length > 0
            ? undefined
            : <ContentUnavailableView
                title="No documents"
                systemImage="tray.fill"
              />
        }
      >
        {documents.map(item => (
          <Text>{item.name}</Text>
        ))}
      </List>
    </NavigationStack>
  )
}
```

In this example, `ContentUnavailableView` is used to show a message with an icon when the list of documents is empty. If the `documents` array is empty, the view will show the title "No documents" and a system icon `"tray.fill"`.

### 2. Advanced Usage with VirtualNode

```tsx
function View({documents}: {documents: {name: string}[]}) {
  return (
    <NavigationStack>
      <List
        overlay={
          documents.length > 0
            ? undefined
            : <ContentUnavailableView
                label={<Text>No documents available</Text>}
                description={<Text>Please check back later for available documents.</Text>}
                actions={[<Button onClick={handleRefresh}>Refresh</Button>]}
              />
        }
      >
        {documents.map(item => (
          <Text>{item.name}</Text>
        ))}
      </List>
    </NavigationStack>
  )
}
```

In this example, the `ContentUnavailableView` is passed virtual nodes for the label and description. It also includes an action button to refresh the list of documents.

## Notes

- You can choose to use either the string-based or virtual node-based properties depending on how dynamic you want the content of the unavailable view to be.
- The component is flexible and can be integrated into lists, stacks, and other complex layouts.

## API Details

- **`title`** and **`systemImage`**: Provide a simple, static way to show unavailable content with a string title and system icon.
- **`label`** and **`description`**: Allow you to customize the label and description with full control, using `VirtualNode` components.
- **`actions`**: Optional actions can be added to guide users, like buttons or links, that perform actions like refreshing content or redirecting users to another screen.

This component is ideal for UIs where content might be temporarily unavailable and you want to display a consistent and clear message to users.
