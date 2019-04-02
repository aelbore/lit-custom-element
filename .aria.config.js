const styleTransform = require('./dist/plugins/style-transform')

module.exports = {
  rollupPlugins: [ 
    styleTransform() 
  ]
}