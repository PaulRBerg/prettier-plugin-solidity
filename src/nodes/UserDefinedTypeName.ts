import type { UserDefinedTypeNameWithComments } from '../ast-types';
import type { NodePrinter } from '../types';

export const UserDefinedTypeName: NodePrinter = {
  print: ({ node }) => (node as UserDefinedTypeNameWithComments).namePath
};
