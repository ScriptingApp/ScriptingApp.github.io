---
title: 表单样式

---

通过设置 `FormStyle`，你可以定义表单内容的视觉排列方式和呈现方式，从而提供更清晰、更直观的用户体验。

---

## 概述

一个 `Form` 视图可以包含多种控件（如文本框、切换开关、选择器等），以行的形式排列。`FormStyle` 决定了这些行的显示方式——是标签和值分列对齐，还是控件以视觉上分组的形式显示。

---

## 可用样式

- **`automatic`**：  
  让系统根据上下文选择最适合的样式。这通常是一个不错的默认选择，适合没有特定布局需求的场景。

- **`columns`**：  
  显示一个不可滚动的表单，标签在左侧的列中右对齐，对应的值或控件在右侧的列中左对齐。这种样式非常适合需要清晰查看标签-值对的场景。

- **`grouped`**：  
  将表单组织成视觉上分组的部分。每行通常是左对齐的标签和右对齐的控件。这种样式有助于将相关的输入字段划分为不同的类别，适合较长或复杂的表单，方便用户导航。

---

## 使用示例

### **列样式 (Columns Style)**

```tsx
<Form formStyle="columns">
  <TextField
    title="名字"
    value={firstName} 
    onChanged={setFirstName}
  />
  <TextField 
    title="姓氏" 
    value={lastName} 
    onChanged={setLastName} 
  />
  <Toggle 
    title="订阅" 
    value={subscribe} 
    onChanged={setSubscribe} 
  />
</Form>
```

在此布局中，标签（如“名字”、“姓氏”、“订阅”）整齐地排列在一列中，输入字段或切换开关与其对应对齐。

---

### **分组样式 (Grouped Style)**

```tsx
<Form formStyle="grouped">
  <Section 
    header={
      <Text>个人信息</Text>
    }>
    <TextField 
      title="电子邮件" 
      value={email} 
      onChanged={setEmail} 
    />
    <TextField 
      title="电话" 
      value={phone} 
      onChanged={setPhone} 
    />
  </Section>
  <Section 
    header={
      <Text>设置</Text>
    }>
    <Toggle 
      title="启用通知" 
      value={notificationsEnabled} 
      onChanged={setNotificationsEnabled} 
    />
    <Toggle 
      title="自动更新" 
      value={autoUpdate} 
      onChanged={setAutoUpdate} 
    />
  </Section>
</Form>
```

在此示例中，输入字段被分组为“个人信息”和“设置”两部分。每个部分的行都呈现为清晰的标签和控件对，帮助用户理解输入字段的逻辑分组。

---

### **自动样式 (Automatic Style)**

```tsx
<Form formStyle="automatic">
  <TextField 
    title="用户名" 
    value={username} 
    onChanged={setUsername} 
  />
  <SecureField 
    title="密码" 
    value={password} 
    onChanged={setPassword} 
  />
</Form>
```

使用 `automatic` 样式时，系统会选择默认样式。此选项适合简单表单或希望让系统根据不同上下文或平台自动调整样式的场景。

---

## 总结

- 选择 **`columns`** 用于结构化的两列布局，便于快速扫描标签和值。
- 选择 **`grouped`** 用于将控件分组成视觉上独立的部分，适合更复杂的表单。
- 选择 **`automatic`** 让系统自动处理布局决策，适合简单或需要适应多平台的界面。

通过在 `Form` 上设置 `formStyle`，你可以根据表单的复杂性和用户需求微调其显示方式，提供最佳的用户体验。