import { inlineCustomElement } from '../../plugins/inline-plugin'
import { minifyHTML, copy } from 'aria-build'

export default {
  plugins: {
    before: [ 
      inlineCustomElement(),
      minifyHTML()
    ],
    after: [  
      copy({
        targets: [
          { src: './examples/hello-name/index.html', dest: './dist/hello-name' }
        ]
      })
    ]
  }
}