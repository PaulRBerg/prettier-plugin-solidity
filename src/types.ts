import type { AstPath, Doc, ParserOptions } from 'prettier';
import type { Comment, ASTNodeWithComments } from './ast-types';

export interface PrettierParserOptions extends ParserOptions {
  compiler: string;
}

export type PrettierComment = Comment & {
  leading: boolean;
  trailing: boolean;
  printed: boolean;
  precedingNode: ASTNodeWithComments;
  enclosingNode: ASTNodeWithComments;
  followingNode: ASTNodeWithComments;
};

export interface NodePrinterArguments {
  node: ASTNodeWithComments;
  options: ParserOptions;
  path: AstPath;
  print: (path: AstPath) => Doc;
}

export interface NodePrinter {
  print: (arg: NodePrinterArguments) => Doc;
}
