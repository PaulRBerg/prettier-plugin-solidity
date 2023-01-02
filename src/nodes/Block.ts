import { doc } from 'prettier';
import {
  printPreservingEmptyLines,
  printComments
} from '../common/printer-helpers';

import type { BlockWithComments } from '../ast-types';
import type { NodePrinter } from '../types';

const { hardline, indent } = doc.builders;

export const Block: NodePrinter = {
  print: ({ node, options, path, print }) =>
    // if block is empty, just return the pair of braces
    (node as BlockWithComments).statements.length === 0 && !node.comments
      ? '{}'
      : [
          '{',
          indent([
            hardline,
            printPreservingEmptyLines(path, 'statements', options, print),
            printComments(node, path, options)
          ]),
          hardline,
          '}'
        ]
};
