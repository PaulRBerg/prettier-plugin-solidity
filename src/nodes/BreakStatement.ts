import type { NodePrinter } from '../types';

export const BreakStatement: NodePrinter = {
  print: () => 'break;'
};
