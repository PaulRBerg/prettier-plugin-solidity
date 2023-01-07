import { doc } from 'prettier';
import type { AstPath, Doc, ParserOptions } from 'prettier';

import type { FunctionCallWithComments } from '../ast-types';
import { printSeparatedList } from '../common/printer-helpers';
import { isLabel } from '../common/util';
import type { GroupWithId, LabelWithLabel } from '../common/util';
import type { NodePrinter } from '../types';

const { group, indentIfBreak, label, line, softline } = doc.builders;

const printObject = (
  path: AstPath,
  print: (ast: AstPath) => Doc,
  options: ParserOptions
) => {
  const identifiers = path.map(print, 'identifiers');
  return [
    '{',
    printSeparatedList(
      path
        .map(print, 'arguments')
        .map((arg, index) => [identifiers[index], ': ', arg]),
      {
        firstSeparator: options.bracketSpacing ? line : softline,
        lastSeparator: [options.bracketSpacing ? line : softline, '})']
      }
    )
  ];
};

const printArguments = (path: AstPath, print: (ast: AstPath) => Doc) =>
  printSeparatedList(path.map(print, 'arguments'), {
    lastSeparator: [softline, ')']
  });

let groupIndex = 0;

export const FunctionCall: NodePrinter = {
  print: ({ node, path, print, options }) => {
    let expressionDoc = path.call(print, 'expression');
    let argumentsDoc: Doc = ')';

    if (
      (node as FunctionCallWithComments).arguments &&
      (node as FunctionCallWithComments).arguments.length > 0
    ) {
      if (
        (node as FunctionCallWithComments).identifiers &&
        (node as FunctionCallWithComments).identifiers.length > 0
      ) {
        argumentsDoc = printObject(path, print, options);
      } else {
        argumentsDoc = printArguments(path, print);
      }
    }

    // If we are at the end of a MemberAccessChain we should indent the
    // arguments accordingly.
    if (
      isLabel(expressionDoc) &&
      (expressionDoc as LabelWithLabel).label === 'MemberAccessChain'
    ) {
      expressionDoc = group((expressionDoc as LabelWithLabel).contents, {
        id: Symbol(`FunctionCall.expression-${groupIndex}`)
      });

      groupIndex += 1;

      argumentsDoc = indentIfBreak(argumentsDoc, {
        groupId: (expressionDoc as GroupWithId).id as symbol
      });
      // We wrap the expression in a label in case there is an IndexAccess or
      // a FunctionCall following this IndexAccess.
      return label('MemberAccessChain', [expressionDoc, '(', argumentsDoc]);
    }

    return [expressionDoc, '(', argumentsDoc];
  }
};
