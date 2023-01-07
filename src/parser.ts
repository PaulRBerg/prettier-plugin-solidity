// https://prettier.io/docs/en/plugins.html#parsers
import * as parser from '@solidity-parser/parser';
import type { BinOp } from '@solidity-parser/parser/src/ast-types';
import type { Parser } from 'prettier';
import coerce from 'semver/functions/coerce';
import satisfies from 'semver/functions/satisfies';
import extractComments from 'solidity-comments-extractor';

import type {
  BinaryOperationWithComments,
  ExpressionWithComments,
  SourceUnitWithComments,
  TupleExpressionWithComments
} from './ast-types';
import type { PrettierParserOptions } from './types';

const tryHug = (node: ExpressionWithComments, operators: BinOp[]) => {
  if (node.type === 'BinaryOperation' && operators.includes(node.operator))
    return {
      type: 'TupleExpression',
      components: [node],
      isArray: false
    } as TupleExpressionWithComments;
  return node;
};

export default function parse(
  text: string,
  _parsers: Parser[] | PrettierParserOptions,
  options = _parsers as PrettierParserOptions
) {
  const compiler = coerce(options.compiler);
  const parsed = parser.parse(text, {
    loc: true,
    range: true
  }) as SourceUnitWithComments;
  parsed.comments = extractComments(text);

  parser.visit(parsed, {
    PragmaDirective(ctx) {
      // if the pragma is not for solidity we leave.
      if (ctx.name !== 'solidity') return;
      // if the compiler option has not been provided we leave.
      if (!compiler) return;
      // we make a check against each pragma directive in the document.
      if (!satisfies(compiler, ctx.value)) {
        // @TODO: investigate the best way to warn that would apply to
        // different editors.
        // eslint-disable-next-line no-console
        console.warn(
          `[prettier-solidity] The compiler option is set to '${options.compiler}', which does not satisfy 'pragma solidity ${ctx.value}'.`
        );
      }
    },
    ModifierDefinition(ctx) {
      if (!ctx.parameters) {
        ctx.parameters = [];
      }
    },
    FunctionDefinition(ctx) {
      if (!ctx.isConstructor) {
        ctx.modifiers.forEach((modifier) => {
          if (modifier.arguments && modifier.arguments.length === 0) {
            // eslint-disable-next-line no-param-reassign
            modifier.arguments = null;
          }
        });
      }
    },
    HexLiteral(ctx) {
      ctx.value = options.singleQuote
        ? `hex'${ctx.value.slice(4, -1)}'`
        : `hex"${ctx.value.slice(4, -1)}"`;
    },
    ElementaryTypeName(ctx) {
      // if the compiler is below 0.8.0 we will recognize the type 'byte' as an
      // alias of 'bytes1'. Otherwise we will ignore this and enforce always
      // 'bytes1'.
      const pre080 = compiler && satisfies(compiler, '<0.8.0');
      if (!pre080 && ctx.name === 'byte') ctx.name = 'bytes1';
    },
    BinaryOperation(ctx) {
      switch (ctx.operator) {
        case '+':
        case '-':
          ctx.left = tryHug(ctx.left, ['%']);
          ctx.right = tryHug(ctx.right, ['%']);
          break;
        case '*':
          ctx.left = tryHug(ctx.left, ['/', '%']);
          break;
        case '/':
          ctx.left = tryHug(ctx.left, ['*', '%']);
          break;
        case '%':
          ctx.left = tryHug(ctx.left, ['*', '/', '%']);
          break;
        case '**':
          // If the compiler has not been given as an option using we leave a**b**c.
          if (!compiler) break;

          if (satisfies(compiler, '<0.8.0')) {
            // If the compiler is less than 0.8.0 then a**b**c is formatted as
            // (a**b)**c.
            ctx.left = tryHug(ctx.left, ['**']);
            break;
          }
          if (
            ctx.left.type === 'BinaryOperation' &&
            ctx.left.operator === '**'
          ) {
            // the parser still organizes the a**b**c as (a**b)**c so we need
            // to restructure it.
            ctx.right = {
              type: 'TupleExpression',
              components: [
                {
                  type: 'BinaryOperation',
                  operator: '**',
                  left: ctx.left.right,
                  right: ctx.right
                } as BinaryOperationWithComments
              ],
              isArray: false
            };
            ctx.left = ctx.left.left;
          }
          break;
        case '<<':
        case '>>':
          ctx.left = tryHug(ctx.left, ['+', '-', '*', '/', '**', '<<', '>>']);
          ctx.right = tryHug(ctx.right, ['+', '-', '*', '/', '**']);
          break;
        case '&':
          ctx.left = tryHug(ctx.left, ['+', '-', '*', '/', '**', '<<', '>>']);
          ctx.right = tryHug(ctx.right, ['+', '-', '*', '/', '**', '<<', '>>']);
          break;
        case '|':
          ctx.left = tryHug(ctx.left, [
            '+',
            '-',
            '*',
            '/',
            '**',
            '<<',
            '>>',
            '&',
            '^'
          ]);
          ctx.right = tryHug(ctx.right, [
            '+',
            '-',
            '*',
            '/',
            '**',
            '<<',
            '>>',
            '&',
            '^'
          ]);
          break;
        case '^':
          ctx.left = tryHug(ctx.left, [
            '+',
            '-',
            '*',
            '/',
            '**',
            '<<',
            '>>',
            '&'
          ]);
          ctx.right = tryHug(ctx.right, [
            '+',
            '-',
            '*',
            '/',
            '**',
            '<<',
            '>>',
            '&'
          ]);
          break;
        case '||':
          ctx.left = tryHug(ctx.left, ['&&']);
          ctx.right = tryHug(ctx.right, ['&&']);
          break;
        case '&&':
        default:
          break;
      }
    }
  });

  return parsed;
}
