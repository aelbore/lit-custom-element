import * as path from 'path'
import * as fs from 'fs'

const ts = require('typescript')

const createArrayLiteralStyles = (cssStyles) => {
  return ts.createArrayLiteral(
    cssStyles.map(cssStyle => ts.createNoSubstitutionTemplateLiteral(cssStyle))
  ) 
}

const createGetAssesorStaticStyle = (css) => {
  return ts.createGetAccessor(undefined, 
    [ ts.createModifier(ts.SyntaxKind.StaticKeyword) ], 
    ts.createIdentifier('styles'), 
    [], 
    undefined, 
    ts.createBlock(
      [ ts.createReturn(
         (css.length > 1)
          ? createArrayLiteralStyles(css)
          : ts.createNoSubstitutionTemplateLiteral(css[0])
        ) 
      ])
  )
}

const getStyles = (tsFilePath, statements)  => {
  const states = statements.filter(statement => {
    return ts.isImportDeclaration(statement) && statement.moduleSpecifier.getText().includes('.css') 
  })
  if (states) {
    return states
      .map(statement => {
        const cssRelativePath = statement.moduleSpecifier.getText().replace(/'/g, '')
        const cssFullPath = path.resolve(path.dirname(tsFilePath), cssRelativePath)
        return fs.readFileSync(cssFullPath, 'utf8')
      })
  }
  return []
}

const createStaticGetAccessor = (statement, styles) => {
  const members = [ ...statement.members ]
  const styleStaticGet = statement.members.find(member => {
    return ts.isGetAccessor(member) && member.getText().includes('styles')
  })
  if (styleStaticGet) {

  } else {
    members.push(createGetAssesorStaticStyle(styles))
  }
  return members
}

const removeImportStyles = (statements) => {
  return statements
    .filter(statement => {
      return !(ts.isImportDeclaration(statement) 
        && statement.moduleSpecifier.getText().includes('.css'))
    })
}

export function transformer(inputFile) {
  return context => {
    const visitor = (node) => {
      if (Array.isArray(node.statements)) {
        const styles = getStyles(inputFile, node.statements)
        node.statements.map(statement => {
          if (ts.isClassDeclaration(statement)) {
            if (styles && styles.length > 0) {
              /// @ts-ignore
              statement.members = [ 
                ...createStaticGetAccessor(statement, styles) 
              ]
            }
          }
          return statement
        })
        /// @ts-ignore
        node.statements = [ 
          ...removeImportStyles(node.statements) 
        ]
      }
      return ts.visitEachChild(node, (child) => visitor(child), context);
    }
    return visitor
  }
}