import type { ParserOptions, AstPath } from 'prettier';
import {
  handleOwnLineComment,
  handleEndOfLineComment,
  handleRemainingComment
} from '../prettier-comments/language-js/comments';
import handlers from './handlers';
import type { Comment } from '../ast-types';
import type { HandlerArguments } from './comment-types';

export function solidityHandleOwnLineComment(
  comment: Comment,
  text: string,
  options: ParserOptions,
  ast: AstPath,
  isLastComment: boolean
) {
  const { precedingNode, enclosingNode, followingNode } = comment;
  const handlerArguments: HandlerArguments = {
    text,
    precedingNode,
    enclosingNode,
    followingNode,
    comment,
    options
  };

  if (
    handlers.some((handler) => handler(handlerArguments)) ||
    handleOwnLineComment(comment, text, options, ast, isLastComment)
  ) {
    return true;
  }
  return false;
}

export function solidityHandleEndOfLineComment(
  comment: Comment,
  text: string,
  options: ParserOptions,
  ast: AstPath,
  isLastComment: boolean
) {
  const { precedingNode, enclosingNode, followingNode } = comment;
  const handlerArguments: HandlerArguments = {
    text,
    precedingNode,
    enclosingNode,
    followingNode,
    comment,
    options
  };

  if (
    handlers.some((handler) => handler(handlerArguments)) ||
    handleEndOfLineComment(comment, text, options, ast, isLastComment)
  ) {
    return true;
  }
  return false;
}

export function solidityHandleRemainingComment(
  comment: Comment,
  text: string,
  options: ParserOptions,
  ast: AstPath,
  isLastComment: boolean
) {
  const { precedingNode, enclosingNode, followingNode } = comment;
  const handlerArguments: HandlerArguments = {
    text,
    precedingNode,
    enclosingNode,
    followingNode,
    comment,
    options
  };

  if (
    handlers.some((handler) => handler(handlerArguments)) ||
    handleRemainingComment(comment, text, options, ast, isLastComment)
  ) {
    return true;
  }
  return false;
}

export function isBlockComment(comment: Comment) {
  return comment.type === 'BlockComment';
}
