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

    const folderName = title.en; // 使用语言来选择标题
    const basePath = path.join(docsPath, language, "guide", "docs", parentPath, folderName);

    if (children && children.length > 0) {
        // 处理包含子文档的文件夹
        writeFile(path.join(basePath, "index.md"), `# ${folderName}`);
        children.forEach((child) => processDocItem(child, path.join(parentPath, folderName), language));
    } else {
        // 处理没有子文档的文件
        if (example) {
            // 如果有example，将其转换为MD文件
            const tsxContent = readFile(path.join(resourcePath, example + ".tsx"));
            const exampleMd = `---
title: ${language === "en" ? "Example" : "示例"}
---
\`\`\`tsx
${tsxContent}
\`\`\``;
            writeFile(path.join(basePath, "example.md"), exampleMd); // 使用 index.md 作为文件名
        }

        if (readme) {
            // 根据语言选择正确的 readme 文件，并保存为 index.md
            const readmePath = path.join(resourcePath, readme, language + ".md"); // 选择对应语言的 .md 文件
            try {
                const readmeContent = readFile(readmePath);

                // 为 readme 文件添加 title 和 --- 块
                const readmeMd = `---
title: ${title[language]}
---\n${readmeContent}`;

                writeFile(path.join(basePath, "index.md"), readmeMd); // 使用 index.md 作为文件名
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
