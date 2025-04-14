import { mkdir, writeFile } from "node:fs/promises";
import { join, dirname } from "node:path";

// 生成文档结构的主函数
async function generateDocs(docEntries, basePath) {
    for (const entry of docEntries) {
        await processEntry(entry, basePath);
    }
}

// 处理单个文档条目
async function processEntry(entry, currentPath) {
    const hasContent = entry.readme || entry.example;
    const hasChildren = entry.children?.length > 0;

    // 生成两种语言的文档
    await generateForLanguage("zh", entry, currentPath, hasContent, hasChildren);
    await generateForLanguage("en", entry, currentPath, hasContent, hasChildren);

    // 递归处理子条目（修复路径生成逻辑）
    if (hasChildren) {
        for (const child of entry.children) {
            // 仅在父级没有内容时才创建子目录
            const childPath = hasContent
                ? currentPath // 保持当前路径
                : join(currentPath, entry.title.zh || entry.title.en);
            await processEntry(child, childPath);
        }
    }
}

async function generateForLanguage(lang, entry, path, hasContent, hasChildren) {
    // 修复路径生成逻辑：移除多余的 "guide/docs" 拼接
    const langPath =
        hasChildren && !hasContent
            ? join(path, lang, "guide/docs", entry.title[lang] || entry.title.en)
            : join(path, lang, "guide/docs");

    const title = entry.title[lang] || entry.title.en;

    if (hasContent) {
        // 生成 .mdx 文件（文件扩展名需从 .md 改为 .mdx）
        const mdContent = await generateMarkdown(entry, lang);
        await writeFileWithDir(join(langPath, `${title}.mdx`), mdContent);

        // 更新 _meta.json
        const metaPath = join(langPath, "_meta.json");
        const existingMeta = (await safeReadJson(metaPath)) || [];

        const newMeta = existingMeta.concat({
            type: "file",
            name: title,
            label: title,
        });

        await writeFileWithDir(metaPath, JSON.stringify(newMeta, null, 2));
    }

    // 处理子目录元数据
    if (!hasContent && hasChildren) {
        // 确保目录存在
        await writeFileWithDir(join(langPath, "_placeholder"), "");
    }
}

// 新增辅助函数：安全读取 JSON
async function safeReadJson(path) {
    try {
        return JSON.parse(await Bun.file(path).text());
    } catch {
        return null;
    }
}

// 生成 Markdown 内容
async function generateMarkdown(entry, lang) {
    let content = "---\n";
    content += `title: ${entry.title[lang]}\n`;
    if (entry.subtitle) content += `subtitle: ${entry.subtitle[lang]}\n`;
    content += "---\n\n";

    if (entry.readme) {
        // 生成 MDX 导入语句
        const importPath = join("Scripting Documentation", entry.readme, `${lang}.mdx`);
        content += `import Content from '${importPath}';\n\n`;
        content += "<Content />\n";
    }

    if (entry.example) {
        // 保持示例代码块不变
        content += `\`\`\`tsx:${entry.example}\n<!-- 转换示例文件内容 -->\n\`\`\``;
    }

    return content;
}

// 辅助函数：创建目录并写入文件
async function writeFileWithDir(path, content) {
    await mkdir(dirname(path), { recursive: true });
    await writeFile(path, content);
}

// 主执行流程
const docJson = JSON.parse(await Bun.file("./doc.json").text());
await generateDocs(docJson, "./docs");
