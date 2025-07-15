import * as path from "node:path";
import { pluginRss } from "@rspress/plugin-rss";
import { defineConfig } from "rspress/config";

const siteUrl = "https://scriptingapp.github.io";

export default defineConfig({
    root: path.join(__dirname, "docs"),
    // outDir: "public",
    title: "Scripting",
    icon: "/icon.png",
    logo: "/logo.png",
    logoText: "Scripting",
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
                    id: "changelog-zh",
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
});
