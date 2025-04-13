const fs = require("fs");
const path = require("path");

// 获取项目根目录
const projectRoot = path.resolve(__dirname, ".."); // 假设脚本在 /scripts 目录下
const exampleDir = path.join(projectRoot, "docs", "example"); // 拼接成 /docs/example
const zhGuideDir = path.join(projectRoot, "docs", "zh", "guide", "docs");
const enGuideDir = path.join(projectRoot, "docs", "en", "guide", "docs");

// 打印路径调试
console.log("Example Directory:", exampleDir);

// 递归遍历目录
function processDirectory(dirPath, langDir, langTitle) {
    const files = fs.readdirSync(dirPath);

    files.forEach((file) => {
        const filePath = path.join(dirPath, file);
        const outputDir = path.join(langDir, path.relative(exampleDir, dirPath)); // 保持原目录结构

        if (fs.statSync(filePath).isDirectory()) {
            processDirectory(filePath, langDir, langTitle);
        } else if (file.endsWith(".tsx")) {
            generateMdxFile(filePath, outputDir, langTitle);
        }
    });
}

function generateMdxFile(filePath, langDir, langTitle) {
    const fileName = path.basename(filePath, ".tsx");
    const mdxContent = fs.readFileSync(filePath, "utf-8");

    const title = langTitle;
    const mdx = `---
title: ${title}
---

\`\`\`tsx
${mdxContent}
\`\`\`
`;

    if (!fs.existsSync(langDir)) {
        fs.mkdirSync(langDir, { recursive: true });
    }

    const outputPath = path.join(langDir, fileName + ".mdx");

    fs.writeFileSync(outputPath, mdx);
    console.log(`Generated: ${outputPath}`);
}

// 开始处理中文和英文的转换
processDirectory(exampleDir, zhGuideDir, "示例");
processDirectory(exampleDir, enGuideDir, "Example");
