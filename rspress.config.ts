import * as path from "node:path";
import { defineConfig, type UserConfig } from "@rspress/core";

// import ghPages from "rspress-plugin-gh-pages";

export const config: UserConfig = {
  root: path.join(__dirname, "docs"),
  // plugins: [
  //   ghPages({
  //     repo: "https://github.com/ScriptingApp/ScriptingApp.github.io.git",
  //     branch: "v2",
  //     nojekyll: true,
  //   }),
  // ],
  multiVersion: {
    default: "App Store",
    versions: ["App Store", "TestFlight"],
  },
  search: {
    versioned: true,
    codeBlocks: true,
  },
  // base: "/doc_v2/",
  title: "Scripting",
  icon: "/icon.png",
  logo: "/logo.png",
  logoText: "Scripting",
  ssg: false,
  llms: true,
  // Correct the chart links in the current App Store and TestFlight ZIPs.
  replaceRules: [
    { search: "[`LineChart`](#折线图)", replace: "[`LineChart`](#折线图linechart)" },
    { search: "[`AreaChart`](#面积图)", replace: "[`AreaChart`](#面积图areachart)" },
    {
      search: "[`RuleLineForLabelChart`](#标签参考线图)",
      replace: "[`RuleLineForLabelChart`](#标签参考线图rulelineforlabelchart)",
    },
    {
      search: "[`RuleLineForLabelChart`](#rulelineforlabelchart)",
      replace: "[`RuleLineForLabelChart`](#rulelineforlabelchart-dynamic-annotation)",
    },
  ],
  route: {
    cleanUrls: true,
  },
  themeConfig: {
    socialLinks: [
      {
        icon: "github",
        mode: "link",
        content: "https://github.com/ScriptingApp",
      },
      {
        icon: "X",
        mode: "link",
        content: "https://x.com/thomfang",
      },
    ],
  },
  lang: "en",
  locales: [
    {
      lang: "en",
      label: "English",
      title: "Rspress",
      description: "Static Site Generator",
    },
    {
      lang: "zh",
      label: "简体中文",
      title: "Rspress",
      description: "静态网站生成器",
    },
  ],
};

export default defineConfig(config);
