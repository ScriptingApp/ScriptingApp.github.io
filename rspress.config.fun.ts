import { defineConfig } from "rspress/config";
import { config } from "./rspress.config";

// config.outDir = "fun";
config.base = "/doc_v2/";
config.plugins = config.plugins?.slice(1); // 禁用 ghPages

export default defineConfig(config);
