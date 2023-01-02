import type { HexNumberWithComments } from '../ast-types';
import type { NodePrinter } from '../types';

export const HexNumber: NodePrinter = {
  print: ({ node }) => (node as HexNumberWithComments).value
};
