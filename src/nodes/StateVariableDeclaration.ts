import { doc } from 'prettier';
import type { AstPath, Doc } from 'prettier';

import type { StateVariableDeclarationWithComments } from '../ast-types';
import type { NodePrinter } from '../types';

const { group, indent, line } = doc.builders;

const initialValue = (
  node: StateVariableDeclarationWithComments,
  path: AstPath,
  print: (ast: AstPath) => Doc
) => {
  if (!node.initialValue) {
    return '';
  }

  if (node.initialValue.type === 'TupleExpression') {
    return [' = ', path.call(print, 'initialValue')];
  }

  return group([' =', indent([line, path.call(print, 'initialValue')])]);
};

export const StateVariableDeclaration: NodePrinter = {
  print: ({ node, path, print }) => [
    ...path.map(print, 'variables'),
    initialValue(node as StateVariableDeclarationWithComments, path, print),
    ';'
  ]
};
