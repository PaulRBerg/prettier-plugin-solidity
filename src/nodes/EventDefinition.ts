import { printSeparatedList } from '../common/printer-helpers';

import type { AstPath, Doc } from 'prettier';
import type { EventDefinitionWithComments } from '../ast-types';
import type { NodePrinter } from '../types';

const parameters = (
  node: EventDefinitionWithComments,
  path: AstPath,
  print: (ast: AstPath) => Doc
) =>
  node.parameters && node.parameters.length > 0
    ? printSeparatedList(path.map(print, 'parameters'))
    : '';

export const EventDefinition: NodePrinter = {
  print: ({ node, path, print }) => [
    'event ',
    (node as EventDefinitionWithComments).name,
    '(',
    parameters(node as EventDefinitionWithComments, path, print),
    ')',
    (node as EventDefinitionWithComments).isAnonymous ? ' anonymous' : '',
    ';'
  ]
};
