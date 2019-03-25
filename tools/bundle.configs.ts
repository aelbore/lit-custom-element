import * as path from 'path';

import { litImportDeclationTransformer } from './lit-import-declation'

const MODULE_NAME = 'lit-custom-element';
const DEST_FOLDER = 'dist';

export const bundleConfigs = [
  {
    format: 'umd',
    file: path.join(DEST_FOLDER, 'bundles', `${MODULE_NAME}.umd.min.js`),
    external: [],
    declaration: true,
    sourcemap: true
  }, 
  {
    format: 'esm',
    file: path.join(DEST_FOLDER, `${MODULE_NAME}.es.js`),
    external: [ 'lit-html' ],
    declaration: false,
    sourcemap: false
  },
  {
    format: 'esm',
    file: path.join(DEST_FOLDER, `${MODULE_NAME}.js`),
    external: [ 'lit-html' ],
    declaration: true,
    sourcemap: true,
    tsBeforeTransformers: [
      litImportDeclationTransformer()
    ]
  }
]