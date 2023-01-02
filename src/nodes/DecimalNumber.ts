import type { DecimalNumberWithComments } from '../ast-types';
import type { NodePrinter } from '../types';

export const DecimalNumber: NodePrinter = {
  print: ({ node }) => (node as DecimalNumberWithComments).value
};
