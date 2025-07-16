# Scripting 官方文档项目

## 项目简介

通过 `Scripting Documentation` (Scripting App 默认脚本) 生成官网的工程

## 快速开始

1. 将 `Scripting Documentation` (Scripting App 默认脚本) 放入项目根目录
2. 运行文档生成命令：

```bash
bun run docs
```

## 修改更新日志

以中文更新日志为例

若 `docs/zh/guide/changelog/2.1.1.md` 为最新版文档需，则修改 `docs/zh/guide/\_meta.json` 和 `docs/zh/\_meta.json` 中 `changelog/` 后的版本号为 `2.1.1`
