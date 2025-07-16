---
title: V2.1.1
published_at: 2025-07-15 08:00:00
---

# Changelog

:::details{title=Recent Major Updates}

**Assistant Tools Migration**

-   Most importantly, assistant tools have been fully migrated to scripts. You can now **directly create assistant tool scripts through the assistant**, unlocking new levels of flexibility and automation.

**Easier Script Saving from Other Apps**

-   You can now quickly save scripts to the Scripting App from other apps like browsers.

**Widget Preview Enhancements**

-   Widgets in the preview page are now interactive and properly refresh their UI, providing a more accurate and testable preview experience.

**Script Execution & URL Schemes**

-   Added `Script.createDocumentationURLScheme` and `Script.createRunSingleURLScheme` to generate custom deep links for your scripts.
-   `Script.run(options)` now supports the `singleMode` parameter to control script execution mode.
-   The "Run in App" action in the Shortcuts app also supports configuring `singleMode`.

:::

## 2.1.6

**Assistant Features Update**

-   Introduced custom role mode: Define unique roles for assistants beyond coding support.
-   Directly @mention assistant tools in the input box for faster interaction.
-   Scripts are now automatically saved to the `scripts` folder under the Scripting App's documents folder for easier access and organization.

**Bug Fixes**

-   Fixed the issue where **file bookmarks weren't working properly**
-   Resolved documentation errors to improve clarity and accuracy
