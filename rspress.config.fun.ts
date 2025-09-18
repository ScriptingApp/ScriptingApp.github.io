import { defineConfig } from "rspress/config";
import { config } from "./rspress.config";

config.base = "/doc_v2/";
config.outDir = "doc_build_fun";

export default defineConfig(config);
