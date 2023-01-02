import type { TypeDefinitionWithComments } from '../ast-types';
import type { NodePrinter } from '../types';

export const TypeDefinition: NodePrinter = {
  print: ({ node }) => [
    'type ',
    (node as TypeDefinitionWithComments).name,
    ' is ',
    (node as TypeDefinitionWithComments).definition.name,
    ';'
  ]
};
