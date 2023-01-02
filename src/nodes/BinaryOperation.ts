/* eslint-disable consistent-return */
import printers from '../binary-operator-printers';

import type { BinaryOperationWithComments } from '../ast-types';
import type { NodePrinter } from '../types';

export const BinaryOperation: NodePrinter = {
  print: ({ node, path, print }) => {
    const binaryOperationPrinter = printers.find((printer) =>
      printer.match((node as BinaryOperationWithComments).operator)
    );
    if (binaryOperationPrinter === undefined) {
      throw new Error(
        `Assertion error: no printer found for operator ${JSON.stringify(
          (node as BinaryOperationWithComments).operator
        )}`
      );
    }
    return binaryOperationPrinter.print(
      node as BinaryOperationWithComments,
      path,
      print
    );
  }
};
