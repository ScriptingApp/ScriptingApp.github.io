const fs = require("fs");
const path = require("path");

// 设置路径
const exampleDir = path.join(__dirname, "docs", "example");
const zhGuideDir = path.join(__dirname, "docs", "zh", "guide", "docs");
const enGuideDir = path.join(__dirname, "docs", "en", "guide", "docs");

// 递归遍历目录
function processDirectory(dirPath, langDir, langTitle) {
    // 读取目录中的文件
    const files = fs.readdirSync(dirPath);

    // 遍历目录中的所有文件
    files.forEach((file) => {
        const filePath = path.join(dirPath, file);
        const outputDir = path.join(langDir, path.relative(exampleDir, dirPath)); // 保持原目录结构

        // 如果是文件夹，则递归
        if (fs.statSync(filePath).isDirectory()) {
            processDirectory(filePath, langDir, langTitle);
        } else if (file.endsWith(".tsx")) {
            // 如果是TSX文件，则生成MDX
            generateMdxFile(filePath, outputDir, langTitle);
        }
    });
}

// 生成MDX文件的函数
function generateMdxFile(filePath, langDir, langTitle) {
    const fileName = path.basename(filePath, ".tsx");
    const mdxContent = fs.readFileSync(filePath, "utf-8"); // 读取TSX文件内容

    const title = langTitle; // 标题根据语言不同
    const mdx = `---
title: ${title}
---

\`\`\`tsx
${mdxContent}
\`\`\`
`;

    // 确保目录存在
    if (!fs.existsSync(langDir)) {
        fs.mkdirSync(langDir, { recursive: true });
    }

    // 输出的mdx文件路径
    const outputPath = path.join(langDir, fileName + ".mdx");

    // 将生成的MDX内容写入文件
    fs.writeFileSync(outputPath, mdx);
    console.log(`Generated: ${outputPath}`);
}

// 开始处理中文和英文的转换
processDirectory(exampleDir, zhGuideDir, "示例");
processDirectory(exampleDir, enGuideDir, "Example");
