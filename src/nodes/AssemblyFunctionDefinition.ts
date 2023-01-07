import { doc } from 'prettier';

import type { AssemblyFunctionDefinitionWithComments } from '../ast-types';
import {
  printSeparatedItem,
  printSeparatedList
} from '../common/printer-helpers';
import type { NodePrinter } from '../types';

const { line } = doc.builders;

export const AssemblyFunctionDefinition: NodePrinter = {
  print: ({ node, path, print }) => [
    'function ',
    (node as AssemblyFunctionDefinitionWithComments).name,
    '(',
    printSeparatedList(path.map(print, 'arguments')),
    ')',
    (node as AssemblyFunctionDefinitionWithComments).returnArguments.length ===
    0
      ? ' '
      : printSeparatedItem(
          [
            '->',
            printSeparatedList(path.map(print, 'returnArguments'), {
              firstSeparator: line,
              lastSeparator: ''
            })
          ],
          { firstSeparator: line }
        ),
    path.call(print, 'body')
  ]
};
