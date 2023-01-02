import { doc } from 'prettier';
import { printString } from '../common/util';

import type { StringLiteralWithComments } from '../ast-types';
import type { NodePrinter } from '../types';

const { join, hardline } = doc.builders;

export const StringLiteral: NodePrinter = {
  print: ({ node, options }) => {
    const list = (node as StringLiteralWithComments).parts.map(
      (part, index) =>
        // node.isUnicode is an array of the same length as node.parts
        // that indicates if that string fragment has the unicode prefix
        ((node as StringLiteralWithComments).isUnicode[index]
          ? 'unicode'
          : '') + printString(part, options)
    );

    return join(hardline, list);
  }
};

module.exports = StringLiteral;
