import type * as Prettier from 'prettier';

export interface PrettierOptions extends Prettier.Options {
  compiler: string;
}
