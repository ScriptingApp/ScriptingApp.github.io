# Scripting 官方文档项目

## 项目简介

通过 `Scripting Documentation` (Scripting App 默认脚本) 生成网页文档，使用 [Rspress](https://rspress.dev/) 构建静态网站。

## 目录结构

```
.
├── .github/workflows    # GitHub Actions 部署配置
├── docs/                # 生成的文档目录
│   ├── App Store/       # App Store 版本文档
│   │   ├── en/          # 英文文档
│   │   └── zh/          # 中文文档
│   └── TestFlight/      # TestFlight 版本文档
├── scripting/           # Scripting App 脚本资源
│   ├── App Store/       # App Store 版本脚本
│   └── TestFlight/      # TestFlight 版本脚本
├── scripts/             # 文档生成脚本
│   ├── docs.js          # App Store 文档生成脚本
│   └── docs-tf.js       # TestFlight 文档生成脚本
├── package.json         # 项目依赖和脚本
├── rspress.config.ts    # Rspress 配置文件
└── README.md            # 项目说明文档
```

## 快速开始

### 前置要求

- [Bun](https://bun.sh/) (推荐) 或 Node.js
- Scripting App 默认脚本 "Scripting Documentation"

### 安装依赖

```bash
bun install
```

### 生成文档

1. 将 `Scripting Documentation` (Scripting App 默认脚本) 放入项目根目录并解压

2. 运行文档生成命令：

```bash
bun run generate:docs
```

3. 运行构建命令：

```bash
bun run build
```

### 本地预览

```bash
bun run dev
```

访问 http://localhost:5173 预览文档。

## 文档生成流程

1. **解压脚本**: 从 `scripting/App Store/Scripting Documentation.scripting` 解压脚本文件
2. **读取配置**: 从解压后的 `doc.json` 文件读取文档结构配置
3. **生成 Markdown**: 根据配置生成多语言 (en/zh) 的 Markdown 文档
4. **构建网站**: 使用 Rspress 将 Markdown 文件构建为静态网站

## 版本文档

项目支持两个版本的文档：

- **App Store**: 正式版文档 (默认)
- **TestFlight**: 测试版文档 (包含最新功能)

### 生成 TestFlight 文档

```bash
bun run generate:docs:tf
```

### 构建 TestFlight 文档

```bash
bun run build:fun
```

## 部署

文档通过 GitHub Actions 自动部署到 GitHub Pages。部署配置位于 `.github/workflows/` 目录。

### 手动部署

```bash
bun run deploy
```

## 技能系统 (Skills)

Scripting App 支持技能系统，允许扩展应用功能。技能是独立的脚本包，可以：

- 提供原生 API 封装
- 创建自定义 UI 组件
- 集成第三方服务
- 扩展自动化能力

### 技能仓库

官方技能维护在 [ScriptingApp/skills](https://github.com/ScriptingApp/skills) 仓库中。该仓库包含一系列即用型技能，用于扩展 Scripting App 的功能。

### 使用技能

在 Scripting App 中，技能可以通过以下方式使用：

1. **直接调用**: 在脚本中导入并使用技能提供的 API
2. **AI 集成**: AI 助手可以自动调用技能完成复杂任务
3. **自动化流程**: 在快捷指令中集成技能功能

## 项目维护

此文档项目由 Scripting App 开发者维护。如有文档相关的错误报告或功能请求，请在此仓库中提交 issue。

### 技能贡献

如果您想贡献新技能或改进现有技能，请访问 [ScriptingApp/skills](https://github.com/ScriptingApp/skills) 仓库，并按照该仓库的贡献指南进行操作。

## 相关项目

- [ScriptingApp/Community-Scripts](https://github.com/ScriptingApp/Community-Scripts) - 社区脚本分享
- [ScriptingApp/scripting-app-lib](https://github.com/ScriptingApp/scripting-app-lib) - Scripting App 库模块
- [ScriptingApp/Package-Manager](https://github.com/ScriptingApp/Package-Manager) - 包管理器

## 许可证

MIT License