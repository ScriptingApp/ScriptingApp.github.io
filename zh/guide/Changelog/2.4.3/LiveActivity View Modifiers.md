# 实时活动（LiveActivity）修饰符

Scripting 支持与 SwiftUI 等效的 Live Activity 外观控制修饰符。这些修饰符专门用于 **锁屏（Lock Screen）中的 Live Activity 界面**，用于自定义背景色和系统动作按钮颜色。

通过为 Activity UI 中的 `content` 视图设置这些修饰符，可使 Live Activity 更符合品牌风格或特定活动主题。

***

## 修饰符定义

```ts
/**
 * 用于设置 Live Activity 在锁屏界面显示时的背景着色。
 */
activityBackgroundTint?: Color | {
  light: Color
  dark: Color
}

/**
 * 用于设置 Live Activity 在锁屏界面显示时，系统提供的辅助操作按钮的文本（前景）颜色。
 */
activitySystemActionForegroundColor?: Color | {
  light: Color
  dark: Color
}
```

***

## 属性说明

## 1. activityBackgroundTint

**类型：** `Color | { light: Color; dark: Color }`
**说明：**
设置 Live Activity 在锁屏界面显示时的背景 Tint。
这个颜色会影响系统渲染 Live Activity 主卡片的底色。

### 使用示例

- 使用品牌主色作为 Activity 背景
- 为不同活动提供独立主题色
- 让内容在亮色或深色背景下更易阅读

***

## 2. activitySystemActionForegroundColor

**类型：** `Color | { light: Color; dark: Color }`
**说明：**
设置系统在锁屏的 Live Activity 卡片旁显示的“辅助操作按钮”的文本前景色。
这些操作按钮可能包括暂停、继续、停止等。

### 使用示例

- 在深色背景上显示浅色按钮文本
- 将关键操作按钮突出显示
- 使用和 UI 一致的主题色

***

## 示例：在 Live Activity UI Builder 中使用

Live Activity 的 UI builder 必须返回包含多个区域（content / compactLeading / compactTrailing / minimal等）的对象结构。

以下示例展示了如何在 **content** 区域中使用这两个修饰符：

```tsx
function ActivityView() {
  <LiveActivityUI
    content={
      <ContentView
        activityBackgroundTint={"blue"}
        activitySystemActionForegroundColor={"white"}
      />
    }
    compactLeading={...}
    compactTrailing={...}
    minimal={<Image systemName="clock" />}
  >
    <LiveActivityUIExpandedCenter>
      <ContentView />
    </LiveActivityUIExpandedCenter>
  </LiveActivityUI>
}
```

***

## 使用说明

- **修饰符仅在 Live Activity UI 中有效**，并且只影响 **锁屏界面** 的外观。
- 必须在 Live Activity UI builder 的 `content` 中使用。
- 如果不设置颜色，系统会使用默认样式。
