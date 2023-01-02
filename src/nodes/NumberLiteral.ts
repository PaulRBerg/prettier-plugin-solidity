import type { NumberLiteralWithComments } from '../ast-types';
import type { NodePrinter } from '../types';

export const NumberLiteral: NodePrinter = {
  print: ({ node }) =>
    (node as NumberLiteralWithComments).subdenomination
      ? [
          (node as NumberLiteralWithComments).number,
          ' ',
          (node as NumberLiteralWithComments).subdenomination as string
        ]
      : (node as NumberLiteralWithComments).number
};
