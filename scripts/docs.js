const fs = require("fs");
const path = require("path");

const resourcePath = path.join(__dirname, "..", "resources", "Scripting Documentation");
const docsPath = path.join(__dirname, "..", "docs");

const readFile = (filePath) => {
    return fs.readFileSync(filePath, "utf-8");
};

const writeFile = (filePath, content) => {
    fs.mkdirSync(path.dirname(filePath), { recursive: true });
    fs.writeFileSync(filePath, content, "utf-8");
};

// 处理文件
const processDocItem = (item, parentPath = "", language = "en") => {
    const { title, subtitle, keywords, example, readme, children } = item;

    const folderName = title[language]; // 使用当前语言来选择标题
    const basePath = path.join(docsPath, language, "guide", "docs", parentPath);

    // 如果有子文档，递归处理
    if (children && children.length > 0) {
        writeFile(path.join(basePath, folderName + ".md"), `# ${folderName}`);
        children.forEach((child) => processDocItem(child, path.join(parentPath, folderName), language));
    } else {
        // 没有子文档的文件，处理 example 和 readme
        if (example) {
            // 处理 example，将其转换为 MD 文件
            const tsxContent = readFile(path.join(resourcePath, example + ".tsx"));
            const exampleMd = `---
title: ${language === "zh" ? "示例" : "Example"}
---
\`\`\`tsx
${tsxContent}
\`\`\``;
            // 写入 index.md，文件名固定为 index.md
            writeFile(path.join(basePath, "example.md"), exampleMd);
        }

        if (readme) {
            // 处理 readme 文件，直接用对应语言的 .md 文件内容
            const readmePath = path.join(resourcePath, readme, language + ".md");
            try {
                const readmeContent = readFile(readmePath);

                // 为 readme 添加 title 块
                const readmeMd = `---
title: ${folderName}
---
${readmeContent}`;

                // 生成固定路径的 index.md 文件
                writeFile(path.join(basePath, "index.md"), readmeMd);
            } catch (err) {
                console.error(`Error reading readme file at ${readmePath}:`, err);
            }
        }
    }
};

// 处理多语言
const processLanguages = (docItem) => {
    processDocItem(docItem, "", "en");
    processDocItem(docItem, "", "zh");
};

// 读取 JSON 配置并开始处理
const processDocs = () => {
    const docJsonPath = path.join(resourcePath, "doc.json");
    const docJson = JSON.parse(readFile(docJsonPath));

    docJson.forEach((item) => processLanguages(item));
};

processDocs();
