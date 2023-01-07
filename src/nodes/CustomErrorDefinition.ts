import type { AstPath, Doc } from 'prettier';

import type { CustomErrorDefinitionWithComments } from '../ast-types';
import { printSeparatedList } from '../common/printer-helpers';
import type { NodePrinter } from '../types';

const parameters = (
  node: CustomErrorDefinitionWithComments,
  path: AstPath,
  print: (ast: AstPath) => Doc
) =>
  node.parameters && node.parameters.length > 0
    ? printSeparatedList(path.map(print, 'parameters'))
    : '';

export const CustomErrorDefinition: NodePrinter = {
  print: ({ node, path, print }) => [
    'error ',
    (node as CustomErrorDefinitionWithComments).name,
    '(',
    parameters(node as CustomErrorDefinitionWithComments, path, print),
    ');'
  ]
};
