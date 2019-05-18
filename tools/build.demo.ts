import { resolve, join, sep, dirname } from 'path'
import { bundle, TSRollupConfig, terser, clean, globFiles, minifyHTML, copyFile } from 'aria-build'

import { inlineCustomElement } from '../dist/plugins/inline-plugin'

(async function() {
  const files = await globFiles('examples/**/index.ts')
    .then(files => files.map(file => file.replace(resolve() + sep, '')))
  
  await Promise.all(files.map(async input => {
    const BASE_PATH = dirname(input);
    const file = join('dist', BASE_PATH, `${BASE_PATH.split(sep)[1]}.js`)

    const options: TSRollupConfig = {
      input,
      plugins: [
        minifyHTML(),
        inlineCustomElement(),
        terser()
      ],
      output: {
        sourcemap: true,
        file,
        format: 'es'
      }
    }

    await clean(join('dist', BASE_PATH))
    await bundle(options)
    await copyFile(join(BASE_PATH, 'index.html'), join(dirname(file), 'index.html'))
  }))
})()