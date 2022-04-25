import { ExcludeStrict } from 'type-zoo';

import {
  commandsArr,
  directionsArr,
  directionsInDegrees,
  directionsInDegreesReverse,
} from '../../constants';
import {
  Commands,
  Direction,
  Plain,
  Position,
  RelativeDirection,
} from '../../types';
import {
  moveRobot,
  placeRobot,
  report,
  rotateToLeft,
  rotateToRight,
} from '../commands';

export const isPositionInsideOfThePlainBounds = ({
  plain,
  position,
}: {
  readonly plain: Plain;
  readonly position: Position;
}) => {
  const { x, y } = position;
  const { width, height } = plain.size;
  return x >= 0 && y >= 0 && x < width && y < height;
};

/**
 * Function that takes rotation relative direction and cardinal and return the new cardinal direction.
 */
export const rotateAndGetDirection = ({
  relativeDirection,
  direction,
}: {
  readonly relativeDirection: RelativeDirection;
  readonly direction: Direction;
}) => {
  const newDirection =
    relativeDirection === 'LEFT'
      ? (-90 + 360 + directionsInDegrees[direction]) % 360
      : (90 + directionsInDegrees[direction]) % 360;

  return directionsInDegreesReverse[newDirection];
};

export const parseCommandString = ({
  command,
  plain,
}: {
  readonly command: string;
  readonly plain: Plain;
}) => {
  const commandsMapped: Record<
    ExcludeStrict<Commands, 'PLACE'>,
    typeof rotateToLeft
  > = {
    LEFT: rotateToLeft,
    RIGHT: rotateToRight,
    MOVE: moveRobot,
    REPORT: report,
  };
  //getting the first word, which should be the command
  const commandWord = command.split(' ');

  //TS limitation https://github.com/microsoft/TypeScript/issues/26255
  if (!(commandsArr as readonly string[]).includes(commandWord[0])) {
    return;
  }
  const typedCommandWord = commandWord[0] as Commands;

  //Handling and validating PLACE command
  if (typedCommandWord === 'PLACE') {
    const [x, y, dir] = commandWord[1].split(',');
    const parsedX = parseInt(x);
    const parsedY = parseInt(y);
    if (
      isNaN(parsedX) ||
      isNaN(parsedY) ||
      !(directionsArr as readonly string[]).includes(dir)
    ) {
      return;
    }
    return placeRobot({
      plain,
      robot: {
        position: { x: parsedX, y: parsedY },
        direction: dir as Direction,
      },
    });
  }

  return commandsMapped[typedCommandWord]({ plain });
};

export const getRandomInt = ({
  min = 0,
  max,
}: {
  readonly min: number;
  readonly max: number;
}) => {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min + 1)) + min;
};
