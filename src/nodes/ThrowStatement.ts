import type { NodePrinter } from '../types';

export const ThrowStatement: NodePrinter = {
  print: () => 'throw;'
};
