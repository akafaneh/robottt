import { errorMessages } from '../constants/errors';

import { initPlain } from './commands';
import { parseCommandString } from './utils';

export const robotMain = ({ input }: { readonly input: readonly string[] }) => {
  try {
    const firstPlaceCommandIndex = input.findIndex((command) =>
      command.includes('PLACE')
    );

    if (firstPlaceCommandIndex < 0) {
      console.error(errorMessages.noRobotPlaced);
      return;
    }
    const inputWithPlaceCommandAtHead = input.slice(firstPlaceCommandIndex);

    let plain = initPlain({ width: 5, height: 5 });

    if (!plain) return;
    inputWithPlaceCommandAtHead.forEach((command) => {
      if (!plain) return;
      const newPlain = parseCommandString({ command, plain });
      plain = newPlain;
    });
  } catch {
    console.error(errorMessages.unknown);
  }
};
