# 链接

`Link` 组件用于创建可点击的控件，点击后可跳转到指定的 URL。该组件可用于打开网页、App 内自定义 URL Scheme，或其他支持的链接类型。

> **注意**：如果在小组件中使用 `Link`，则会忽略 `widgetURL` 修饰符的设置。

### 属性说明

| 属性名        | 类型                        | 说明                      |
| ---------- | ------------------------- | ----------------------- |
| `url`      | `string`                  | 点击后要跳转的目标链接地址。          |
| `children` | `string` \| `VirtualNode` | 展示在链接中的内容，可以是纯文本或自定义布局。 |

### 示例

```tsx
<Link url={Script.createOpenURLScheme('Script A')}>
  打开脚本 A
</Link>

<Link url="https://example.com">
  <HStack>
    <Image
      systemName="globe"
      width={20}
      height={20}
      padding={{ trailing: 8 }}
    />
    <Text>打开链接</Text>
  </HStack>
</Link>
```

该组件支持使用纯文本作为子内容，也可以使用复杂的布局作为子节点。点击链接后，会根据 URL 类型打开相应的页面（如 Safari、其他 App 或自定义处理程序）。
