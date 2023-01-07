import { doc } from 'prettier';
import type { Doc } from 'prettier';

import { isLabel } from '../common/util';
import type { GroupWithId, LabelWithLabel } from '../common/util';
import type { NodePrinter } from '../types';

const { group, indent, indentIfBreak, label, softline } = doc.builders;

let groupIndex = 0;

export const IndexAccess: NodePrinter = {
  print: ({ path, print }) => {
    let baseDoc = path.call(print, 'base');
    let indexDoc: Doc = group([
      indent([softline, path.call(print, 'index')]),
      softline,
      ']'
    ]);

    // If we are at the end of a MemberAccessChain we should indent the
    // arguments accordingly.
    if (
      isLabel(baseDoc) &&
      (baseDoc as LabelWithLabel).label === 'MemberAccessChain'
    ) {
      baseDoc = group((baseDoc as LabelWithLabel).contents, {
        id: Symbol(`IndexAccess.base-${groupIndex}`)
      });

      groupIndex += 1;

      indexDoc = indentIfBreak(indexDoc, {
        groupId: (baseDoc as GroupWithId).id as symbol
      });
      // We wrap the expression in a label in case there is an IndexAccess or
      // a FunctionCall following this IndexAccess.
      return label('MemberAccessChain', [baseDoc, '[', indexDoc]);
    }

    return [baseDoc, '[', indexDoc];
  }
};
