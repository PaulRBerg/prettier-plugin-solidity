import type { AstPath, Doc, ParserOptions } from 'prettier';

import type { Comment, ModifierInvocationWithComments } from '../ast-types';
import { printComments, printSeparatedList } from '../common/printer-helpers';
import type { NodePrinter } from '../types';

const modifierArguments = (
  node: ModifierInvocationWithComments,
  path: AstPath,
  print: (ast: AstPath) => Doc,
  options: ParserOptions
) => {
  if (node.arguments) {
    // We always print parentheses at this stage because the parser already
    // stripped them in FunctionDefinitions that are not a constructor.
    return node.arguments.length > 0
      ? ['(', printSeparatedList(path.map(print, 'arguments')), ')']
      : '()';
  }
  const comments = node.comments as Comment[];
  if (
    comments &&
    comments.some(
      (comment) => !comment.leading && !comment.trailing && !comment.printed
    )
  ) {
    // We print parentheses here because the comment is supposed to be a block
    // comment inside empty parentheses.
    //    modifier(/* comment */)
    return ['(', printComments(node, path, options), ')'];
  }

  return '';
};

export const ModifierInvocation: NodePrinter = {
  print: ({ node, path, print, options }) => [
    (node as ModifierInvocationWithComments).name,
    modifierArguments(
      node as ModifierInvocationWithComments,
      path,
      print,
      options
    )
  ]
};
