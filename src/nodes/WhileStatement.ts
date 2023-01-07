import { doc } from 'prettier';
import type { AstPath, Doc } from 'prettier';

import type { WhileStatementWithComments } from '../ast-types';
import { printSeparatedItem } from '../common/printer-helpers';
import type { NodePrinter } from '../types';

const { group, indent, line } = doc.builders;

const printBody = (
  node: WhileStatementWithComments,
  path: AstPath,
  print: (ast: AstPath) => Doc
) =>
  node.body.type === 'Block'
    ? [' ', path.call(print, 'body')]
    : group(indent([line, path.call(print, 'body')]));

export const WhileStatement: NodePrinter = {
  print: ({ node, path, print }) => [
    'while (',
    printSeparatedItem(path.call(print, 'condition')),
    ')',
    printBody(node as WhileStatementWithComments, path, print)
  ]
};
