import * as path from "node:path";
import { defineConfig } from "rspress/config";

export default defineConfig({
    root: path.join(__dirname, "docs"),
    // outDir: "public",
    title: "Scripting",
    icon: "/scripting-icon.png",
    logo: {
        light: "/scripting-icon.png",
        dark: "/scripting-icon.png",
    },
    logoText: "Scripting",
    search: {
        codeBlocks: true,
    },
    themeConfig: {
        // enableScrollToTop: true,
        // hideNavbar: "auto",
        locales: [
            {
                lang: "en",
                label: "English",
                outlineTitle: "Outline",
                searchPlaceholderText: "Search",
                searchNoResultsText: "No results for",
                searchSuggestedQueryText: "Please try again with a different keyword",
                overview: {
                    filterNameText: "Filter",
                    filterPlaceholderText: "Enter keyword",
                    filterNoResultText: "No matching API found",
                },
                prevPageText: "Previous Page",
                nextPageText: "Next Page",
            },
            {
                lang: "zh",
                label: "简体中文",
                outlineTitle: "大纲",
                searchPlaceholderText: "搜索",
                searchNoResultsText: "没有搜索结果",
                searchSuggestedQueryText: "请尝试使用不同的关键词",
                overview: {
                    filterNameText: "筛选",
                    filterPlaceholderText: "输入关键词",
                    filterNoResultText: "没有找到匹配的 API",
                },
                prevPageText: "上一页",
                nextPageText: "下一页",
            },
        ],
        socialLinks: [
            {
                icon: "github",
                mode: "link",
                content: "https://github.com/thomfang",
            },
            {
                icon: "X",
                mode: "link",
                content: "https://x.com/thomfang",
            },
        ],
    },
    route: {
        cleanUrls: true,
    },
    markdown: {
        showLineNumbers: true,
        defaultWrapCode: false,
    },
    lang: "zh",
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
});
