import * as path from "node:path";
import { defineConfig } from "@rspress/core";
import type { UserConfig } from "@rspress/shared";

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
  // base: "/doc_v2/",
  title: "Scripting",
  icon: "/icon.png",
  logo: "/logo.png",
  logoText: "Scripting",
  llms: true,
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
