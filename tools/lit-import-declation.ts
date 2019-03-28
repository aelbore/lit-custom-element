import * as ts from 'typescript'

const UNPKG_URL = 'https://unpkg.com/lit-html@1.0.0/lit-html.js'

export function litImportDeclationTransformer() {
  return (context) => {
    const visitor = (node) => {
      if (Array.isArray(node.statements)) {
        node.statements = node.statements.map(statement => {
          if (ts.isImportDeclaration(statement) && statement.moduleSpecifier.getText().includes('lit-html')) {
            statement.moduleSpecifier = ts.createStringLiteral(UNPKG_URL)
          }
          return statement;
        })
      }
      return ts.visitEachChild(node, (child) => visitor(child), context);
    }
    return visitor;
  }
}