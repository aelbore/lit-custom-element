import * as path from 'path';
import * as util from 'util';
import * as fs from 'fs';

import { terser } from 'rollup-plugin-terser';
import { clean, mkdirp, globFiles } from 'aria-fs';

import { stripCode, rollupBuild } from './utils';
import { bundleConfigs } from './bundle.configs';

const typescript2 = require('rollup-plugin-typescript2');
const resolve = require('rollup-plugin-node-resolve');

const copyFileAsync = util.promisify(fs.copyFile)
const writeFileAsync = util.promisify(fs.writeFile)
const renameAsync = util.promisify(fs.rename);

const ENTRY_FILE = path.join('src', 'index.ts');
const MODULE_NAME = 'lit-custom-element';
const DEST_FOLDER = 'dist';

interface RollupConfig {
  format?: string;
  file?: string;
  external?: string[];
  sourcemap?: boolean;
  declaration?: boolean;
}

const rollupConfig = (configs: RollupConfig) => {
  const { format, file, external, sourcemap, declaration } = configs;

  const plugins = [
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
        exclude: [ 'examples', 'tests' ],
        include: [ ENTRY_FILE ]
      },
      check: false,
      cacheRoot: path.join(path.resolve(), 'node_modules/.tmp/.rts2_cache'), 
      useTsconfigDeclarationDir: declaration
    }),         
    resolve(),
    stripCode()
  ]  

  /// @ts-ignore
  if (configs.minify) {
    plugins.push(terser())
  }

  return {
    inputOptions: {
      treeshake: true,
      input: ENTRY_FILE,
      external: external,
      plugins: plugins
    },
    outputOptions: {
      sourcemap: sourcemap,
      exports: 'named',
      file: file,
      name: 'litCustomElement', 
      format: format
    }
  }
}

async function copyPackageFile() {
  const FILE_NAME = 'package.json';
  const pkg = require(`../${FILE_NAME}`);
  delete pkg.scripts;
  delete pkg.devDependencies;
  return writeFileAsync(`${DEST_FOLDER}/${FILE_NAME}`, JSON.stringify(pkg, null, 2))
}

async function moveDtsFiles() {
  const files = await globFiles(`${DEST_FOLDER}/*.d.ts`)
  mkdirp(`${DEST_FOLDER}/src`)
  return Promise.all(files.map(file => {
    const destFilePath = file.replace(path.resolve() + path.sep + DEST_FOLDER, `${DEST_FOLDER}/src`) 
    return renameAsync(file, destFilePath)
  }))
}

async function createTypings() {
  return writeFileAsync(
    path.join(DEST_FOLDER, `${MODULE_NAME}.d.ts`), 
    `export * from './src/index';`
  );
}

(async function() {
  await clean(DEST_FOLDER)

  await mkdirp(DEST_FOLDER)

  await Promise.all([
    copyPackageFile(),
    Promise.all(bundleConfigs.map(bundleConfig => {
      const config = rollupConfig(bundleConfig)
      return rollupBuild(config)
    })),
    copyFileAsync('README.md', `${DEST_FOLDER}/README.md`)
  ])

  await moveDtsFiles()
  await createTypings()
}())