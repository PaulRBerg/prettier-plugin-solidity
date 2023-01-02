import type { ParserOptions } from 'prettier';
import type { Comment, ASTNodeWithComments } from './ast-types';

export interface PrettierParserOptions extends ParserOptions {
  compiler: string;
}

export type PrettierComment = Comment & {
  printed: boolean;
  precedingNode: ASTNodeWithComments;
  enclosingNode: ASTNodeWithComments;
  followingNode: ASTNodeWithComments;
};
