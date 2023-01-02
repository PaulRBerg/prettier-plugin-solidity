import { doc } from 'prettier';
import { printSeparatedList } from '../common/printer-helpers';

import type { NameValueListWithComments } from '../ast-types';
import type { NodePrinter } from '../types';

const { line, softline } = doc.builders;

export const NameValueList: NodePrinter = {
  print: ({ node, path, print, options }) =>
    printSeparatedList(
      path
        .map(print, 'arguments')
        .map((argument, index) => [
          (node as NameValueListWithComments).names[index],
          ': ',
          argument
        ]),
      {
        firstSeparator: options.bracketSpacing ? line : softline
      }
    )
};
