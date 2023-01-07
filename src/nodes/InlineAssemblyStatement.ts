// @TODO: add support for assembly language specifier
import type { InlineAssemblyStatementWithComments } from '../ast-types';
import { printSeparatedList } from '../common/printer-helpers';
import { printString } from '../common/util';
import type { NodePrinter } from '../types';

export const InlineAssemblyStatement: NodePrinter = {
  print: ({ node, path, print, options }) => [
    'assembly ',
    (node as InlineAssemblyStatementWithComments).language
      ? `${printString(
          (node as InlineAssemblyStatementWithComments).language as string,
          options
        )} `
      : '',
    (node as InlineAssemblyStatementWithComments).flags &&
    (node as InlineAssemblyStatementWithComments).flags.length > 0
      ? [
          '(',
          printSeparatedList(
            (node as InlineAssemblyStatementWithComments).flags.map((flag) =>
              printString(flag, options)
            )
          ),
          ') '
        ]
      : '',
    path.call(print, 'body')
  ]
};
