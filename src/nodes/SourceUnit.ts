import { doc } from 'prettier';
import { printPreservingEmptyLines } from '../common/printer-helpers';

import type { NodePrinter } from '../types';

const { line } = doc.builders;

export const SourceUnit: NodePrinter = {
  print: ({ options, path, print }) => [
    printPreservingEmptyLines(path, 'children', options, print),
    options.parentParser ? '' : line
  ]
};
