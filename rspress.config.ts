import { pluginRss } from "@rspress/plugin-rss";
import { defineConfig, UserConfig } from "rspress/config";
import ghPages from "rspress-plugin-gh-pages";

const siteUrl = "https://scriptingapp.github.io";

export const config: UserConfig = {
  // root: path.join(__dirname, "docs"),
  title: "Scripting",
  icon: "/icon.png",
  logo: "/logo.png",
  logoText: "Scripting",
  base: "/doc_v2/",
  route: {
    cleanUrls: true,
    extensions: [".md", ".mdx"],
  },
  search: {
    codeBlocks: true,
  },
  markdown: {
    showLineNumbers: true,
    defaultWrapCode: false,
  },
  plugins: [
    ghPages({
      repo: "https://github.com/ScriptingApp/ScriptingApp.github.io.git",
      branch: "deploy",
      // siteBase: "/doc_v2",
    }),
    pluginRss({
      siteUrl: siteUrl,
      feed: [
        {
          id: "changelog",
          test: "/guide/changelog/",
          title: "Scripting Changelog",
          language: "en-US",
        },
        {
          id: "changelog_zh",
          test: "/zh/guide/changelog/",
          title: "Scripting 更新日志",
          language: "zh-CN",
        },
      ],
      output: {
        dir: "feeds",
        type: "rss",
      },
    }),
  ],
  themeConfig: {
    // enableScrollToTop: true,
    // hideNavbar: "auto",
    // lastUpdated: true, // 是否显示最后更新时间
    locales: [
      {
        lang: "en",
        label: "English",
        lastUpdatedText: "Last Updated",
        outlineTitle: "Outline",
        prevPageText: "Previous Page",
        nextPageText: "Next Page",
        searchPlaceholderText: "Search",
        searchNoResultsText: "No results for",
        searchSuggestedQueryText: "Please try again with a different keyword",
        overview: {
          filterNameText: "Filter",
          filterPlaceholderText: "Enter keyword",
          filterNoResultText: "No matching API found",
        },
      },
      {
        lang: "zh",
        label: "简体中文",
        lastUpdatedText: "最后更新",
        outlineTitle: "大纲",
        prevPageText: "上一页",
        nextPageText: "下一页",
        searchPlaceholderText: "搜索",
        searchNoResultsText: "没有搜索结果",
        searchSuggestedQueryText: "请尝试使用不同的关键词",
        overview: {
          filterNameText: "筛选",
          filterPlaceholderText: "输入关键词",
          filterNoResultText: "没有找到匹配的 API",
        },
      },
    ],
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
      {
        icon: {
          svg: `
<svg xmlns="http://www.w3.org/2000/svg" viewBox="32 32 512 512" width="32" height="32" fill="currentColor">
  <mask id="mask-logo">
    <rect width="100%" height="100%" fill="white"/>
    <rect x="220" y="340" width="275" height="190" rx="50" ry="50" fill="black"/>
  </mask>
  <mask id="mask-text">
    <rect x="245" y="360" width="225" height="150" rx="40" ry="40" fill="white"/>
    <text x="357" y="480" font-size="120" font-weight="bold" text-anchor="middle" fill="black">EN</text>
  </mask>
  <path d="M128 416c0 17.7-14.3 32-32 32s-32-14.3-32-32
           14.3-32 32-32 32 14.3 32 32zm144 32c0-107.5-84.5-192-192-192v64
           c70.7 0 128 57.3 128 128h64zm96 0c0-159.1-128.9-288-288-288v64
           c123.7 0 224 100.3 224 224h64z"
        mask="url(#mask-logo)"/>
  <rect x="240" y="363" width="235" height="150" rx="40" ry="40"
        mask="url(#mask-text)"/>
</svg> 
                    `,
        },
        mode: "link",
        content: "https://scriptingapp.github.io/feeds/changelog.rss",
      },
      {
        icon: {
          svg: `
<svg xmlns="http://www.w3.org/2000/svg" viewBox="32 32 512 512" width="32" height="32" fill="currentColor">
  <mask id="mask-logo">
    <rect width="100%" height="100%" fill="white"/>
    <rect x="220" y="340" width="275" height="190" rx="50" ry="50" fill="black"/>
  </mask>
  <mask id="mask-text">
    <rect x="245" y="360" width="225" height="150" rx="40" ry="40" fill="white"/>
    <text x="357" y="480" font-size="120" font-weight="bold" text-anchor="middle" fill="black">ZH</text>
  </mask>
  <path d="M128 416c0 17.7-14.3 32-32 32s-32-14.3-32-32
           14.3-32 32-32 32 14.3 32 32zm144 32c0-107.5-84.5-192-192-192v64
           c70.7 0 128 57.3 128 128h64zm96 0c0-159.1-128.9-288-288-288v64
           c123.7 0 224 100.3 224 224h64z"
        mask="url(#mask-logo)"/>
  <rect x="240" y="363" width="235" height="150" rx="40" ry="40"
        mask="url(#mask-text)"/>
</svg> 
                    `,
        },
        mode: "link",
        content: "https://scriptingapp.github.io/feeds/changelog_zh.rss",
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
