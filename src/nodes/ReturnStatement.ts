import { doc } from 'prettier';
import type { AstPath, Doc } from 'prettier';

import type { ReturnStatementWithComments } from '../ast-types';
import type { NodePrinter } from '../types';

const { group, indent, line } = doc.builders;

const expression = (
  node: ReturnStatementWithComments,
  path: AstPath,
  print: (ast: AstPath) => Doc
) => {
  if (node.expression) {
    return node.expression.type === 'TupleExpression'
      ? [' ', path.call(print, 'expression')]
      : group(indent([line, path.call(print, 'expression')]));
  }
  return '';
};

export const ReturnStatement: NodePrinter = {
  print: ({ node, path, print }) => [
    'return',
    expression(node as ReturnStatementWithComments, path, print),
    ';'
  ]
};
