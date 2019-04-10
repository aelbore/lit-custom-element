
import * as path from 'path'
import * as fs from 'fs'

const ts = require('typescript')

const getStyles = (tsFilePath, statements) => {
  const buildSass = (srcFile: string, sass: any) => {
    const options = {
      data: fs.readFileSync(srcFile, 'utf8'),
      file: srcFile,
      outputStyle: 'compressed'
    }
    return sass.renderSync(options).css.toString() 
  }

  const compileStyle = (statement, cssFullPath) => {
    return statement.moduleSpecifier.getText().includes('.scss')
      ? buildSass(cssFullPath, require('node-sass'))
      : fs.readFileSync(cssFullPath, 'utf8') 
  }

  const cssStatements = statements.filter(statement => {
    return ts.isImportDeclaration(statement) 
      && (statement.moduleSpecifier.getText().includes('.css')
        || statement.moduleSpecifier.getText().includes('.scss')) 
  })

  if (cssStatements) {
    return cssStatements
      .map(statement => {
        const cssRelativePath = statement.moduleSpecifier.getText().replace(/'/g, '')
        const cssFullPath = path.resolve(path.dirname(tsFilePath), cssRelativePath)
        return compileStyle(statement, cssFullPath)
      })   
  }
  
  return []
}

const createTemplateSpans = (templateSpans, styles) => {
  let lastSpan;
  if (templateSpans.length > 0) {
    lastSpan = templateSpans[templateSpans.length - 1]
  }

  if (lastSpan) {
    const spans = templateSpans.filter(span => {
      return !(span.literal.getText().includes(lastSpan.literal.getText()))
    })
    return [ 
      ...spans, 
      ts.createTemplateSpan( 
        lastSpan.expression, 
        ts.createTemplateTail(lastSpan.literal.text + styles.replace(/\n/gm, ''))
      ) 
    ]
  }

  return [ ...templateSpans ]
}

const updateRenderMethod = (statement, styles) => {
  let renderMethod = statement.members.find(member => {
    return ts.isMethodDeclaration(member)
      && member.getText().includes('render')
  })

  if (renderMethod) {
    const statement = renderMethod.body.statements[0]
    const template = statement.expression.template

    const cssStyles = `<style>${styles.join('\n')}</style>`

    const statements = [ 
      ts.updateReturn(statement,
        ts.updateTaggedTemplate(statement, 
          statement.expression.tag, 
          ts.updateTemplateExpression(
            template, 
            template.head, 
            createTemplateSpans(template.templateSpans, cssStyles)
          ))
      ) 
    ] 

    renderMethod = ts.updateMethod(
      renderMethod, 
      renderMethod.decorators, 
      renderMethod.modifiers,
      undefined, 
      renderMethod.name,
      undefined,
      undefined, 
      [], 
      undefined, 
      ts.updateBlock(renderMethod.body, [ ...statements ])
    )
  }

  const members = statement.members.filter(member => {
    return (!(member.getText().includes('render')))
  })

  return [ ...members, renderMethod ]
}

const getStatements = (statements, styles) => {
  return statements.map(statement => {
    if (ts.isClassDeclaration(statement)) {
      if (styles && styles.length > 0) {
        /// @ts-ignore
        statement.members = updateRenderMethod(statement, styles)
      }
    }
    return statement
  }) 
}

export const inlineStyles = (filePath) => {
  return context => {
    const visitor = (node) => {
      if (Array.isArray(node.statements)) {
        node.statements = getStatements(node.statements, getStyles(filePath, node.statements))
      }
      return ts.visitEachChild(node, (child) => visitor(child), context);      
    }
    return visitor
  }
}