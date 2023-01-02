import { doc } from 'prettier';
import { printSeparatedList } from '../common/printer-helpers';

import type { AstPath, Doc } from 'prettier';
import type { VariableDeclaration } from '@solidity-parser/parser/src/ast-types';
import type { VariableDeclarationStatementWithComments } from '../ast-types';
import type { NodePrinter } from '../types';
import type { GroupWithId } from '../common/util';

const { group, indentIfBreak } = doc.builders;

const embraceVariables = (variables: Doc[], embrace: boolean) =>
  embrace ? ['(', printSeparatedList(variables), ')'] : variables;

const initialValue = (
  node: VariableDeclarationStatementWithComments,
  path: AstPath,
  print: (ast: AstPath) => Doc
) => (node.initialValue ? [' = ', path.call(print, 'initialValue')] : '');

let groupIndex = 0;
export const VariableDeclarationStatement: NodePrinter = {
  print: ({ node, path, print }) => {
    const startsWithVar =
      (node as VariableDeclarationStatementWithComments).variables.filter(
        (x) => x && (x as VariableDeclaration).typeName
      ).length === 0;

    const declarationDoc = group(
      [
        startsWithVar ? 'var ' : '',
        embraceVariables(
          path.map(print, 'variables'),
          (node as VariableDeclarationStatementWithComments).variables.length >
            1 || startsWithVar
        )
      ],
      { id: Symbol(`VariableDeclarationStatement.variables-${groupIndex}`) }
    );
    groupIndex += 1;
    const initialValueDoc = initialValue(
      node as VariableDeclarationStatementWithComments,
      path,
      print
    );

    const parent = path.getParentNode();
    const omitSemicolon =
      parent.type === 'ForStatement' &&
      (node === parent.initExpression || node === parent.loopExpression);
    return group([
      declarationDoc,
      indentIfBreak(initialValueDoc, {
        groupId: (declarationDoc as GroupWithId).id as symbol
      }),
      omitSemicolon ? '' : ';'
    ]);
  }
};
