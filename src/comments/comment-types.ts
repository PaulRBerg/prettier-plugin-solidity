import type { ParserOptions } from 'prettier';

import type { ASTNodeWithComments, Comment } from '../ast-types';

export interface HandlerArguments {
  text: string;
  precedingNode: ASTNodeWithComments;
  enclosingNode: ASTNodeWithComments;
  followingNode: ASTNodeWithComments;
  comment: Comment;
  options: ParserOptions;
}
