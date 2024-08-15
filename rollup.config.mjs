import { defineConfig } from 'rollup';
import swc from '@rollup/plugin-swc';

export default defineConfig({
  input: 'src/index.ts',
  output: [
    {
      file: 'dist/cjs/lib.cjs',
      format: 'cjs',
      exports: 'named',
    },
    {
      file: 'dist/mjs/lib.js',
      format: 'es',
    },
  ],
  plugins: [swc()],
});
