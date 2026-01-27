---
title: translationHost

---

The `translationHost` view modifier is used to provide a translation service context to your UI. This modifier enables user interaction with system-level translation dialogs, such as downloading required languages or selecting ambiguous source languages.

---

## Purpose

Apply the `translationHost` modifier to the **root view** of your page when using the `Translation` class for localized translations. It ensures that:

* If the **source or target language** is not currently available on the device, the system will **prompt the user to download** the necessary language resources.
* If the **source language is not specified** and cannot be inferred from the text content, the system will **prompt the user to select a source language**.

Without applying this modifier, such user prompts may not function correctly, and your translation session may fail silently or throw an error.

---

## Type

```ts
translationHost?: Translation
```

The value of this modifier must be an instance of the `Translation` class.

---

## Usage Example

```tsx
function View() {
  const translation = useMemo(() => new Translation(), [])
  const [translated, setTranslated] = useState<Record<string, string>>({})
  const texts = ["Hello", "Goodbye"]
  
  useEffect(() => {
    translation.translateBatch({
      texts,
      source: "en",
      target: "fr"
    }).then(result => {
      const map: Record<string, string> = {}
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

In this example:

* A `Translation` instance is created using `useMemo`.
* A batch of English texts is translated to French.
* The `VStack` view is wrapped with the `translationHost` modifier so the system can show download or language selection prompts if necessary.

---

## Best Practices

* Always apply `translationHost` to the **top-level container view** when performing translation-related operations.
* Use a **consistent `Translation` instance** that matches the one used for calling `.translate()` or `.translateBatch()`.
* Avoid creating multiple `Translation` instances for the same session if possible.

