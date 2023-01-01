const {
  doc: {
    builders: { hardline }
  }
} = require('prettier');

const { printComments } = require('../common/printer-helpers');

const ExpressionStatement = {
  print: ({ node, options, path, print }) => {
    const parts = [];

    const parent = path.getParentNode();

    if (parent.type === 'IfStatement') {
      if (node.comments && node.comments.length) {
        const comments = printComments(node, path, options);
        if (comments && comments.length) {
          parts.push(comments);
          parts.push(hardline);
        }
      }
    }

    parts.push(path.call(print, 'expression'));

    const omitSemicolon =
      parent.type === 'ForStatement' &&
      (node === parent.initExpression || node === parent.loopExpression);
    parts.push(omitSemicolon ? '' : ';');

    return parts;
  }
};

module.exports = ExpressionStatement;
