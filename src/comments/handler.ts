import type { ParserOptions, AstPath } from 'prettier';
import {
  handleOwnLineComment,
  handleEndOfLineComment,
  handleRemainingComment
} from '../prettier-comments/language-js/comments';
import handlers from './handlers';
import type { PrettierComment } from '../types';
import type { HandlerArguments } from './comment-types';

export function solidityHandleOwnLineComment(
  comment: PrettierComment,
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
  comment: PrettierComment,
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
  comment: PrettierComment,
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

export function isBlockComment(comment: PrettierComment) {
  return comment.type === 'BlockComment';
}
