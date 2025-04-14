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
const processDocItem = (item, parentPath = "", language = "en", length = 0) => {
    const { title, subtitle, keywords, example, readme, children } = item;

    const folderName = title.en;
    const basePath = path.join(docsPath, language, "guide", "docs", parentPath, folderName);

    if (children && children.length > 0) {
        children.forEach((child) =>
            processDocItem(child, path.join(parentPath, folderName), language, children.length)
        );
    } else {
        if (readme) {
            if (!example) {
                const readmePath = path.join(resourcePath, readme, language + ".md");
                const readmeContent = readFile(readmePath);
                const readmeMd = `---
title: ${title[language]}
---\n${readmeContent}`;

                const cleanBasePath = basePath.endsWith(path.sep) ? basePath.slice(0, -1) : basePath;

                writeFile(cleanBasePath + ".md", readmeMd);
            } else {
                // 根据语言选择正确的 readme 文件，并保存为 index.md
                const readmePath = path.join(resourcePath, readme, language + ".md"); // 选择对应语言的 .md 文件
                const readmeContent = readFile(readmePath);

                // 为 readme 文件添加 title 和 --- 块
                const readmeMd = `---
title: ${title[language]}
---\n${readmeContent}`;

                writeFile(path.join(basePath, "index.md"), readmeMd);
            }
        }

        if (example) {
            if (!readme) {
                const tsxContent = readFile(path.join(resourcePath, example + ".tsx"));
                let exampleName = example.split("/").pop();
                let exampleTitle = language === "en" ? "Example" : "示例";

                const exampleMd = `---
title: ${exampleTitle + " - " + title[language]}
---
\`\`\`tsx
${tsxContent}
\`\`\``;

                const cleanBasePath = basePath.endsWith(path.sep) ? basePath.slice(0, -1) : basePath;

                const fileSuffix = exampleName === "index" ? "_example" : "";

                writeFile(cleanBasePath + fileSuffix + ".md", exampleMd);
            } else {
                const tsxContent = readFile(path.join(resourcePath, example + ".tsx"));
                let exampleName = example.split("/").pop();
                let exampleTitle = language === "en" ? "Example" : "示例";

                const exampleMd = `---
title: ${exampleTitle}
---
\`\`\`tsx
${tsxContent}
\`\`\``;

                const fileSuffix = exampleName === "index" ? "_example" : "";

                writeFile(path.join(basePath, exampleName + fileSuffix + ".md"), exampleMd);
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
