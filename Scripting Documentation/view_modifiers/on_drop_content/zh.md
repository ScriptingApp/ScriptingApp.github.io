`onDropContent` 是 Scripting 提供的一个视图修饰符，用于使某个视图成为接收来自其他 App 拖入的文件、图片或文本的拖放目标。该功能特别适用于 iPadOS 和 macOS 上支持多窗口、多任务操作的场景，提升交互体验。

---

## 功能概览

使用 `onDropContent` 可以：

* 接收从其他 App 拖拽进来的图片、文件或文本；
* 指定仅接受特定类型的内容（使用 UTI 类型标识符）；
* 实时感知拖拽指针是否悬停在视图上方；
* 在内容被成功放下后处理拖入数据。

---

## 修饰符定义

```ts
onDropContent?: {
  types: UTType[]
  isTarget: {
    value: boolean
    onChanged: (value: boolean) => void
  }
  onResult: (result: {
    texts: string[]
    images: UIImage[]
    fileURLs: string[]
  }) => void
}
```

### 参数说明

| 参数名        | 类型                                                        | 说明                                                                               |
| ---------- | --------------------------------------------------------- | -------------------------------------------------------------------------------- |
| `types`    | `UTType[]`                                                | 可接收的内容类型标识符数组，例如 `"public.image"`、`"public.text"` 等。若拖拽内容不包含这些类型，视图将不会成为有效的放置目标。 |
| `isTarget` | `{ value: boolean; onChanged: (value: boolean) => void }` | 表示当前拖拽是否悬停在该视图上方的绑定状态。可用于高亮或提示用户拖放目标区域。                                          |
| `onResult` | `(result) => void`                                        | 当有效内容被放下时触发的回调函数，提供所接收到的内容结果对象。                                                  |

---

## 内容结果结构

```ts
{
  texts: string[]
  images: UIImage[]
  fileURLs: string[]
}
```

* **`texts`**：拖拽文本内容的字符串数组；
* **`images`**：拖拽进来的图片，格式为 `UIImage`；
* **`fileURLs`**：拖入文件的本地路径（字符串形式）。

---

## 示例用法

```tsx
const [isTarget, setIsTarget] = useState(false)

return <VStack
  onDropContent={{
    types: ["public.image"],
    isTarget: {
      value: isTarget,
      onChanged: setIsTarget
    },
    onResult: (result) => {
      console.log(`接收到 ${result.images.length} 张图片`)
    }
  }}
>
  <Text>
    {isTarget ? "请将图片拖到此处" : "拖拽一张图片进入此区域"}
  </Text>
</VStack>
```

上述示例中：

* 该 `VStack` 仅接收 `"public.image"` 类型的拖拽内容；
* 当拖拽指针进入该区域时，`isTarget` 被设为 `true`，用于动态更新 UI；
* 图片被放下后，回调函数处理拖入结果。

---

## 使用提示

* `types` 字段中的类型字符串遵循 Apple 的 [Uniform Type Identifier (UTType)](https://developer.apple.com/documentation/uniformtypeidentifiers) 规范；
* 支持常见类型如 `"public.image"`、`"public.text"`、`"com.adobe.pdf"` 等；
* 拖放功能在 iPad 和 Mac 上体验最佳，尤其适用于文件管理、图片收集、文档导入等场景。
