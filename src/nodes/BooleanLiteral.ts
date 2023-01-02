import type { BooleanLiteralWithComments } from '../ast-types';
import type { NodePrinter } from '../types';

export const BooleanLiteral: NodePrinter = {
  print: ({ node }) =>
    (node as BooleanLiteralWithComments).value ? 'true' : 'false'
};
