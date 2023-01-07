import type { AstPath, Doc, ParserOptions } from 'prettier';

import type { ASTNodeWithComments } from './ast-types';

export interface PrettierParserOptions extends ParserOptions {
  compiler: string;
}

export interface NodePrinterArguments {
  node: ASTNodeWithComments;
  options: ParserOptions;
  path: AstPath;
  print: (path: AstPath) => Doc;
}

export interface NodePrinter {
  print: (arg: NodePrinterArguments) => Doc;
}
