import { doc } from 'prettier';
import type { Doc } from 'prettier';

import type { AssemblyLocalDefinitionWithComments } from '../ast-types';
import { printSeparatedList } from '../common/printer-helpers';
import type { NodePrinter } from '../types';

const { line } = doc.builders;

export const AssemblyLocalDefinition: NodePrinter = {
  print: ({ node, path, print }) => {
    const parts: Doc[] = [
      'let',
      printSeparatedList(path.map(print, 'names'), { firstSeparator: line })
    ];

    if ((node as AssemblyLocalDefinitionWithComments).expression !== null) {
      parts.push(':= ');
      parts.push(path.call(print, 'expression'));
    }

    return parts;
  }
};
