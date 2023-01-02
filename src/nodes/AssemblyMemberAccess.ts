import type { NodePrinter } from '../types';

export const AssemblyMemberAccess: NodePrinter = {
  print: ({ path, print }) => [
    path.call(print, 'expression'),
    '.',
    path.call(print, 'memberName')
  ]
};
