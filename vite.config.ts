import { defineConfig } from "vite";
import { resolve } from "node:path";
import dts from "vite-plugin-dts";

export default defineConfig({
    build: {
        lib: {
            entry: resolve(__dirname, "src/array-mixer.ts"),
            name: "ArrayMixer",
            fileName: (format) => (
                format === "cjs" ? "array-mixer.cjs" : `array-mixer.${format}.js`
            ),
            formats: ["es", "cjs", "umd"],
        },
        sourcemap: true,
        minify: "esbuild",
        outDir: "release",
        emptyOutDir: true,
    },
    plugins: [
        dts({
            rollupTypes: true,
            include: ["src/array-mixer.ts"],
        }),
    ],
    test: {
        include: ["src/**/*.test.ts"],
        coverage: {
            provider: "v8",
            include: ["src/array-mixer.ts"],
            reporter: ["text", "lcov", "html"],
        },
    },
});
