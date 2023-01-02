import type { ParserOptions } from 'prettier';
import type { Comment, ASTNodeWithComments } from '../ast-types';

export interface HandlerArguments {
  text: string;
  precedingNode: ASTNodeWithComments;
  enclosingNode: ASTNodeWithComments;
  followingNode: ASTNodeWithComments;
  comment: Comment;
  options: ParserOptions;
}
