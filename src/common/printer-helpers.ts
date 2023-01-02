import { doc, util } from 'prettier';
import { prettierVersionSatisfies } from './util';

import type { Doc, AstPath, ParserOptions, Printer } from 'prettier';
import type { ASTNodeWithComments } from '../ast-types';
import type { PrettierComment } from '../types';

const { group, indent, join, line, softline, hardline } = doc.builders;
const { isNextLineEmptyAfterIndex } = util;

interface PrintSeparatedOptions {
  firstSeparator?: Doc;
  separator?: Doc;
  lastSeparator?: Doc;
  grouped?: boolean;
}
// This function will add an indentation to the `list` and separate it from the
// rest of the `doc` in most cases by a `softline`.
// the list itself will be printed with a separator that in most cases is a
// comma (,) and a `line`
export function printSeparatedList(
  list: Doc[],
  {
    firstSeparator = softline,
    separator = [',', line],
    lastSeparator = firstSeparator,
    grouped = true
  }: PrintSeparatedOptions = {}
) {
  const doc = [indent([firstSeparator, join(separator, list)]), lastSeparator];
  return grouped ? group(doc) : doc;
}

// This function will add an indentation to the `item` and separate it from the
// rest of the `doc` in most cases by a `softline`.
export function printSeparatedItem(
  item: Doc,
  {
    firstSeparator = softline,
    lastSeparator = firstSeparator,
    grouped = true
  }: PrintSeparatedOptions = {}
) {
  const doc = [indent([firstSeparator, item]), lastSeparator];
  return grouped ? group(doc) : doc;
}

export function printPreservingEmptyLines(
  path: AstPath,
  key: string,
  options: ParserOptions,
  print: (path: AstPath) => Doc
) {
  const parts: Doc[] = [];
  path.each((childPath) => {
    const node = childPath.getValue() as ASTNodeWithComments;
    const nodeType = node.type;

    if (
      // Avoid adding a hardline at the beginning of the document.
      parts.length !== 0 &&
      // LabelDefinition adds a dedented line so we don't have to prepend a
      // hardline.
      nodeType !== 'LabelDefinition'
    ) {
      parts.push(hardline);
    }

    // TODO check if this can be changed to index
    if (parseInt(childPath.getName() as string) > 0) {
      if (
        ['ContractDefinition', 'FunctionDefinition'].includes(nodeType) &&
        parts[parts.length - 2] !== hardline
      ) {
        parts.push(hardline);
      }
    }

    parts.push(print(childPath));

    if (
      isNextLineEmptyAfterIndex(
        options.originalText,
        options.locEnd(node) + 1
      ) ||
      nodeType === 'FunctionDefinition'
    ) {
      parts.push(hardline);
    }
  }, key);

  if (parts.length > 1 && parts[parts.length - 1] === hardline) {
    parts.pop();
  }

  return parts;
}

interface ParserOptionsWithPrinter extends ParserOptions {
  printer: Printer;
}

export function printComments(
  node: ASTNodeWithComments,
  path: AstPath,
  options: ParserOptions,
  filter: (comment?: PrettierComment) => boolean = () => true
) {
  if (!node.comments) return [];
  const doc = join(
    line,
    path.map((commentPath) => {
      const comment = commentPath.getValue() as PrettierComment;
      // TODO check if returning null has the same effect as ''
      if (comment.trailing || comment.leading || comment.printed) {
        return '';
      }
      if (!filter(comment)) {
        return '';
      }
      comment.printed = true;
      const printer = (options as ParserOptionsWithPrinter).printer;
      return printer.printComment
        ? printer.printComment(commentPath, options)
        : '';
    }, 'comments')
  );

  // The following if statement will never be 100% covered in a single run
  // since it depends on the version of Prettier being used.
  // Mocking the behaviour will introduce a lot of maintenance in the tests.
  /* c8 ignore start */
  return prettierVersionSatisfies('^2.3.0')
    ? doc.parts // Prettier V2
    : doc; // Prettier V3
  /* c8 ignore stop */
}
