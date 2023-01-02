import type { NodePrinter } from '../types';

export const RevertStatement: NodePrinter = {
  print: ({ path, print }) => ['revert ', path.call(print, 'revertCall'), ';']
};
