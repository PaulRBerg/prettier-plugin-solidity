import { doc } from 'prettier';

import type { HexLiteralWithComments } from '../ast-types';
import { printString } from '../common/util';
import type { NodePrinter } from '../types';

const { join, line } = doc.builders;

export const HexLiteral: NodePrinter = {
  print: ({ node, options }) => {
    const list = (node as HexLiteralWithComments).parts.map(
      (part) => `hex${printString(part, options)}`
    );
    return join(line, list);
  }
};
