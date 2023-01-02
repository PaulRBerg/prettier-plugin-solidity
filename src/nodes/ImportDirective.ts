import { doc } from 'prettier';
import coerce from 'semver/functions/coerce';
import satisfies from 'semver/functions/satisfies';
import { printSeparatedList } from '../common/printer-helpers';
import { printString } from '../common/util';

import type { Doc, ParserOptions } from 'prettier';
import type { ImportDirectiveWithComments } from '../ast-types';
import type { NodePrinter } from '../types';

const { group, line, softline } = doc.builders;

interface ParserOptionsSolidity extends ParserOptions {
  compiler?: string;
}

export const ImportDirective: NodePrinter = {
  print: ({ node, options }) => {
    const importPath = printString(
      (node as ImportDirectiveWithComments).path,
      options
    );
    let doc: Doc;

    if ((node as ImportDirectiveWithComments).unitAlias) {
      // import "./Foo.sol" as Foo;
      doc = [
        importPath,
        ' as ',
        (node as ImportDirectiveWithComments).unitAlias as string
      ];
    } else if ((node as ImportDirectiveWithComments).symbolAliases) {
      // import { Foo, Bar as Qux } from "./Foo.sol";
      const compiler = coerce((options as ParserOptionsSolidity).compiler);
      const symbolAliases = (
        (node as ImportDirectiveWithComments).symbolAliases as [
          string,
          string | null
        ][]
      ).map(([a, b]) => (b ? `${a} as ${b}` : a));
      let firstSeparator;
      let separator;

      if (compiler && satisfies(compiler, '>=0.7.4')) {
        // if the compiler exists and is greater than or equal to 0.7.4 we will
        // split the ImportDirective.
        firstSeparator = options.bracketSpacing ? line : softline;
        separator = [',', line];
      } else {
        // if the compiler is not given or is lower than 0.7.4 we will not
        // split the ImportDirective.
        firstSeparator = options.bracketSpacing ? ' ' : '';
        separator = ', ';
      }

      doc = [
        '{',
        printSeparatedList(symbolAliases, { firstSeparator, separator }),
        '} from ',
        importPath
      ];
    } else {
      // import "./Foo.sol";
      doc = importPath;
    }
    return group(['import ', doc, ';']);
  }
};
