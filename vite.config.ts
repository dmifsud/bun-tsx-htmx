// vite.config.ts
import { defineConfig, loadEnv } from "vite";
import path from "path";
import tailwindcss from "tailwindcss";
import autoprefixer from "autoprefixer";

export default ({ mode }: { mode: string }) => {
  const env = loadEnv(mode, process.cwd());

  return defineConfig({
    server: {
      port: Number(env.VITE_PORT),
    },
    build: {
      lib: {
        entry: path.resolve(__dirname, "frontend/main.ts"),
        name: "main",
        fileName: (format) => `main.${format}.js`,
      },
      outDir: "dist",
    },
    resolve: {
      alias: {
        "@": path.resolve(__dirname, "./frontend"),
      },
    },
    css: {
      postcss: {
        plugins: [tailwindcss, autoprefixer],
      },
    },
  });
};