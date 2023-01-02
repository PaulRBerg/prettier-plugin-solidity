import type { NodePrinter } from '../types';

export const NameValueExpression: NodePrinter = {
  print: ({ path, print }) => [
    path.call(print, 'expression'),
    '{',
    path.call(print, 'arguments'),
    '}'
  ]
};
