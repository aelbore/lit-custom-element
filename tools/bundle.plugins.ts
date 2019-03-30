import * as path from 'path';

const typescript2 = require('rollup-plugin-typescript2');
const resolve = require('rollup-plugin-node-resolve');
const commonjs =  require('rollup-plugin-commonjs')

import { rollupBuild } from './utils';
import { clean } from 'aria-fs';

const rollupConfig = {
  inputOptions: {
    treeshake: true,
    input: path.resolve('plugins/style-transform.ts'),
    external: [
      'magic-string',
      'typescript',
      'path',
      'fs'
    ],
    plugins: [
      typescript2({
        tsconfigDefaults: { 
          compilerOptions: { 
            target: 'es2015', 
            module: 'esNext', 
            moduleResolution: 'node',
            declaration: true,
            outDir: 'dist',
            lib: [ "dom", "es2015", "es2017" ]
          },
          exclude: [ 'tests', 'examples', 'src', 'tools' ]
        },
        check: false,
        cacheRoot: path.join(path.resolve(), 'node_modules/.tmp/.rts2_cache'), 
        useTsconfigDeclarationDir: false
      }),
      resolve(),
      commonjs()   
    ]
  },
  outputOptions: {
    sourcemap: false,
    file: 'dist/plugins/style-transform.js',
    format: 'cjs'
  }  
}

clean('dist/plugins')
  .then(() => rollupBuild(rollupConfig))