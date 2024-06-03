import * as esbuild from 'esbuild';
import {sassPlugin} from 'esbuild-sass-plugin';
import paths, {getFilePaths} from './config/paths';

const collection = {};

const log = (msg,...pattern) => {
  const decorated = `🚀 ${msg} 🚀`;
  return console.log(decorated, ...pattern);
};

// build collection of entry files from search criteria
Object.keys(paths).forEach((key) => {
  const files = getFilePaths(paths[key]);
  collection[key] = files;
});

log('#collection', collection);

console.log("Hello via Bun!");

for (const key in collection) {
  console.log(key, collection[key]);
  await esbuild.build({
    entryPoints: collection[key],
    bundle: true,
    outdir: 'dist',
    logLevel: 'info',
    target: 'es2015',
    loader: { '.js': 'jsx', '.scss': 'css'},
    plugins: [sassPlugin()],
    minify: true,
  });
}

// await esbuild.build({
//   entryPoints: collection,
//   bundle: true,
//   outdir: 'dist',
//   logLevel: 'info',
//   target: 'es2015',
//   loader: { '.js': 'jsx', '.scss': 'css'},
//   plugins: [sassPlugin()],
//   minify: true,
// });