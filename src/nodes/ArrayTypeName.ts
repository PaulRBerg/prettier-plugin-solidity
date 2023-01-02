import type { ArrayTypeNameWithComments } from '../ast-types';
import type { NodePrinter } from '../types';

export const ArrayTypeName: NodePrinter = {
  print: ({ node, path, print }) => [
    path.call(print, 'baseTypeName'),
    '[',
    (node as ArrayTypeNameWithComments).length
      ? path.call(print, 'length')
      : '',
    ']'
  ]
};
