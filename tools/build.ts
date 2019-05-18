import { bundle, TSRollupConfig, terser, clean } from 'aria-build'

(async function() {

  const options: TSRollupConfig[] = [
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