import { printSeparatedList } from '../common/printer-helpers';

import type { AstPath, Doc } from 'prettier';
import type { InheritanceSpecifierWithComments } from '../ast-types';
import type { NodePrinter } from '../types';

const printArguments = (
  node: InheritanceSpecifierWithComments,
  path: AstPath,
  print: (ast: AstPath) => Doc
) =>
  node.arguments && node.arguments.length
    ? ['(', printSeparatedList(path.map(print, 'arguments')), ')']
    : '';

export const InheritanceSpecifier: NodePrinter = {
  print: ({ node, path, print }) => [
    path.call(print, 'baseName'),
    printArguments(node as InheritanceSpecifierWithComments, path, print)
  ]
};
