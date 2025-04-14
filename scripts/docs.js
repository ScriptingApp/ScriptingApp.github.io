import { mkdir, writeFile } from "node:fs/promises";
import { join, dirname } from "node:path";

// 生成文档结构的主函数
async function generateDocs(docEntries, basePath) {
    for (const entry of docEntries) {
        await processEntry(entry, basePath);
    }
}

// 处理单个文档条目
// 修改 processEntry 函数中的路径逻辑
async function processEntry(entry, currentPath) {
    const hasContent = entry.readme || entry.example;
    const hasChildren = entry.children?.length > 0;

    // 修改：所有包含children的条目都使用其title作为子目录
    const newPath = hasChildren ? join(currentPath, entry.title.zh || entry.title.en) : currentPath;

    await generateForLanguage("zh", entry, newPath, hasContent, hasChildren);
    await generateForLanguage("en", entry, newPath, hasContent, hasChildren);

    if (hasChildren) {
        for (const child of entry.children) {
            // 子条目继续在当前路径下生成
            await processEntry(child, newPath);
        }
    }
}

// 修改 generateForLanguage 中的路径生成逻辑
async function generateForLanguage(lang, entry, path, hasContent, hasChildren) {
    // 保持路径生成逻辑不变
    const langPath = join(path, lang, "guide/docs");
    const title = entry.title[lang] || entry.title.en;

    if (!hasContent && hasChildren) {
        const dirMetaPath = join(langPath, "_meta.json");
        const existingDirMeta = (await safeReadJson(dirMetaPath)) || [];

        // 添加目录类型元数据
        const newDirMeta = existingDirMeta.concat({
            type: "dir",
            name: title,
            label: title,
            children: entry.children.map((c) => ({
                type: "file",
                name: c.title[lang] || c.title.en,
                label: c.title[lang] || c.title.en,
            })),
        });
        await writeFileWithDir(dirMetaPath, JSON.stringify(newDirMeta, null, 2));
    }

    if (hasContent) {
        // 只有当 entry.readme 存在时才复制 Markdown 文件
        if (entry.readme) {
            const sourcePath = join("Scripting Documentation", entry.readme, `${lang}.md`);
            const targetPath = join(langPath, `${title}.md`);
            await copyMarkdownFile(sourcePath, targetPath);
        }

        // 更新父级元数据
        const metaPath = join(langPath, "_meta.json");
        const existingMeta = (await safeReadJson(metaPath)) || [];

        const newMeta = existingMeta.concat({
            type: "file",
            name: title,
            label: title,
        });
        await writeFileWithDir(metaPath, JSON.stringify(newMeta, null, 2));
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
// 修改生成 Markdown 内容中的导入路径
async function generateMarkdown(entry, lang) {
    let content = "---\n";
    content += `title: ${entry.title[lang]}\n`;
    if (entry.subtitle) content += `subtitle: ${entry.subtitle[lang]}\n`;
    content += "---\n\n";

    if (entry.readme) {
        // 修改为相对路径引用
        const importPath = `./${entry.title[lang] || entry.title.en}.md`;
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

// 辅助函数：复制 Markdown 文件
async function copyMarkdownFile(sourcePath, targetPath) {
    try {
        const content = await Bun.file(sourcePath).text();
        await writeFileWithDir(targetPath, content);
    } catch (error) {
        console.error(`Error copying file: ${sourcePath}`, error);
    }
}

// 主执行流程
const docJson = JSON.parse(await Bun.file("./doc.json").text());
await generateDocs(docJson, "./docs");
