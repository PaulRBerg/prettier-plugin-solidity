import type { NodePrinter } from '../types';

export const Mapping: NodePrinter = {
  print: ({ path, print }) => [
    'mapping(',
    path.call(print, 'keyType'),
    ' => ',
    path.call(print, 'valueType'),
    ')'
  ]
};
