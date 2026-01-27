---
title: 翻译宿主

---

`translationHost` 是一个视图修饰符，用于为当前页面提供翻译服务上下文。它支持系统级的交互提示，例如下载语言包或在语言不明确时提示用户选择。

---

## 作用

当你使用 `Translation` 类进行文本翻译时，**应将 `translationHost` 应用于页面的根视图**，以确保：

* 如果**源语言或目标语言未安装**，系统会**提示用户下载所需语言**。
* 如果未指定源语言（即 `source: null`），且系统**无法从文本中判断语言**，系统会**提示用户手动选择源语言**。

如果不设置此修饰符，系统提示可能无法正常弹出，翻译过程可能失败或抛出错误。

---

## 类型定义

```ts
translationHost?: Translation
```

该修饰符的值必须是一个 `Translation` 实例。

---

## 使用示例

```tsx
function View() {
  const translation = useMemo(() => new Translation(), [])
  const [translated, setTranslated] = useState<{[key: string]: string}>({})
  const texts = ["Hello", "Goodbye"]
  
  useEffect(() => {
    translation.translateBatch({
      texts,
      source: "en",
      target: "fr"
    }).then(result => {
      const map: {[key: string]: string} = {}
      result.forEach((item, index) => {
        map[texts[index]] = item
      })
      setTranslated(map)
    })
  }, [])

  return <VStack translationHost={translation}>
    {texts.map(text => (
      <Text key={text}>
        {translated[text] || text}
      </Text>
    ))}
  </VStack>
}
```

在上面的示例中：

* 使用 `useMemo` 创建了一个 `Translation` 实例。
* 批量将英语文本翻译为法语。
* 最外层的 `VStack` 使用了 `translationHost={translation}`，确保系统在需要时可以弹出下载或语言选择提示。

---

## 最佳实践

* 始终将 `translationHost` 应用于**页面的顶层容器视图**。
* 确保传入的 `Translation` 实例与用于调用 `.translate()` 或 `.translateBatch()` 的实例一致。
* 避免在同一个页面中重复创建多个 `Translation` 实例。
