import type { NodePrinter } from '../types';

export const AssemblyIf: NodePrinter = {
  print: ({ path, print }) => [
    'if ',
    path.call(print, 'condition'),
    ' ',
    path.call(print, 'body')
  ]
};
