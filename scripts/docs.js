import fs from "fs";
import path from "path";
import { zip } from "compressing";

const version = "App Store";

const resourcePath = path.join(__dirname, "..", "scripting", version, "Scripting Documentation");

const docsPath = path.join(__dirname, "..", "docs");
const base = "guide";

function readFile(filePath) {
  try {
    return fs.readFileSync(filePath, "utf-8");
  } catch {
    return false;
  }
}

function writeFile(filePath, content) {
  fs.mkdirSync(path.dirname(filePath), { recursive: true });
  fs.writeFileSync(filePath, content, "utf-8");
}

// 处理文件
const processDocItem = (item, parentPath = "", language = "en") => {
  const { pro, title, subtitle, keywords, example, readme, children } = item;

  const folderName = title.en;
  const basePath = path.join(docsPath, version, language, base, parentPath, folderName);

  // 生成 _meta.json
  const metaPath = path.join(
    path.join(docsPath, version, language, base, parentPath),
    "_meta.json",
  );

  if (!fs.existsSync(metaPath)) {
    writeFile(metaPath, JSON.stringify([], null, 2));
  }
  const metaJsonContent = readFile(metaPath);
  if (!metaJsonContent) return;
  const metaJson = JSON.parse(metaJsonContent);

  if (children || (readme && example)) {
    metaJson.push({
      type: "dir",
      name: folderName,
      label: title[language],
      collapsible: true,
      collapsed: true,
      tag: pro ? "PRO" : undefined,
    });
    writeFile(metaPath, JSON.stringify(metaJson, null, 2));
  } else {
    metaJson.push({
      type: "file",
      name: folderName,
      label: title[language],
      tag: pro ? "PRO" : undefined,
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
        if (!readmeContent) return;

        const readmeMd = `---
title: ${title[language]}
${subtitle ? `description: ${subtitle[language]}` : ""}
${pro ? "tag: PRO" : ""}
---

${readmeContent}`;
        const cleanBasePath = basePath.endsWith(path.sep) ? basePath.slice(0, -1) : basePath;
        writeFile(cleanBasePath + ".md", readmeMd);
      } else {
        const readmePath = path.join(resourcePath, readme, language + ".md");
        const readmeContent = readFile(readmePath);
        if (!readmeContent) return;

        // 有 example
        const readmeMd = `---
title: ${title[language]}
${subtitle ? `description: ${subtitle[language]}` : ""}
${pro ? "tag: PRO" : ""}
---
        
${readmeContent}`;

        writeFile(path.join(basePath, "index.md"), readmeMd);
      }
    }

    if (example) {
      if (!readme) {
        const tsxContent = readFile(path.join(resourcePath, example + ".tsx"));
        if (!tsxContent) return;

        const exampleMd = `---
title: ${title[language]}
${subtitle ? `description: ${subtitle[language]}` : ""}
${pro ? "tag: PRO" : ""}
---

\`\`\`tsx
${tsxContent}
\`\`\``;

        const cleanBasePath = basePath.endsWith(path.sep) ? basePath.slice(0, -1) : basePath;
        writeFile(cleanBasePath + ".md", exampleMd);
      } else {
        const tsxContent = readFile(path.join(resourcePath, example + ".tsx"));
        if (!tsxContent) return;

        let exampleName = example.split("/").pop();
        let exampleTitle = language === "en" ? "Example" : "示例";

        const exampleMd = `---
title: ${exampleTitle}
${subtitle ? `description: ${subtitle[language]}` : ""}
${pro ? "tag: PRO" : ""}
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

(async () => {
  await zip.uncompress(
    path.join(__dirname, "..", "scripting", version, "Scripting Documentation.scripting"),
    path.join(__dirname, "..", "scripting", version, "Scripting Documentation"),
  );

  const docJson = JSON.parse(readFile(path.join(resourcePath, "doc.json")));
  docJson.forEach((item) => processLanguages(item));
})().catch((e) => console.error(e));
