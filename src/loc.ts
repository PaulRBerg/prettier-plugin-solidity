// see: https://github.com/prettier/prettier/blob/main/src/language-js/loc.js
import type { Expression } from '@solidity-parser/parser/src/ast-types';

import type { ASTNodeWithComments } from './ast-types';

export interface WithExpression {
  expression: Expression;
}

function getExpressionRange(
  node: ASTNodeWithComments
): [number, number] | undefined {
  return (
    (node as WithExpression).expression &&
    (node as WithExpression).expression.range
  );
}

function getRange(index: number, node: ASTNodeWithComments) {
  if (node.range) {
    return node.range[index];
  }
  const range = getExpressionRange(node);
  if (range) {
    return range[index];
  }
  return 0;
}

export function locEnd(node: ASTNodeWithComments) {
  return getRange(1, node);
}

export function locStart(node: ASTNodeWithComments) {
  return getRange(0, node);
}
