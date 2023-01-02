import type { ElementaryTypeNameWithComments } from '../ast-types';
import type { NodePrinter } from '../types';

const stateMutability = (node: ElementaryTypeNameWithComments) =>
  node.stateMutability && node.stateMutability.length > 0
    ? [' ', node.stateMutability]
    : '';

export const ElementaryTypeName: NodePrinter = {
  print: ({ node }) => [
    (node as ElementaryTypeNameWithComments).name,
    stateMutability(node as ElementaryTypeNameWithComments)
  ]
};
