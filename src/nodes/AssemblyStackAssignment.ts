import type { AssemblyStackAssignmentWithComments } from '../ast-types';
import type { NodePrinter } from '../types';

export const AssemblyStackAssignment: NodePrinter = {
  print: ({ node, path, print }) => [
    path.call(print, 'expression'),
    ' =: ',
    (node as AssemblyStackAssignmentWithComments).name
  ]
};
