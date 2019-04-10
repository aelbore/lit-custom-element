import { join, resolve } from 'path'

const MagicString = require('magic-string')
const ts = require('typescript')

import { inlineStyles } from './inline-transformer'

const resolveId = importee => { 
  if (importee.includes('.css') || importee.includes('.scss')) return importee; 
  return null 
}

const loadById = id => { 
  if (id.includes('.css') || id.includes('.scss')) return '';  
  return null 
}

const transfileModule = (filePath, code) => {
  const { outputText, sourceMapText } = ts.transpileModule(code, {
    compilerOptions: {
      module: ts.ModuleKind.ES2015, 
      target: ts.ScriptTarget.ES2018,
      skipLibCheck: true,
      skipDefaultLibCheck: true,
      strictNullChecks: false,
      sourceMap: true
    },
    transformers: { 
      before: [ 
        inlineStyles(filePath) 
      ] 
    }
  }); 
  return { code: outputText, map: sourceMapText }
}

export function inlineCustomElement() {
  return {
    name: 'inlineCustomElement',    
    resolveId: resolveId,
    load: loadById,
    transform (code, id) {  
      const magicString = new MagicString(code);
      if (!id.includes(join(resolve(), 'node_modules'))) {
        return transfileModule(id, magicString.toString())
      }
      return { 
        code: magicString.toString(),
        map: magicString.generateMap({ hires: true })
      }
    }
  }
}