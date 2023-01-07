import type { AstPath, Doc, ParserOptions } from 'prettier';

import type { ASTNodeWithComments } from './ast-types';
import { ignoreComments } from './comments/ignore';
import { hasNodeIgnoreComment, prettierVersionSatisfies } from './common/util';
import * as nodes from './nodes';
import type { NodePrinterArguments } from './types';

let checked = false;

function prettierVersionCheck() {
  if (checked) return;
  if (!prettierVersionSatisfies('>=2.3.0 || >=3.0.0-alpha.0')) {
    throw new Error(
      'The version of prettier in your node-modules does not satisfy the required ">=2.3.0" constraint. Please update the version of Prettier.'
    );
  }
  checked = true;
}

export default function genericPrint(
  path: AstPath,
  options: ParserOptions,
  print: (path: AstPath) => Doc
) {
  prettierVersionCheck();

  const node = path.getValue() as ASTNodeWithComments;
  if (node === null) {
    return '';
  }

  if (!(node.type in nodes)) {
    throw new Error(`Unknown type: ${JSON.stringify(node.type)}`);
  }

  if (hasNodeIgnoreComment(node)) {
    ignoreComments(path);

    return options.originalText.slice(
      options.locStart(node),
      options.locEnd(node) + 1
    );
  }

  return nodes[node.type].print({
    node,
    options,
    path,
    print
  } as NodePrinterArguments);
}
