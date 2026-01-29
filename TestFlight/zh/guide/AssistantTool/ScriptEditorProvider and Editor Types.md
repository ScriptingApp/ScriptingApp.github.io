# ScriptEditorProvider 及编辑器相关类型详解

本篇文档详细说明 Assistant Tool 在 **脚本编辑器环境（scriptEditorOnly）** 下可使用的编辑器能力，包括 `ScriptEditorProvider` 接口本身，以及与之配套的 `ScriptEditorFileOperation`、`ScriptLintError` 等类型。

***

## 一、ScriptEditorProvider 的定位与职责

`ScriptEditorProvider` 是 Assistant Tool 与 **脚本编辑器（Script Editor）** 之间的通信接口。

当满足以下条件时，工具的执行函数会收到该对象：

- `assistant_tool.json` 中设置了 `scriptEditorOnly: true`
- 工具在脚本编辑器环境中被执行（包括测试函数）

它的核心职责是：

- 提供对脚本项目文件系统的受控访问
- 支持结构化、可追踪的文件修改
- 提供 lint / 语法检查结果
- 支持 diff 预览而非直接破坏性修改

***

## 二、项目级信息接口

### `scriptName`

```ts
readonly scriptName: string
```

表示当前脚本项目的名称。

常见用途：

- 在返回 `message` 中标注作用范围
- 在日志或 `AssistantTool.report` 中显示上下文信息

***

## 三、文件与目录查询接口

### 判断文件是否存在

```ts
exists(relativePath: string): boolean
```

- `relativePath` 为相对于脚本项目根目录的路径
- 用于安全检查或条件性创建文件

***

### 获取所有文件夹

```ts
getAllFolders(): string[]
```

返回项目中所有文件夹路径（相对路径）。

典型用途：

- 批量生成文件
- 判断项目结构
- 构建导航或分组逻辑

***

### 获取所有文件

```ts
getAllFiles(): string[]
```

返回项目中所有文件路径（相对路径）。

典型用途：

- 全项目扫描
- 批量格式化 / 搜索 / 替换
- lint 错误定位

***

## 四、文件内容读取与写入

### 读取文件内容

```ts
getFileContent(relativePath: string): Promise<string | null>
```

- 文件不存在时返回 `null`
- 建议在调用前用 `exists` 或空值判断

***

### 更新整个文件内容

```ts
updateFileContent(relativePath: string, content: string): Promise<boolean>
```

- 用新内容完全替换原文件
- 适合格式化、重写等确定性操作
- 不建议在复杂编辑场景下频繁使用

***

### 写入文件（自动创建）

```ts
writeToFile(relativePath: string, content: string): Promise<boolean>
```

- 文件不存在时自动创建
- 文件存在时覆盖
- 常用于生成新文件或模板

***

## 五、结构化编辑接口（推荐）

相比直接整体替换文件内容，**结构化编辑接口更安全、更可控**。

***

### ScriptEditorFileOperation 类型

```ts
type ScriptEditorFileOperation = {
  startLine: number
  content: string
}
```

语义说明：

- `startLine`：**基于 1 的行号**
- `content`：要插入或替换的文本内容
- 不包含结束行，具体行为由调用接口决定

***

### 插入内容

```ts
insertContent(
  relativePath: string,
  operations: ScriptEditorFileOperation[]
): Promise<boolean>
```

行为说明：

- 在指定行号 **之前** 插入内容
- 多个 operation 按数组顺序依次执行
- 行号以原始文件为基准，建议从后往前插入以避免偏移

适合场景：

- 插入 import / 注释 / 新函数
- 自动补充代码块

***

### 替换内容

```ts
replaceInFile(
  relativePath: string,
  operations: ScriptEditorFileOperation[]
): Promise<boolean>
```

行为说明：

- 从 `startLine` 开始替换对应行内容
- 通常用于精确替换某一行或一段代码
- 不适合模糊搜索型替换

***

## 六、Diff 预览接口

### `openDiffEditor`

```ts
openDiffEditor(relativePath: string, content: string): void
```

该方法用于 **在不真正写入文件的前提下**，向用户展示：

- 当前文件内容 vs 预期新内容
- 清晰的改动范围

推荐用法：

- Approval Request 阶段
- 作为 previewButton 的 action
- 所有批量或破坏性修改前

***

## 七、Lint 与语法错误信息

### ScriptLintError 类型

```ts
type ScriptLintError = {
  line: number
  message: string
}
```

表示脚本中的一个 lint 或语法错误。

***

### 获取 lint 错误

```ts
getLintErrors(): Record<string, ScriptLintError[]>
```

返回结构：

- key：文件路径（relativePath）
- value：该文件中的 lint 错误数组

***

### 典型使用模式

- 扫描所有 lint 错误
- 定位错误行
- 自动修复简单问题（需谨慎）
- 汇总错误信息返回给 Assistant

示例：

```ts
const errors = editor.getLintErrors()

for (const file in errors) {
  for (const error of errors[file]) {
    // error.line
    // error.message
  }
}
```

***

## 八、ScriptEditorProvider 的使用边界

重要约束与建议：

- 所有路径必须是 **相对路径**
- 不应假设文件内容一定存在
- 不要并发修改同一个文件
- 尽量使用结构化编辑接口而非全文替换
- 批量修改时优先提供 diff 预览

***

## 九、编辑器类 Assistant Tool 的推荐模式

一个成熟的编辑器类工具通常遵循以下流程：

1. 使用 `getAllFiles` / `getLintErrors` 扫描项目
2. 计算将要发生的修改
3. 在 Approval Request 阶段：

   - 提供清晰说明
   - 使用 `openDiffEditor` 作为 preview
4. 在 Execute 阶段：

   - 严格按确认结果执行
   - 使用结构化编辑 API
5. 返回简洁、结构化的执行结果

***

## 十、小结

- `ScriptEditorProvider` 是 Assistant Tool 与脚本编辑器之间的桥梁
- 它提供 **受控、结构化、可预览** 的文件操作能力
- 编辑器类工具应优先考虑用户可理解性与可回滚性
- 结合 Approval + preview，可以构建高信任度的编辑体验
