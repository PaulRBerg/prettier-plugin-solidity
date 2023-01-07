import { doc } from 'prettier';

import type { UsingForDeclarationWithComments } from '../ast-types';
import { printSeparatedList } from '../common/printer-helpers';
import type { NodePrinter } from '../types';

const { line, softline } = doc.builders;

export const UsingForDeclaration: NodePrinter = {
  print: ({ node, path, print, options }) => [
    'using ',
    (node as UsingForDeclarationWithComments).functions &&
    (node as UsingForDeclarationWithComments).functions.length
      ? [
          '{',
          printSeparatedList(
            (node as UsingForDeclarationWithComments).functions,
            {
              firstSeparator: options.bracketSpacing ? line : softline
            }
          ),
          '}'
        ]
      : ((node as UsingForDeclarationWithComments).libraryName as string),
    ' for ',
    (node as UsingForDeclarationWithComments).typeName
      ? path.call(print, 'typeName')
      : '*',
    (node as UsingForDeclarationWithComments).isGlobal ? ' global;' : ';'
  ]
};
