import { directionsStepValue } from '../../constants';
import { errorMessages } from '../../constants/errors';
import { Command, Plain, RelativeDirection, Robot } from '../../types';
import {
  isPositionInsideOfThePlainBounds,
  rotateAndGetDirection,
} from '../utils';

export const placeRobot: Command<{
  readonly robot: Robot;
  readonly plain: Plain;
}> = ({ robot, plain }) => {
  if (plain.robot) {
    console.error(errorMessages.robotExist);
    return;
  }

  if (!isPositionInsideOfThePlainBounds({ plain, position: robot.position })) {
    console.error(errorMessages.outOfBounds);
    return { ...plain };
  }

  return { ...plain, robot };
};

export const moveRobot: Command<{
  readonly plain: Plain;
}> = ({ plain }: { readonly plain: Plain }) => {
  if (!plain.robot) {
    console.error(errorMessages.noRobot);
    return;
  }

  const { position, direction } = plain.robot;

  const newPosition = {
    x: position.x + directionsStepValue[direction].x,
    y: position.y + directionsStepValue[direction].y,
  };

  if (!isPositionInsideOfThePlainBounds({ plain, position: newPosition })) {
    console.error(errorMessages.outOfBounds);
    return { ...plain };
  }

  return { ...plain, robot: { ...plain.robot, position: newPosition } };
};

const rotateRobot =
  ({ relativeDirection }: { readonly relativeDirection: RelativeDirection }) =>
  ({ plain }: { readonly plain: Plain }) => {
    if (!plain.robot) {
      console.error(errorMessages.noRobot);
      return;
    }
    const newDirection = rotateAndGetDirection({
      direction: plain.robot.direction,
      relativeDirection,
    });

    const newRobot = { ...plain.robot, direction: newDirection };
    return { ...plain, robot: newRobot };
  };

export const rotateToLeft: Command<{
  readonly plain: Plain;
}> = rotateRobot({ relativeDirection: 'LEFT' });
export const rotateToRight: Command<{
  readonly plain: Plain;
}> = rotateRobot({ relativeDirection: 'RIGHT' });

export const report: Command<{
  readonly plain: Plain;
}> = ({ plain }) => {
  if (!plain.robot) {
    console.error(errorMessages.noRobot);
    return;
  }
  const {
    position: { x, y },
    direction,
  } = plain.robot;
  console.log(`Output: ${x}, ${y}, ${direction}`);
  return plain;
};
