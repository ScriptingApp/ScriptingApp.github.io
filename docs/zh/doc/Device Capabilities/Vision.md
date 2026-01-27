---
title: 视觉

---

`Vision` 模块提供了用于**文本识别**的 API。  
支持从静态图片中识别文本，或者通过相机扫描文档并提取文本内容。  

---

## 类型

### `RecognizedText`
表示单个识别到的文本块。

- `content: string`  
  识别到的文本内容。

- `confidence: number`  
  置信度（0.0 到 1.0 之间），1.0 表示最高置信度。

- `boundingBox: { x: number, y: number, width: number, height: number }`  
  文本所在的矩形区域，使用归一化坐标表示。

---

### `RecognizeTextOptions`
文本识别的配置选项。

- `recognitionLevel?: "accurate" | "fast"`  
  识别模式：
  - `"accurate"`（默认）：优先保证准确度。
  - `"fast"`：优先保证速度。

- `recognitionLanguages?: string[]`  
  识别时优先使用的语言数组（ISO 语言编码）。

- `usesLanguageCorrection?: boolean`  
  是否在识别过程中应用语言自动纠错。

- `minimumTextHeight?: number`  
  最小识别文本高度，相对于图片高度（默认 `0.03125`）。

- `customWords?: string[]`  
  补充词汇表（只在启用语言纠错时生效）。

---

## 函数

### `recognizeText(image: UIImage, options?: RecognizeTextOptions): Promise<{ text: string, candidates: RecognizedText[] }>`
对指定图片进行文本识别。

- **参数**：
  - `image`：要识别的 `UIImage` 对象。
  - `options` *(可选)*：文本识别配置。

- **返回**：  
  返回 Promise，包含：
  - `text`：识别出的完整文本。
  - `candidates`：识别出的文本块数组及详细信息。

---

### `scanDocument(options?: RecognizeTextOptions): Promise<string[]>`
使用相机扫描文档并识别文本。

- **参数**：
  - `options` *(可选)*：文本识别配置。

- **返回**：  
  返回 Promise，包含识别到的文档文本数组。  
  如果用户取消，Promise 将抛出错误。

---

## 使用示例

### 识别图片文件中的文本
```tsx
const image = UIImage.fromFile('/路径/图片.png')
if (image) {
  const result = await Vision.recognizeText(image, {
    recognitionLevel: 'accurate',
    recognitionLanguages: ['zh-Hans', 'en'],
    usesLanguageCorrection: true
  })
  console.log('识别到的完整文本：', result.text)

  for (const block of result.candidates) {
    console.log(`文本：${block.content}，置信度：${block.confidence}`)
  }
}
```

---

### 使用相机扫描文档
```tsx
try {
  const documents = await Vision.scanDocument({
    recognitionLevel: 'fast',
    recognitionLanguages: ['zh-Hans']
  })
  console.log('扫描到的文档内容：', documents)
} catch (error) {
  console.error('扫描取消或失败：', error)
}
```