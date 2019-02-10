import * as path from 'path';
import * as util from 'util';
import * as fs from 'fs';

import { terser } from 'rollup-plugin-terser';
import { stripCode, rollupBuild } from './utils';
import { globFiles, clean } from 'aria-fs';

const typescript2 = require('rollup-plugin-typescript2');
const resolve = require('rollup-plugin-node-resolve');

const copyFileAsync = util.promisify(fs.copyFile)

const DEST_PATH = 'dist';
const SRC_FILES = 'src/**/*.ts';

const rollupConfig = ({ inputFile, outputFile }) => {
  return {
    inputOptions: {
      treeshake: true,
      input: inputFile,
      external: [],
      plugins: [
        typescript2({
          tsconfigDefaults: { 
            compilerOptions: { 
              target: 'es2015', 
              module: 'esNext', 
              moduleResolution: 'node',
              declaration: true,
              outDir: 'dist',
              paths: {
                "lit-custom-element": [ "dist" ]
              },
              lib: [ "dom", "es2015", "es2017" ]
            },
            exclude: [ 'tests' ],
            include: [ inputFile, SRC_FILES]
          },
          check: false,
          cacheRoot: path.join(path.resolve(), 'node_modules/.tmp/.rts2_cache'), 
          useTsconfigDeclarationDir: true
        }),         
        resolve(),
        stripCode(),
        terser()
      ]
    },
    outputOptions: {
      sourcemap: true,
      file: outputFile,
      format: 'esm'
    }
  }
}

(async function() {
  await globFiles('examples/**/index.ts')
  .then(files => files.map(file => file.replace(path.resolve() + path.sep, '')))
  .then(files => {
    return Promise.all(files.map(async inputFile => {
      const BASE_PATH = path.dirname(inputFile);
      const outputFile = path.join(DEST_PATH, BASE_PATH, `${BASE_PATH.split(path.sep)[1]}.js`)
      
      await clean(path.join(DEST_PATH, BASE_PATH))
      return rollupBuild(rollupConfig({ inputFile, outputFile }))
        .then(() => {
          const htmlFile = inputFile.replace('.ts', '.html');
          return copyFileAsync(htmlFile, path.join(DEST_PATH, htmlFile)) 
        })
    }))
  })
}())

