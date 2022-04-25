import { commandsArr } from '../constants';

import { Plain } from './entities';

export type Commands = typeof commandsArr[number];

export type Command<T extends unknown> = (args: T) => Plain | undefined;
