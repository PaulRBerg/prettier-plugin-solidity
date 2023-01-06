import * as comments from './comments';
import massageAstNode from './clean';
import { locEnd, locStart } from './loc';
import { options } from './options';
import parse from './parser';
import print from './printer';

import type { SupportLanguage } from 'prettier';
import type { Comment } from './ast-types';

interface LinguistSupportLanguage extends SupportLanguage {
  type?: string;
  color?: string;
}

// https://prettier.io/docs/en/plugins.html#languages
// https://github.com/ikatyang/linguist-languages/blob/master/data/Solidity.json
const languages: LinguistSupportLanguage[] = [
  {
    linguistLanguageId: 237469032,
    name: 'Solidity',
    type: 'programming',
    color: '#AA6746',
    aceMode: 'text',
    tmScope: 'source.solidity',
    extensions: ['.sol'],
    parsers: ['solidity-parse'],
    vscodeLanguageIds: ['solidity']
  }
];

// https://prettier.io/docs/en/plugins.html#parsers
const parser = { astFormat: 'solidity-ast', parse, locEnd, locStart };
const parsers = {
  'solidity-parse': parser
};

const canAttachComment = (node: Comment) =>
  node.type && node.type !== 'BlockComment' && node.type !== 'LineComment';

// https://prettier.io/docs/en/plugins.html#printers
const printers = {
  'solidity-ast': {
    canAttachComment,
    handleComments: {
      ownLine: comments.solidityHandleOwnLineComment,
      endOfLine: comments.solidityHandleEndOfLineComment,
      remaining: comments.solidityHandleRemainingComment
    },
    isBlockComment: comments.isBlockComment,
    massageAstNode,
    print,
    printComment: comments.printComment
  }
};

// https://prettier.io/docs/en/plugins.html#defaultoptions
const defaultOptions = {
  bracketSpacing: false,
  tabWidth: 4
};

export default {
  languages,
  parsers,
  printers,
  options,
  defaultOptions
};
