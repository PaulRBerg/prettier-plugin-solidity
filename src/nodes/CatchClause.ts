import { printSeparatedList } from '../common/printer-helpers';

import type { AstPath, Doc } from 'prettier';
import type { CatchClauseWithComments } from '../ast-types';
import type { NodePrinter } from '../types';

const parameters = (
  node: CatchClauseWithComments,
  path: AstPath,
  print: (path: AstPath) => Doc
) =>
  node.parameters
    ? [
        node.kind || '',
        '(',
        printSeparatedList(path.map(print, 'parameters')),
        ') '
      ]
    : '';

export const CatchClause: NodePrinter = {
  print: ({ node, path, print }) => [
    'catch ',
    parameters(node as CatchClauseWithComments, path, print),
    path.call(print, 'body')
  ]
};
