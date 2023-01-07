import { doc } from 'prettier';
import type { AstPath, Doc } from 'prettier';

import type { DoWhileStatementWithComments } from '../ast-types';
import { printSeparatedItem } from '../common/printer-helpers';
import type { NodePrinter } from '../types';

const { group, indent, line } = doc.builders;

const body = (
  node: DoWhileStatementWithComments,
  path: AstPath,
  print: (ast: AstPath) => Doc
) =>
  node.body.type === 'Block'
    ? [' ', path.call(print, 'body'), ' ']
    : group([indent([line, path.call(print, 'body')]), line]);

export const DoWhileStatement: NodePrinter = {
  print: ({ node, path, print }) => [
    'do',
    body(node as DoWhileStatementWithComments, path, print),
    'while (',
    printSeparatedItem(path.call(print, 'condition')),
    ');'
  ]
};
