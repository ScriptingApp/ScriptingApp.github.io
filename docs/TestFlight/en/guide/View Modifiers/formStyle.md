---
title: formStyle
description: The formStyle property allows you to customize the appearance and interaction of the Form view.

---

The `FormStyle` type defines how a form’s content is visually arranged and presented. By choosing a particular style, you can influence the layout of labels, controls, and sections within your form, providing a more organized and intuitive user experience.

## Overview

A `Form` view can contain various controls (such as text fields, toggles, pickers, etc.) arranged in rows. The `FormStyle` determines how these rows are displayed—whether labels and values line up in columns or if controls are grouped within visually distinct sections.

## Available Styles

- **`automatic`**: 
  Let the system choose the most appropriate style based on context. This is often a good default choice when you don’t have specific layout requirements.

- **`columns`**:
  Displays a non-scrolling form where labels appear in a trailing-aligned column on the left, and their associated values or controls appear in a leading-aligned column on the right. This style is well-suited for forms where alignment and quick scanning of label-value pairs is important.

- **`grouped`**:
  Organizes the form into visually grouped sections. Each row typically has a leading-aligned label and a trailing-aligned control. This style helps segment related input fields into distinct categories, making long or complex forms easier to navigate.

## Example Usage

**Columns Style**

```tsx
<Form formStyle="columns">
  <TextField
    title="First Name"
    value={firstName} 
    onChanged={setFirstName}
  />
  <TextField 
    title="Last Name" 
    value={lastName} 
    onChanged={setLastName} 
  />
  <Toggle 
    title="Subscribe" 
    value={subscribe} 
    onChanged={setSubscribe} 
  />
</Form>
```

In this layout, the labels (e.g., “First Name”, “Last Name”, “Subscribe”) appear in a neat column on one side, with their corresponding input fields or toggles aligned next to them.

**Grouped Style**

```tsx
<Form formStyle="grouped">
  <Section 
    header={
      <Text>Personal Information</Text>
    }>
    <TextField 
      title="Email" 
      value={email} 
      onChanged={setEmail} 
    />
    <TextField 
      title="Phone" 
      value={phone} 
      onChanged={setPhone} 
    />
  </Section>
  <Section 
    header={
      <Text>Settings</Text>
    }>
    <Toggle 
      title="Enable Notifications" 
      value={notificationsEnabled} 
      onChanged={setNotificationsEnabled} 
    />
    <Toggle 
      title="Auto-Update" 
      value={autoUpdate} 
      onChanged={setAutoUpdate} 
    />
  </Section>
</Form>
```

Here, fields are grouped into sections like “Personal Information” and “Settings.” Each section’s rows present a clear label and control pair, helping users understand the logical grouping of inputs.

**Automatic Style**

```tsx
<Form formStyle="automatic">
  <TextField 
    title="Username" 
    value={username} 
    onChanged={setUsername} 
  />
  <SecureField 
    title="Password" 
    value={password} 
    onChanged={setPassword} 
  />
</Form>
```

With `automatic`, the system picks a default style. This is a convenient option for simple forms or when you want to allow the system’s default styling to adapt to different contexts or platforms.

## Summary

- Use **`columns`** for a structured, two-column layout that makes scanning labels and values straightforward.
- Choose **`grouped`** for visually distinct sections that help users navigate more complex forms.
- Select **`automatic`** to let the system handle layout decisions, making it ideal for simpler or more adaptable interfaces.

By setting the `formStyle` on a `Form`, you can fine-tune the presentation to best suit your form’s complexity and user needs.