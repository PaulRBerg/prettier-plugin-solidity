import type { PragmaDirectiveWithComments } from '../ast-types';
import type { NodePrinter } from '../types';

export const PragmaDirective: NodePrinter = {
  print: ({ node }) => [
    'pragma ',
    (node as PragmaDirectiveWithComments).name,
    ' ',
    (node as PragmaDirectiveWithComments).value,
    ';'
  ]
};
