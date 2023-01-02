import { doc } from 'prettier';

import type { LabelDefinitionWithComments } from '../ast-types';
import type { NodePrinter } from '../types';

const { dedent, line } = doc.builders;

export const LabelDefinition: NodePrinter = {
  print: ({ node }) => [
    dedent(line),
    (node as LabelDefinitionWithComments).name,
    ':'
  ]
};
