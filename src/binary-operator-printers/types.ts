import type { BinOp } from '@solidity-parser/parser/src/ast-types';
import type { AstPath, Doc } from 'prettier';

import type { BinaryOperationWithComments } from '../ast-types';

export interface BinaryOperationPrinter {
  match: (op: BinOp) => boolean;
  print: (
    node: BinaryOperationWithComments,
    path: AstPath,
    print: (path: AstPath) => Doc
  ) => Doc;
}
