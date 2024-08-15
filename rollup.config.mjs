import { defineConfig } from "rollup";

export default defineConfig({
  input: 'src/index.ts',
  output: [
    {
      file: 'dist/cjs/lib.js',
      format: 'cjs'
    },
    {
      file: 'dist/mjs/lib.mjs',
      format: 'es'
    }
  ]
})
