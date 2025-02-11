const { printSeparatedList } = require('../common/printer-helpers');

const AssemblyCall = {
  print: ({ node, path, print, options }) =>
    node.arguments.length === 0 &&
    options.originalText.charAt(options.locEnd(node)) !== ')'
      ? node.functionName
      : [
          node.functionName,
          '(',
          printSeparatedList(path.map(print, 'arguments')),
          ')'
        ]
};

module.exports = AssemblyCall;
