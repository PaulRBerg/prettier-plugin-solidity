import type { NodePrinter } from '../types';

export const EmitStatement: NodePrinter = {
  print: ({ path, print }) => ['emit ', path.call(print, 'eventCall'), ';']
};
