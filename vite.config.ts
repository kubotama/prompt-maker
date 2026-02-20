import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import tailwindcss from "@tailwindcss/vite";
import { viteSingleFile } from "vite-plugin-singlefile";

export default defineConfig({
  plugins: [
    react(),
    tailwindcss(),
    viteSingleFile(), // これがJSやCSSをHTMLに埋め込みます
  ],
  // 念のため相対パス設定も入れておきます
  base: "./",
});
