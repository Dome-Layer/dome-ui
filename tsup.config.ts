import { defineConfig } from "tsup";

export default defineConfig([
  {
    entry: {
      index: "src/index.ts",
    },
    format: ["esm"],
    dts: true,
    external: ["react", "react-dom", "lucide-react"],
    banner: {
      js: '"use client";',
    },
    clean: true,
  },
  {
    entry: {
      utils: "src/utils.ts",
    },
    format: ["esm"],
    dts: true,
    external: ["react", "react-dom"],
    clean: false,
  },
  {
    entry: {
      "tailwind-preset": "src/tailwind-preset.ts",
    },
    format: ["esm", "cjs"],
    dts: true,
    clean: false,
  },
]);
