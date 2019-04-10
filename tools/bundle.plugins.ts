import * as path from 'path';

const typescript2 = require('rollup-plugin-typescript2');
const resolve = require('rollup-plugin-node-resolve');
const commonjs =  require('rollup-plugin-commonjs')

import { rollupBuild, typescript2Config } from './utils';
import { clean } from 'aria-fs';

const INPUT_FILE = 'plugins/inline-plugin.ts'
const OUTPUT_FILE = 'dist/plugins/inline-plugin.js'

const rollupConfig = {
  inputOptions: {
    treeshake: true,
    input: INPUT_FILE,
    external: [
      'magic-string',
      'typescript',
      'path',
      'fs'
    ],
    plugins: [
      typescript2(typescript2Config),
      resolve(),
      commonjs()   
    ]
  },
  outputOptions: {
    sourcemap: false,
    file: OUTPUT_FILE,
    format: 'cjs'
  }  
}

clean('dist/plugins')
  .then(() => rollupBuild(rollupConfig))