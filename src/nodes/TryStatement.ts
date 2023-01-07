import { doc } from 'prettier';
import type { AstPath, Doc } from 'prettier';

import type { TryStatementWithComments } from '../ast-types';
import {
  printSeparatedItem,
  printSeparatedList
} from '../common/printer-helpers';
import type { NodePrinter } from '../types';

const { join, line } = doc.builders;

const returnParameters = (
  node: TryStatementWithComments,
  path: AstPath,
  print: (ast: AstPath) => Doc
) =>
  node.returnParameters
    ? [
        'returns (',
        printSeparatedList(path.map(print, 'returnParameters')),
        ')'
      ]
    : '';

export const TryStatement: NodePrinter = {
  print: ({ node, path, print }) => {
    let parts = [
      'try',
      printSeparatedItem(path.call(print, 'expression'), {
        firstSeparator: line
      })
    ];

    const formattedReturnParameters = returnParameters(
      node as TryStatementWithComments,
      path,
      print
    );
    if (formattedReturnParameters) {
      parts = parts.concat([formattedReturnParameters, ' ']);
    }

    parts = parts.concat([
      path.call(print, 'body'),
      ' ',
      join(' ', path.map(print, 'catchClauses'))
    ]);

    return parts;
  }
};
