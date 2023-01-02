import type { IdentifierWithComments } from '../ast-types';
import type { NodePrinter } from '../types';

export const Identifier: NodePrinter = {
  print: ({ node }) => (node as IdentifierWithComments).name
};
