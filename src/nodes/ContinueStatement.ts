import type { NodePrinter } from '../types';

export const ContinueStatement: NodePrinter = {
  print: () => 'continue;'
};
