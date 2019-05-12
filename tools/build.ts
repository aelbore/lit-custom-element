import { bundle, TSRollupConfig, terser } from 'aria-build'
import { clean } from 'aria-fs'

(async function() {

  const options: Array<TSRollupConfig> = [
    {
      input: './src/index.ts',
      external: [
        'lit-html'
      ],
      output: {
        format: 'es',
        file: './dist/lit-custom-element.es.js'
      },
      tsconfig: {
        compilerOptions: {
          declaration: true
        }
      }
    },
    {
      input: './src/index.ts',
      plugins: [
        terser()
      ],
      output: {
        format: 'es',
        sourcemap: true,
        file: './dist/lit-custom-element.js'
      }
    },
    {
      input: './src/index.ts',
      plugins: [
        terser()
      ],
      output: {
        sourcemap: true,
        format: 'umd',
        file: './dist/bundles/lit-custom-element.umd.js',
        name: 'litCustomElement'
      }
    },
    {
      input: './plugins/inline-plugin.ts',
      external: [
        'magic-string',
        'typescript'
      ],
      output: {
        file: 'dist/plugins/inline-plugin.js',
        format: 'cjs'
      }
    } 
  ]

  await clean('dist')
  await bundle(options)
})()