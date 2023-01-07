import type { BaseASTNode } from '@solidity-parser/parser/src/ast-types';
import { doc } from 'prettier';
import type { AstPath, Doc } from 'prettier';

import type { TupleExpressionWithComments } from '../ast-types';
import { printSeparatedList } from '../common/printer-helpers';
import type { NodePrinter } from '../types';

const { group } = doc.builders;

const contents = (
  node: TupleExpressionWithComments,
  path: AstPath,
  print: (ast: AstPath) => Doc
) =>
  node.components &&
  node.components.length === 1 &&
  (node.components[0] as BaseASTNode).type === 'BinaryOperation'
    ? path.map(print, 'components')
    : [printSeparatedList(path.map(print, 'components'))];

export const TupleExpression: NodePrinter = {
  print: ({ node, path, print }) =>
    group([
      (node as TupleExpressionWithComments).isArray ? '[' : '(',
      ...contents(node as TupleExpressionWithComments, path, print),
      (node as TupleExpressionWithComments).isArray ? ']' : ')'
    ])
};
