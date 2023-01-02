import type { FileLevelConstantWithComments } from '../ast-types';
import type { NodePrinter } from '../types';

export const FileLevelConstant: NodePrinter = {
  print: ({ node, path, print }) => [
    path.call(print, 'typeName'),
    ' constant ',
    (node as FileLevelConstantWithComments).name,
    ' = ',
    path.call(print, 'initialValue'),
    ';'
  ]
};
