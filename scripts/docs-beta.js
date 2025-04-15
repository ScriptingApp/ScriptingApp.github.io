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

    const folderName = title.en;
    const basePath = path.join(docsPath, language, "guide", "docs", parentPath, folderName);

    // 生成 _meta.json
    if (children && children.length > 0) {
        const metaPath = path.join(path.join(docsPath, language, "guide", "docs", parentPath), "_meta.json");
        if (!fs.existsSync(metaPath)) {
            writeFile(metaPath, JSON.stringify([], null, 2));
        }

        const metaJson = JSON.parse(readFile(metaPath));

        metaJson.push({
            type: "dir",
            name: folderName,
            label: title[language],
            collapsible: true,
            collapsed: true,
        });
        writeFile(metaPath, JSON.stringify(metaJson, null, 2));
    } else {
        const metaPath = path.join(path.join(docsPath, language, "guide", "docs", parentPath), "_meta.json");
        if (!fs.existsSync(metaPath)) {
            writeFile(metaPath, JSON.stringify([], null, 2));
        }

        const metaJson = JSON.parse(readFile(metaPath));

        metaJson.push({
            type: "file",
            name: folderName,
            label: title[language],
        });
        writeFile(metaPath, JSON.stringify(metaJson, null, 2));
    }

    // 生成文档
    if (children && children.length > 0) {
        children.forEach((child) => processDocItem(child, path.join(parentPath, folderName), language));
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
                const readmePath = path.join(resourcePath, readme, language + ".md");
                const readmeContent = readFile(readmePath);
                const readmeMd = `---
title: ${title[language]}
---\n${readmeContent}`;

                writeFile(path.join(basePath, "index.md"), readmeMd);
            }
        }

        if (example) {
            if (!readme) {
                const tsxContent = readFile(path.join(resourcePath, example + ".tsx"));
                const exampleMd = `---
title: ${title[language]}
---
\`\`\`tsx
${tsxContent}
\`\`\``;

                const cleanBasePath = basePath.endsWith(path.sep) ? basePath.slice(0, -1) : basePath;
                writeFile(cleanBasePath + ".md", exampleMd);
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
    const docJson = JSON.parse(readFile(path.join(resourcePath, "doc.json")));
    docJson.forEach((item) => processLanguages(item));
};

processDocs();
