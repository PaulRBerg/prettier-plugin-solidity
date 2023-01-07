import { doc } from 'prettier';
import type { AstPath, Doc } from 'prettier';

import type { FunctionTypeNameWithComments } from '../ast-types';
import { printSeparatedList } from '../common/printer-helpers';
import type { NodePrinter } from '../types';

const { group, indent, line } = doc.builders;

const returnTypes = (
  node: FunctionTypeNameWithComments,
  path: AstPath,
  print: (ast: AstPath) => Doc
) =>
  node.returnTypes.length > 0
    ? [
        line,
        'returns (',
        printSeparatedList(path.map(print, 'returnTypes')),
        ')'
      ]
    : '';

const visibility = (node: FunctionTypeNameWithComments) =>
  node.visibility && node.visibility !== 'default'
    ? [line, node.visibility]
    : '';

const stateMutability = (node: FunctionTypeNameWithComments) =>
  node.stateMutability && node.stateMutability !== 'default'
    ? [line, node.stateMutability]
    : '';

export const FunctionTypeName: NodePrinter = {
  print: ({ node, path, print }) => [
    'function(',
    printSeparatedList(path.map(print, 'parameterTypes')),
    ')',
    indent(
      group([
        visibility(node as FunctionTypeNameWithComments),
        stateMutability(node as FunctionTypeNameWithComments),
        returnTypes(node as FunctionTypeNameWithComments, path, print)
      ])
    )
  ]
};
