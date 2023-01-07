import { doc } from 'prettier';
import type { Doc } from 'prettier';

import { printComments } from '../common/printer-helpers';
import type { NodePrinter } from '../types';

const { hardline } = doc.builders;

export const ExpressionStatement: NodePrinter = {
  print: ({ node, options, path, print }) => {
    const parts = [];

    const parent = path.getParentNode();

    if (parent.type === 'IfStatement') {
      if (node.comments && node.comments.length) {
        const comments = printComments(node, path, options) as Doc[];
        if (comments && comments.length) {
          parts.push(comments);
          parts.push(hardline);
        }
      }
    }

    parts.push(path.call(print, 'expression'));

    const omitSemicolon =
      parent.type === 'ForStatement' &&
      (node === parent.initExpression || node === parent.loopExpression);
    parts.push(omitSemicolon ? '' : ';');

    return parts;
  }
};
