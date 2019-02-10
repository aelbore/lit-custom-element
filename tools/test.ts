import * as karma from 'karma'
import * as path from 'path'

const CONFIG_FILE_PATH = path.resolve(path.join('tools', 'karma.config.ts'))

const server = new karma.Server({  
  configFile: CONFIG_FILE_PATH,
  singleRun: true
})

server.start()