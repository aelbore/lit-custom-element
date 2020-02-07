import { inlineCustomElement } from './plugins/inline-plugin'

export default {
  test: {
    plugins: {
      before: [ inlineCustomElement() ]
    }
  }
}