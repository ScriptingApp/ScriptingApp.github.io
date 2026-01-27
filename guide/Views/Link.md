# Link

The `Link` component provides a way to create tappable controls that navigate to a specified URL. This component can be used to open web pages, app-specific URLs, or other schemes.

> **Note**: If the `Link` component is used within a widget, the `widgetURL` modifier will be ignored.

### Props

| Name       | Type                      | Description                                                                  |
| ---------- | ------------------------- | ---------------------------------------------------------------------------- |
| `url`      | `string`                  | The destination URL to open when tapped.                                     |
| `children` | `string` \| `VirtualNode` | The content displayed inside the link. Can be plain text or a custom layout. |

### Example

```tsx
<Link url={Script.createOpenURLScheme('Script A')}>
  Open Script A
</Link>

<Link url="https://example.com">
  <HStack>
    <Image
      systemName="globe"
      width={20}
      height={20}
      padding={{ trailing: 8 }}
    />
    <Text>Open Link</Text>
  </HStack>
</Link>
```

This component supports both simple text and complex layouts as its children. When tapped, it opens the provided `url` using the appropriate handler (e.g., Safari, another app, or a custom scheme).
