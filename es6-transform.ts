import * as acorn from 'acorn';
import * as walk from 'acorn-walk';
import * as babel from 'babel-core';

export default function configure(options) {
  options = options || {};
  if (!options.presets || options.presets.length === 0) {
      options.presets = [["env"]];
  }

  const isEs6 = ast => {
    var es6NodeFound = false;
    if (ast.body) {
      const visitNode = function (node, state, c) {
        if (!es6NodeFound) {
          walk.base[node.type](node, state, c);
          switch (node.type) {
            case "ArrowFunctionExpression":
            case "ClassDeclaration":
            case "ExportAllDeclaration":
            case "ExportDefaultDeclaration":
            case "ExportNamedDeclaration":
            case "ImportDeclaration":
                es6NodeFound = true;
                break;
            case "VariableDeclaration":
              if (node.kind === "const" || node.kind === "let") {
                es6NodeFound = true;
                break;
              }
            default:
          }
        }
      }
      walk.recursive(ast, null, {
        Expression: visitNode,
        Statement: visitNode
      });
    }
    return es6NodeFound;
  }

  const transform = (context, callback) => {
    if (!context.js) {
      return callback(undefined, false);
    }

    if (isEs6(context.js.ast)) {
      options.filename = context.filename;
      try {
        context.source = babel.transform(context.source, options).code;
        context.js.ast = acorn.parse(context.source, { sourceType: "module" });
        return callback(undefined, true);
      }
      catch (error) {
        return callback(error, false);
      }
    }
    else {
      return callback(undefined, false);
    }
  }
  
  return transform;
}