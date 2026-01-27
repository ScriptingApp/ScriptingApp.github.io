import { defineConfig } from "@rspress/core";
import { config } from "./rspress.config";

config.outDir = "doc_build_fun";
config.base = "/doc_v2/";
config.plugins = config.plugins?.slice(1); // 禁用 ghPages

export default defineConfig(config);
