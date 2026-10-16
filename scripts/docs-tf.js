import fs from "fs";
import path from "path";
import { zip } from "compressing";

const version = "TestFlight";

const resourcePath = path.join(__dirname, "..", "scripting", version, "Scripting Documentation");

const docsPath = path.join(__dirname, "..", "docs");
const base = "guide";

// The app uses resource paths; the website uses titles from doc.json.
// A resource can appear in several places, so prefer its main API page
// over a copy in Changelog when resolving cross-references.
const readmePages = new Map();
function indexReadmePages(items, parentPath = "") {
  for (const item of items) {
    const pagePath = path.posix.join(parentPath, item.title.en);
    if (item.children?.length) {
      indexReadmePages(item.children, pagePath);
    } else if (item.readme) {
      const resource = path.posix.normalize(item.readme).replace(/\/$/, "");
      const previous = readmePages.get(resource);
      if (!previous || previous.startsWith("Changelog/")) {
        readmePages.set(resource, pagePath + (item.example ? "/index.md" : ".md"));
      }
    }
  }
}

function websiteReadme(content, readme, language, outputPath) {
  // Leave fenced examples untouched; only convert Markdown destinations.
  return content.split(/(^[ \t]*(`{3,}|~{3,})[^\n]*\n[\s\S]*?^[ \t]*\2[ \t]*$)/gm)
    .filter((_, index) => index % 3 !== 2)
    .map((section, index) => index % 2 ? section : section.replace(
      /(\]\(<?)([^\s<>)]*\.md)(#[^\s<>)]*)?(>?\))/g,
      (match, open, target, hash = "", close) => {
        if (/^(?:[a-z]+:|\/)/i.test(target)) return match;
        const source = path.posix.join(readme, language + ".md");
        const candidates = [
          path.posix.normalize(path.posix.join(path.posix.dirname(source), target)),
          path.posix.normalize(target), // Legacy app-root references.
        ];
        for (const candidate of candidates) {
          if (!candidate.endsWith("/" + language + ".md")) continue;
          const page = readmePages.get(path.posix.dirname(candidate));
          if (!page) continue;
          const destination = path.join(docsPath, version, language, base, page);
          let relative = path.relative(path.dirname(outputPath), destination).split(path.sep).join("/");
          if (!relative.startsWith(".")) relative = "./" + relative;
          return open + relative.split("/").map(encodeURIComponent).join("/") + hash + close;
        }
        return match;
      },
    )).join("");
}

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

${websiteReadme(readmeContent, readme, language, basePath + ".md")}`;
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
        
${websiteReadme(readmeContent, readme, language, path.join(basePath, "index.md"))}`;

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
    path.join(__dirname, "..", "scripting", version, "Scripting Documentation.zip"),
    path.join(__dirname, "..", "scripting", version),
  );

  const docJson = JSON.parse(readFile(path.join(resourcePath, "doc.json")));
  indexReadmePages(docJson);
  for (const language of ["en", "zh"]) {
    fs.rmSync(path.join(docsPath, version, language, base), { recursive: true, force: true });
  }
  docJson.forEach((item) => processLanguages(item));
})().catch((e) => {
  console.error(e);
  process.exitCode = 1;
});
