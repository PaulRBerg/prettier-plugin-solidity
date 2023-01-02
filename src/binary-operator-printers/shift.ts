import arithmetic from './arithmetic';

import type { BinaryOperationPrinter } from './types';

export default {
  match: (op) => ['<<', '>>'].includes(op),
  print: arithmetic.print
} as BinaryOperationPrinter;
