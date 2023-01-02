import { doc } from 'prettier';
import { printSeparatedList } from '../common/printer-helpers';

import type { AstPath, Doc } from 'prettier';
import type {
  VariableDeclarationWithComments,
  StateVariableDeclarationVariableWithComments
} from '../ast-types';
import type { NodePrinter } from '../types';

const { group, indent, line } = doc.builders;

const indexed = (node: VariableDeclarationWithComments) =>
  node.isIndexed ? ' indexed' : '';

const visibility = (node: VariableDeclarationWithComments) =>
  node.visibility && node.visibility !== 'default'
    ? [line, node.visibility]
    : '';

const constantKeyword = (node: VariableDeclarationWithComments) =>
  node.isDeclaredConst ? ' constant' : '';

const storageLocation = (node: VariableDeclarationWithComments) =>
  node.storageLocation && node.visibility !== 'default'
    ? [line, node.storageLocation]
    : '';

const immutable = (node: StateVariableDeclarationVariableWithComments) =>
  node.isImmutable ? ' immutable' : '';

const override = (
  node: StateVariableDeclarationVariableWithComments,
  path: AstPath,
  print: (ast: AstPath) => Doc
) => {
  if (!node.override) return '';
  if (node.override.length === 0) return [line, 'override'];
  return [
    line,
    'override(',
    printSeparatedList(path.map(print, 'override')),
    ')'
  ];
};

const name = (node: VariableDeclarationWithComments) =>
  node.name ? [' ', node.name] : '';

export const VariableDeclaration: NodePrinter = {
  print: ({ node, path, print }) =>
    (node as VariableDeclarationWithComments).typeName
      ? group([
          path.call(print, 'typeName'),
          indent([
            indexed(node as VariableDeclarationWithComments),
            visibility(node as VariableDeclarationWithComments),
            constantKeyword(node as VariableDeclarationWithComments),
            storageLocation(node as VariableDeclarationWithComments),
            immutable(node as StateVariableDeclarationVariableWithComments),
            override(
              node as StateVariableDeclarationVariableWithComments,
              path,
              print
            ),
            name(node as VariableDeclarationWithComments)
          ])
        ])
      : ((node as VariableDeclarationWithComments).name as string)
};
