import { doc } from 'prettier';
import type { AstPath, Doc, ParserOptions } from 'prettier';

import type { ContractDefinitionWithComments } from '../ast-types';
import {
  printComments,
  printPreservingEmptyLines,
  printSeparatedItem,
  printSeparatedList
} from '../common/printer-helpers';
import type { NodePrinter } from '../types';

const { group, line, hardline } = doc.builders;

const inheritance = (
  node: ContractDefinitionWithComments,
  path: AstPath,
  print: (ast: AstPath) => Doc
) =>
  node.baseContracts.length > 0
    ? [
        ' is',
        printSeparatedList(path.map(print, 'baseContracts'), {
          firstSeparator: line
        })
      ]
    : line;

const body = (
  node: ContractDefinitionWithComments,
  path: AstPath,
  options: ParserOptions,
  print: (ast: AstPath) => Doc
) =>
  node.subNodes.length > 0 || node.comments
    ? printSeparatedItem(
        [
          printPreservingEmptyLines(path, 'subNodes', options, print),
          printComments(node, path, options)
        ],
        { firstSeparator: hardline, grouped: false }
      )
    : '';

export const ContractDefinition: NodePrinter = {
  print: ({ node, options, path, print }) => [
    group([
      (node as ContractDefinitionWithComments).kind === 'abstract'
        ? 'abstract contract'
        : (node as ContractDefinitionWithComments).kind,
      ' ',
      (node as ContractDefinitionWithComments).name,
      inheritance(node as ContractDefinitionWithComments, path, print),
      '{'
    ]),
    body(node as ContractDefinitionWithComments, path, options, print),
    '}'
  ]
};
