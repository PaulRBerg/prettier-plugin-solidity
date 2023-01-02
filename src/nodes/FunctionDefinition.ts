import { doc } from 'prettier';
import {
  printComments,
  printSeparatedItem,
  printSeparatedList
} from '../common/printer-helpers';
import { getNextNonSpaceNonCommentCharacter } from '../common/util';

import type { AstPath, Doc, ParserOptions } from 'prettier';
import type { FunctionDefinitionWithComments } from '../ast-types';
import type { NodePrinter } from '../types';

const { dedent, group, indent, join, line } = doc.builders;

const functionName = (
  node: FunctionDefinitionWithComments,
  options: ParserOptions
) => {
  if (node.isConstructor && !node.name) return 'constructor';
  if (node.name) return `function ${node.name}`;
  if (node.isReceiveEther) return 'receive';
  // The parser doesn't give us any information about the keyword used for the
  // fallback.
  // Using the originalText is the next best option.
  // A neat idea would be to rely on the pragma and enforce it but for the
  // moment this will do.
  const names = { fallback: 'fallback', function: 'function' };
  const name = options.originalText.slice(
    options.locStart(node),
    options.locStart(node) + 8
  ) as 'fallback' | 'function';
  return names[name];
};

const parameters = (
  parametersType: 'parameters' | 'returnParameters',
  node: FunctionDefinitionWithComments,
  path: AstPath,
  print: (ast: AstPath) => Doc,
  options: ParserOptions
) => {
  const parametersArray = node[parametersType];
  if (parametersArray && parametersArray.length > 0) {
    return printSeparatedList(path.map(print, parametersType), {
      grouped: false
    });
  }
  if (node.comments && node.comments.length > 0) {
    // we add a check to see if the comment is inside the parentheses
    const parameterComments = printComments(
      node,
      path,
      options,
      (comment) =>
        getNextNonSpaceNonCommentCharacter(
          options.originalText,
          comment,
          options.locEnd
        ) === ')'
    ) as Doc[];
    return parameterComments.length > 0
      ? printSeparatedItem(parameterComments)
      : '';
  }
  return '';
};

const visibility = (node: FunctionDefinitionWithComments) =>
  node.visibility && node.visibility !== 'default'
    ? [line, node.visibility]
    : '';

const virtual = (node: FunctionDefinitionWithComments) =>
  node.isVirtual ? [line, 'virtual'] : '';

const override = (
  node: FunctionDefinitionWithComments,
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

const stateMutability = (node: FunctionDefinitionWithComments) =>
  node.stateMutability ? [line, node.stateMutability] : '';

const modifiers = (
  node: FunctionDefinitionWithComments,
  path: AstPath,
  print: (ast: AstPath) => Doc
) =>
  node.modifiers.length > 0
    ? [line, join(line, path.map(print, 'modifiers'))]
    : '';

const returnParameters = (
  node: FunctionDefinitionWithComments,
  path: AstPath,
  print: (ast: AstPath) => Doc,
  options: ParserOptions
) =>
  node.returnParameters
    ? [
        line,
        'returns (',
        group(parameters('returnParameters', node, path, print, options)),
        ')'
      ]
    : '';

const signatureEnd = (node: FunctionDefinitionWithComments) =>
  node.body ? dedent(line) : ';';

const body = (
  node: FunctionDefinitionWithComments,
  path: AstPath,
  print: (ast: AstPath) => Doc
) => (node.body ? path.call(print, 'body') : '');

export const FunctionDefinition: NodePrinter = {
  print: ({ node, path, print, options }) => [
    group([
      functionName(node as FunctionDefinitionWithComments, options),
      '(',
      parameters(
        'parameters',
        node as FunctionDefinitionWithComments,
        path,
        print,
        options
      ),
      ')',
      indent(
        group([
          // TODO: sort comments for modifiers and return parameters
          printComments(node, path, options),
          visibility(node as FunctionDefinitionWithComments),
          stateMutability(node as FunctionDefinitionWithComments),
          virtual(node as FunctionDefinitionWithComments),
          override(node as FunctionDefinitionWithComments, path, print),
          modifiers(node as FunctionDefinitionWithComments, path, print),
          returnParameters(
            node as FunctionDefinitionWithComments,
            path,
            print,
            options
          ),
          signatureEnd(node as FunctionDefinitionWithComments)
        ])
      )
    ]),
    body(node as FunctionDefinitionWithComments, path, print)
  ]
};
