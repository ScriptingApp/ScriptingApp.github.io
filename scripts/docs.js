import fs from "fs";
import path from "path";

const resourcePath = path.join(__dirname, "..", "Scripting Documentation");
const docsPath = path.join(__dirname, "..", "docs");

const proTag =
  "<span style={{ backgroundColor:'#007bff',color:'white',borderRadius:'6px',padding:'2px 6px',fontSize:'0.7em',marginLeft:'8px'}}>PRO</span>";

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

const base = "doc_v2";
// 处理文件
const processDocItem = (item, parentPath = "", language = "en") => {
  const { pro, title, subtitle, keywords, example, readme, children } = item;

  const proDesc = pro
    ? proTag +
      "\n\n" +
      `<small
  style={{
    display: "block",
    color: "#666",
    marginTop: "-4em",
  }}>
  ${language === "en" ? "Requires Scripting PRO" : "需要 Scripting PRO"}
</small>`
    : "";

  const folderName = title.en;
  const basePath = path.join(
    docsPath,
    language,
    "guide",
    base,
    parentPath,
    folderName
  );

  // 生成 _meta.json
  const metaPath = path.join(
    path.join(docsPath, language, "guide", base, parentPath),
    "_meta.json"
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
    });
    writeFile(metaPath, JSON.stringify(metaJson, null, 2));
  } else {
    metaJson.push({
      type: "file",
      name: folderName,
      label: title[language],
    });
    writeFile(metaPath, JSON.stringify(metaJson, null, 2));
  }

  // 生成文档
  if (children && children.length > 0) {
    children.forEach((child) =>
      processDocItem(child, path.join(parentPath, folderName), language)
    );
  } else {
    if (readme) {
      if (!example) {
        const readmePath = path.join(resourcePath, readme, language + ".md");
        const readmeContent = readFile(readmePath);
        if (!readmeContent) return;

        const readmeMd = `# ${title[language]} ${proDesc}

${readmeContent}`;
        const cleanBasePath = basePath.endsWith(path.sep)
          ? basePath.slice(0, -1)
          : basePath;
        writeFile(cleanBasePath + ".mdx", readmeMd);
      } else {
        const readmePath = path.join(resourcePath, readme, language + ".md");
        const readmeContent = readFile(readmePath);
        if (!readmeContent) return;

        // 有 example
        const readmeMd = `# ${title[language]} ${proDesc}
        
${readmeContent}`;

        writeFile(path.join(basePath, "index.mdx"), readmeMd);
      }
    }

    if (example) {
      if (!readme) {
        const tsxContent = readFile(path.join(resourcePath, example + ".tsx"));
        if (!tsxContent) return;

        const exampleMd = `# ${title[language]} ${proDesc}

\`\`\`tsx
${tsxContent}
\`\`\``;

        const cleanBasePath = basePath.endsWith(path.sep)
          ? basePath.slice(0, -1)
          : basePath;
        writeFile(cleanBasePath + ".mdx", exampleMd);
      } else {
        const tsxContent = readFile(path.join(resourcePath, example + ".tsx"));
        if (!tsxContent) return;

        let exampleName = example.split("/").pop();
        let exampleTitle = language === "en" ? "Example" : "示例";

        // 此处添加 Pro Tag 会导致 MDX 渲染错误
        const exampleMd = `# ${exampleTitle}

\`\`\`tsx
${tsxContent}
\`\`\``;

        const fileSuffix = exampleName === "index" ? "_example" : "";
        writeFile(
          path.join(basePath, exampleName + fileSuffix + ".mdx"),
          exampleMd
        );
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
