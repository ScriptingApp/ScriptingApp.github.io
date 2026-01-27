`Intent.continueInForeground` 用于在脚本从 Shortcuts 中后台执行时，**请求系统将流程转移到 Scripting App 的前台继续运行**。
此过程需要用户明确确认。

适用场景包括：

- 需要展示完整 UI（如表单、列表、导航页面）
- 需要用户在 App 内进行交互操作
- 后续步骤无法在后台执行

调用此方法后，系统会弹出确认对话框：

- 用户 **允许** → Scripting App 打开到前台，脚本继续执行
- 用户 **取消** → 当前脚本立即终止
- 此行为完全由系统管理，开发者无需手动处理跳转流程

由于该能力基于 iOS 26 引入的 AppIntents 行为：

**该 API 只能在 iOS 26 及以上系统使用。**

***

# API 定义

```ts
function continueInForeground(
  dialog?: Dialog | null,
  options?: {
    alwaysConfirm?: boolean;
  }
): Promise<void>;
```

***

# 参数说明

## dialog?: Dialog | null

用于提示用户为什么需要切换到前台继续执行。

`Dialog` 的类型格式支持三种形式：

```ts
type Dialog =
  | string
  | { full: string; supporting: string }
  | { full: string; supporting: string; systemImageName: string }
  | { full: string; systemImageName: string };
```

示例：

```ts
"是否前往应用继续执行？";
```

或带辅助说明：

```ts
{
  full: "需要在应用中继续执行下一步操作",
  supporting: "接下来的步骤需要完整的 UI 交互。",
  systemImageName: "app"
}
```

若传入 `null`，系统可能不显示提示，仅直接触发系统确认（不推荐）。

***

## `options?: { alwaysConfirm?: boolean }`

用于控制系统是否每次都显示确认提示。

- `alwaysConfirm: false`（默认）
  系统一般会根据上下文自动判断是否需要确认。

- `alwaysConfirm: true`
  每次调用都会提示用户明确确认。

示例：

```ts
{
  alwaysConfirm: true;
}
```

***

# 执行流程

执行 `await Intent.continueInForeground(...)` 时：

1. 快捷指令执行暂停

2. 系统弹出确认对话框

3. 用户选择：

   - **确认** → 打开 Scripting App → 脚本继续
   - **取消** → 脚本立即终止

4. 后续脚本在 Scripting App 前台环境中继续执行

**注意：脚本不会在后台继续运行，必须等待用户操作。**

***

# 典型应用场景

推荐在以下场景调用：

- 需要展示完整的导航界面或交互表单（如示例中的 TextField）
- 需要使用 `Navigation.present` 呈现 UI
- 需要 App 内操作如：

  - 预览文件
  - 编辑长文本
  - 选择复杂数据
  - 多步骤流程

不推荐在以下情况使用：

- 单纯的数据处理，不需要 UI
- 简单操作已经可通过 SnippetIntent 完成

***

# 完整示例代码

以下示例展示如何从 Shortcuts 通过 `continueInForeground` 切换到 Scripting App 前台，然后展示 UI 让用户输入文本，输入结束后再返回 Shortcuts。

```tsx
// intent.tsx
import {
  Button,
  Intent,
  List,
  Navigation,
  NavigationStack,
  Script,
  Section,
  TextField,
  useState,
} from "scripting";

function View() {
  const dismiss = Navigation.useDismiss();
  const [text, setText] = useState("");

  return (
    <NavigationStack>
      <List navigationTitle="Intent Demo">
        <TextField title="Enter a text" value={text} onChanged={setText} />

        <Section>
          <Button
            title="Return Text"
            action={() => {
              dismiss(text);
            }}
            disabled={!/\S+/.test(text)}
          />
        </Section>
      </List>
    </NavigationStack>
  );
}

async function runIntent() {
  // 请求系统将执行流程切换到 Scripting App 前台
  await Intent.continueInForeground("Do you want to open the app and continue?");

  // 在前台呈现交互式 UI，用户填写文本
  const text = await Navigation.present<string | null>(<View />);

  // 可选：返回到快捷指令界面
  Safari.openURL("shortcuts://");

  // 返回结果给 Shortcuts
  Script.exit(Intent.text(text ?? "No text return"));
}

runIntent();
```

***

# 注意事项与最佳实践

- **必须运行在 iOS 26+**，否则会抛出异常或行为不可用。
- 若脚本依赖用户输入、复杂 UI 或操作，请使用该 API 触发前台模式。
- 对话内容应清晰说明需要用户切换前台的原因，提升用户信任度。
- 若用户拒绝，脚本将终止，开发者无需自行处理取消逻辑。
- 可以与 SnippetIntent 结合，构建完整的后台 UI + 前台 UI 混合流程。
