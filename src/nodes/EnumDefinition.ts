import { doc } from 'prettier';
import { printSeparatedList } from '../common/printer-helpers';

import type { EnumDefinitionWithComments } from '../ast-types';
import type { NodePrinter } from '../types';

const { group, hardline } = doc.builders;

export const EnumDefinition: NodePrinter = {
  print: ({ node, path, print }) =>
    group([
      'enum ',
      (node as EnumDefinitionWithComments).name,
      ' {',
      printSeparatedList(path.map(print, 'members'), {
        firstSeparator: hardline
      }),
      '}'
    ])
};
