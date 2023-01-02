import { doc } from 'prettier';

import type { NodePrinter } from '../types';

const { group } = doc.builders;

export const UncheckedStatement: NodePrinter = {
  print: ({ path, print }) => group(['unchecked ', path.call(print, 'block')])
};
