import * as esbuild from 'esbuild';
import paths from './config/paths';
import { getFilePaths } from './config/paths';

const collection = {};

Object.keys(paths).forEach((key) => {
  console.log(key, paths[key]);
  const files = getFilePaths(paths[key]);
  collection[key] = files;
});

console.log(collection);

console.log("Hello via Bun!");

let examplePlugin = {
  name: 'example',
  setup(build) {
    build.onResolve({ filter: /^example$/ }, async () => {
      const result = await build.resolve('./src', {
        kind: 'import-statement',
        resolveDir: './dist',
      })
      if (result.errors.length > 0) {
        return { errors: result.errors }
      }
      return { path: result.path, external: true }
    })
  },
}

await esbuild.build({
  entryPoints: ['src/sample.js'],
  bundle: true,
  outfile: 'dist/sample.js',
  logLevel: 'info',
  target: 'es2015',
  loader: { '.js': 'jsx', '.scss': 'css'},
  plugins: [examplePlugin],
  minify: true,
});