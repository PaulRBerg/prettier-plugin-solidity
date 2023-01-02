import type { AssemblyCaseWithComments } from '../ast-types';
import type { NodePrinter } from '../types';

export const AssemblyCase: NodePrinter = {
  print: ({ node, path, print }) => [
    (node as AssemblyCaseWithComments).default
      ? 'default'
      : ['case ', path.call(print, 'value')],
    ' ',
    path.call(print, 'block')
  ]
};
