import { doc } from 'prettier';
import { printSeparatedList } from '../common/printer-helpers';

import type { AstPath, Doc } from 'prettier';
import type { ForStatementWithComments } from '../ast-types';
import type { NodePrinter } from '../types';

const { group, indent, line } = doc.builders;

const initExpression = (
  node: ForStatementWithComments,
  path: AstPath,
  print: (ast: AstPath) => Doc
) => (node.initExpression ? path.call(print, 'initExpression') : '');

const conditionExpression = (
  node: ForStatementWithComments,
  path: AstPath,
  print: (ast: AstPath) => Doc
) => (node.conditionExpression ? path.call(print, 'conditionExpression') : '');

const loopExpression = (
  node: ForStatementWithComments,
  path: AstPath,
  print: (ast: AstPath) => Doc
) => (node.loopExpression.expression ? path.call(print, 'loopExpression') : '');

const printBody = (
  node: ForStatementWithComments,
  path: AstPath,
  print: (ast: AstPath) => Doc
) =>
  node.body.type === 'Block'
    ? [' ', path.call(print, 'body')]
    : group(indent([line, path.call(print, 'body')]));

export const ForStatement: NodePrinter = {
  print: ({ node, path, print }) => [
    'for (',
    printSeparatedList(
      [
        initExpression(node as ForStatementWithComments, path, print),
        conditionExpression(node as ForStatementWithComments, path, print),
        loopExpression(node as ForStatementWithComments, path, print)
      ],
      {
        separator:
          (node as ForStatementWithComments).initExpression ||
          (node as ForStatementWithComments).conditionExpression ||
          (node as ForStatementWithComments).loopExpression.expression
            ? [';', line]
            : ';'
      }
    ),
    ')',
    printBody(node as ForStatementWithComments, path, print)
  ]
};
