import test from 'ava';

import { Plain, Robot } from '../../types';

import { isPositionInsideOfThePlainBounds, parseCommandString } from '.';

test('isPositionInsideOfThePlainBounds', (t) => {
  t.is(
    isPositionInsideOfThePlainBounds({
      plain: {
        size: {
          width: 0,
          height: 0,
        },
      },
      position: {
        x: 0,
        y: 0,
      },
    }),
    false
  );

  t.is(
    isPositionInsideOfThePlainBounds({
      plain: {
        size: {
          width: 10,
          height: 10,
        },
      },
      position: {
        x: 0,
        y: 0,
      },
    }),
    true
  );

  t.is(
    isPositionInsideOfThePlainBounds({
      plain: {
        size: {
          width: 5,
          height: 7,
        },
      },
      position: {
        x: 6,
        y: 6,
      },
    }),
    false
  );

  t.is(
    isPositionInsideOfThePlainBounds({
      plain: {
        size: {
          width: 5,
          height: 7,
        },
      },
      position: {
        x: 5,
        y: 7,
      },
    }),
    false
  );
});

const robot: Robot = {
  position: {
    x: 0,
    y: 0,
  },
  direction: 'NORTH',
};
const plain: Plain = {
  size: {
    width: 5,
    height: 5,
  },
};

const plainWithRobot = { ...plain, robot: { ...robot } };

test('parseCommandString', (t) => {
  t.is(parseCommandString({ command: 'PLACE X,Y,F', plain }), undefined);
  t.is(
    parseCommandString({
      command: 'PLACE 0,0,NORTH',
      plain: plainWithRobot,
    }),
    undefined
  );
  t.is(parseCommandString({ command: 'LACE 0,0,NORTH', plain }), undefined);
  t.deepEqual(
    parseCommandString({ command: 'PLACE 0,0,NORTH', plain }),
    plainWithRobot
  );
  t.deepEqual(parseCommandString({ command: 'LEFT', plain: plainWithRobot }), {
    ...plainWithRobot,
    robot: { ...plainWithRobot.robot, direction: 'WEST' },
  });
  t.deepEqual(parseCommandString({ command: 'RIGHT', plain: plainWithRobot }), {
    ...plainWithRobot,
    robot: { ...plainWithRobot.robot, direction: 'EAST' },
  });
  t.deepEqual(parseCommandString({ command: 'MOVE', plain: plainWithRobot }), {
    ...plainWithRobot,
    robot: { ...plainWithRobot.robot, position: { y: 1, x: 0 } },
  });
  t.deepEqual(
    parseCommandString({ command: 'REPORT', plain: plainWithRobot }),
    {
      ...plainWithRobot,
    }
  );
});
