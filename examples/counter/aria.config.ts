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
          { src: './examples/counter/index.html', dest: './dist/counter' }
        ]
      })
    ]
  },
  output: {
    globals: {
      'lit-html': 'litHtml'
    }
  }
}