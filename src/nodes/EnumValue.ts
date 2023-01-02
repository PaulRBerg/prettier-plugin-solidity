import type { EnumValueWithComments } from '../ast-types';
import type { NodePrinter } from '../types';

export const EnumValue: NodePrinter = {
  print: ({ node }) => (node as EnumValueWithComments).name
};
