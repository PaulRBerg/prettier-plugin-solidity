import { doc } from 'prettier';

import type { NodePrinter } from '../types';

const { join } = doc.builders;

export const AssemblyFor: NodePrinter = {
  print: ({ path, print }) =>
    join(' ', [
      'for',
      path.call(print, 'pre'),
      path.call(print, 'condition'),
      path.call(print, 'post'),
      path.call(print, 'body')
    ])
};
