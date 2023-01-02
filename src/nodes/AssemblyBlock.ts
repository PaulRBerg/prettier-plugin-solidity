import { doc } from 'prettier';
import type { NodePrinter } from '../types';

const { hardline } = doc.builders;

const {
  printComments,
  printPreservingEmptyLines,
  printSeparatedItem
} = require('../common/printer-helpers');

export const AssemblyBlock: NodePrinter = {
  print: ({ node, options, path, print }) => [
    '{',
    printSeparatedItem(
      [
        printPreservingEmptyLines(path, 'operations', options, print),
        printComments(node, path, options)
      ],
      { firstSeparator: hardline, grouped: false }
    ),
    '}'
  ]
};
