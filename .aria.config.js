const { inlineCustomElement } = require('./dist/plugins/inline-plugin')

module.exports = {
  rollupPlugins: [ 
    inlineCustomElement() 
  ]
}