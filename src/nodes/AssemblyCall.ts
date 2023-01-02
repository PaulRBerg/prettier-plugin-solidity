import { printSeparatedList } from '../common/printer-helpers';

import type { AssemblyCallWithComments } from '../ast-types';
import type { NodePrinter } from '../types';

export const AssemblyCall: NodePrinter = {
  print: ({ node, path, print, options }) =>
    (node as AssemblyCallWithComments).arguments.length === 0 &&
    options.originalText.charAt(options.locEnd(node)) !== ')'
      ? (node as AssemblyCallWithComments).functionName
      : [
          (node as AssemblyCallWithComments).functionName,
          '(',
          printSeparatedList(path.map(print, 'arguments')),
          ')'
        ]
};
