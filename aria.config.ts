import { inlineCustomElement } from './plugins/inline-plugin'

export default {
  plugins: {
    before: [ 
      inlineCustomElement()
    ]
  }
}