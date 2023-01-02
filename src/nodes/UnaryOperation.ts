import type { UnaryOperationWithComments } from '../ast-types';
import type { NodePrinter } from '../types';

export const UnaryOperation: NodePrinter = {
  print: ({ node, path, print }) =>
    (node as UnaryOperationWithComments).isPrefix
      ? [
          (node as UnaryOperationWithComments).operator,
          (node as UnaryOperationWithComments).operator === 'delete' ? ' ' : '',
          path.call(print, 'subExpression')
        ]
      : [
          path.call(print, 'subExpression'),
          (node as UnaryOperationWithComments).operator
        ]
};
