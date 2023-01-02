import type { NodePrinter } from '../types';

export const NewExpression: NodePrinter = {
  print: ({ path, print }) => ['new ', path.call(print, 'typeName')]
};
