import { doc } from 'prettier';
import { printComments, printSeparatedItem } from '../common/printer-helpers';

import type { AstPath, Doc } from 'prettier';
import type { Statement } from '@solidity-parser/parser/src/ast-types';
import type { IfStatementWithComments } from '../ast-types';
import type { NodePrinter, PrettierComment } from '../types';

const { group, hardline, indent, line } = doc.builders;

const printTrueBody = (
  node: IfStatementWithComments,
  path: AstPath,
  print: (ast: AstPath) => Doc
) => {
  if (node.trueBody.type === 'Block') {
    return [' ', path.call(print, 'trueBody')];
  }

  const ifWithinIf = node.trueBody.type === 'IfStatement';
  return group(
    indent([ifWithinIf ? hardline : line, path.call(print, 'trueBody')])
  );
};

const printFalseBody = (
  node: IfStatementWithComments,
  path: AstPath,
  print: (ast: AstPath) => Doc
) =>
  (node.falseBody as Statement).type === 'Block' ||
  (node.falseBody as Statement).type === 'IfStatement'
    ? [' ', path.call(print, 'falseBody')]
    : group(indent([line, path.call(print, 'falseBody')]));

const printElse = (
  node: IfStatementWithComments,
  path: AstPath,
  print: (ast: AstPath) => Doc,
  commentsBetweenIfAndElse: PrettierComment[]
) => {
  if (node.falseBody) {
    const elseOnSameLine =
      node.trueBody.type === 'Block' && commentsBetweenIfAndElse.length === 0;
    return [
      elseOnSameLine ? ' ' : hardline,
      'else',
      printFalseBody(node, path, print)
    ];
  }
  return '';
};

export const IfStatement: NodePrinter = {
  print: ({ node, options, path, print }) => {
    const comments = (node.comments as PrettierComment[]) || [];
    const commentsBetweenIfAndElse = comments.filter(
      (comment) => !comment.leading && !comment.trailing
    );

    const parts = [];

    parts.push('if (', printSeparatedItem(path.call(print, 'condition')), ')');
    parts.push(printTrueBody(node as IfStatementWithComments, path, print));
    if (
      commentsBetweenIfAndElse.length &&
      (node as IfStatementWithComments).falseBody
    ) {
      parts.push(hardline);
      parts.push(printComments(node, path, options));
    }
    parts.push(
      printElse(
        node as IfStatementWithComments,
        path,
        print,
        commentsBetweenIfAndElse
      )
    );

    return parts;
  }
};
