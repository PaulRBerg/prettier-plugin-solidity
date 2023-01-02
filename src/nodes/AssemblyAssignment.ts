import { doc } from 'prettier';
import type { NodePrinter } from '../types';

const { join } = doc.builders;

export const AssemblyAssignment: NodePrinter = {
  print: ({ path, print }) => [
    join(', ', path.map(print, 'names')),
    ' := ',
    path.call(print, 'expression')
  ]
};
