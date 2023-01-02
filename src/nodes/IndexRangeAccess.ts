import type { IndexRangeAccessWithComments } from '../ast-types';
import type { NodePrinter } from '../types';

export const IndexRangeAccess: NodePrinter = {
  print: ({ node, path, print }) => [
    path.call(print, 'base'),
    '[',
    (node as IndexRangeAccessWithComments).indexStart
      ? path.call(print, 'indexStart')
      : '',
    ':',
    (node as IndexRangeAccessWithComments).indexEnd
      ? path.call(print, 'indexEnd')
      : '',
    ']'
  ]
};
