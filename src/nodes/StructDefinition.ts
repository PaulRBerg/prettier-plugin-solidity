import { doc } from 'prettier';

import type { StructDefinitionWithComments } from '../ast-types';
import { printSeparatedList } from '../common/printer-helpers';
import type { NodePrinter } from '../types';

const { hardline } = doc.builders;

export const StructDefinition: NodePrinter = {
  print: ({ node, path, print }) => [
    'struct ',
    (node as StructDefinitionWithComments).name,
    ' {',
    printSeparatedList(path.map(print, 'members'), {
      firstSeparator: hardline,
      separator: [';', hardline],
      lastSeparator: [';', hardline]
    }),
    '}'
  ]
};
