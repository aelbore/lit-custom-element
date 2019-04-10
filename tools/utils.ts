import { rollup } from 'rollup';
import { resolve, join } from 'path'

import MagicString from 'magic-string';

export function stripCode () {
  return {
    name: 'stripCode',
    transform (source, id) {
      let code = source.replace(/(\/\*([^*]|[\r\n]|(\*+([^*\/]|[\r\n])))*\*+\/)|(\/\/.*)/g, '')
      const magicString = new MagicString(code)
      let map = magicString.generateMap({hires: true})
      return {code, map}
    }
  }
}

export const typescript2Config = {
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
  cacheRoot: join(resolve(), 'node_modules/.tmp/.rts2_cache'), 
  useTsconfigDeclarationDir: false
}

export function rollupBuild({ inputOptions, outputOptions }): Promise<any> {
  return rollup(inputOptions).then(bundle => bundle.write(outputOptions));
}