import { doc } from 'prettier';
import type { AstPath, Doc } from 'prettier';

import type { BinaryOperationPrinter } from './types';

const { group, line, indent } = doc.builders;

const indentIfNecessaryBuilder = (path: AstPath) => (doc: Doc) => {
  let node = path.getNode();
  for (let i = 0; ; i += 1) {
    const parentNode = path.getParentNode(i);
    if (parentNode.type === 'ReturnStatement') return doc;
    if (parentNode.type === 'IfStatement') return doc;
    if (parentNode.type === 'ForStatement') return doc;
    if (parentNode.type === 'WhileStatement') return doc;
    if (parentNode.type !== 'BinaryOperation') return indent(doc);
    if (node === parentNode.right) return doc;
    node = parentNode;
  }
};

export default {
  match: (op) => ['<', '>', '<=', '>=', '==', '!='].includes(op),
  print: (node, path, print) => {
    const indentIfNecessary = indentIfNecessaryBuilder(path);

    const right: Doc = [node.operator, line, path.call(print, 'right')];
    // If it's a single binary operation, avoid having a small right
    // operand like - 1 on its own line
    const shouldGroup =
      node.left.type !== 'BinaryOperation' &&
      path.getParentNode().type !== 'BinaryOperation';
    return group([
      path.call(print, 'left'),
      ' ',
      indentIfNecessary(shouldGroup ? group(right) : right)
    ]);
  }
} as BinaryOperationPrinter;
