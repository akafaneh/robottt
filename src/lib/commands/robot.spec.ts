import test from 'ava';

import { Plain, Robot } from '../../types';

import { moveRobot, placeRobot, rotateToLeft, rotateToRight } from '.';
const robot: Robot = {
  direction: 'NORTH',
  position: {
    x: 0,
    y: 0,
  },
};

const testPlainNoRobot: Plain = {
  size: {
    width: 10,
    height: 10,
  },
};

const testPlainWithRobot: Plain = {
  ...testPlainNoRobot,
  robot: {
    ...robot,
  },
};
test('placeRobot', (t) => {
  t.deepEqual(
    placeRobot({
      robot: {
        position: {
          x: 0,
          y: 0,
        },
        direction: 'NORTH',
      },
      plain: testPlainNoRobot,
    }),
    {
      robot: {
        direction: 'NORTH',
        position: {
          x: 0,
          y: 0,
        },
      },
      ...testPlainNoRobot,
    }
  );
  //Robot already exist
  t.is(
    placeRobot({
      robot: {
        position: {
          x: 0,
          y: 0,
        },
        direction: 'NORTH',
      },
      plain: testPlainWithRobot,
    }),
    undefined
  );
});

test('moveRobot', (t) => {
  //No robot
  t.is(moveRobot({ plain: testPlainNoRobot }), undefined);

  t.deepEqual(
    moveRobot({
      plain: { ...testPlainNoRobot, robot: { ...robot, direction: 'EAST' } },
    }),
    {
      ...testPlainNoRobot,
      robot: {
        ...robot,
        direction: 'EAST',
        position: {
          x: 1,
          y: 0,
        },
      },
    }
  );
  t.deepEqual(
    moveRobot({
      plain: { ...testPlainNoRobot, robot: { ...robot, direction: 'NORTH' } },
    }),
    {
      ...testPlainNoRobot,
      robot: {
        ...robot,
        direction: 'NORTH',
        position: {
          x: 0,
          y: 1,
        },
      },
    }
  );
  //Out of bound error
  t.is(
    moveRobot({
      plain: { ...testPlainNoRobot, robot: { ...robot, direction: 'WEST' } },
    }),
    undefined
  );
  t.is(
    moveRobot({
      plain: { ...testPlainNoRobot, robot: { ...robot, direction: 'SOUTH' } },
    }),
    undefined
  );
});

test('rotateToLeft', (t) => {
  t.deepEqual(
    rotateToLeft({
      plain: { ...testPlainNoRobot, robot: { ...robot, direction: 'NORTH' } },
    }),
    {
      ...testPlainNoRobot,
      robot: {
        ...robot,
        direction: 'WEST',
      },
    }
  );
  t.deepEqual(
    rotateToLeft({
      plain: { ...testPlainNoRobot, robot: { ...robot, direction: 'EAST' } },
    }),
    {
      ...testPlainNoRobot,
      robot: {
        ...robot,
        direction: 'NORTH',
      },
    }
  );
  t.deepEqual(
    rotateToLeft({
      plain: { ...testPlainNoRobot, robot: { ...robot, direction: 'SOUTH' } },
    }),
    {
      ...testPlainNoRobot,
      robot: {
        ...robot,
        direction: 'EAST',
      },
    }
  );
  t.deepEqual(
    rotateToLeft({
      plain: { ...testPlainNoRobot, robot: { ...robot, direction: 'WEST' } },
    }),
    {
      ...testPlainNoRobot,
      robot: {
        ...robot,
        direction: 'SOUTH',
      },
    }
  );
});

test('rotateToRight', (t) => {
  t.deepEqual(
    rotateToRight({
      plain: { ...testPlainNoRobot, robot: { ...robot, direction: 'NORTH' } },
    }),
    {
      ...testPlainNoRobot,
      robot: {
        ...robot,
        direction: 'EAST',
      },
    }
  );

  t.deepEqual(
    rotateToRight({
      plain: { ...testPlainNoRobot, robot: { ...robot, direction: 'EAST' } },
    }),
    {
      ...testPlainNoRobot,
      robot: {
        ...robot,
        direction: 'SOUTH',
      },
    }
  );
  t.deepEqual(
    rotateToRight({
      plain: { ...testPlainNoRobot, robot: { ...robot, direction: 'SOUTH' } },
    }),
    {
      ...testPlainNoRobot,
      robot: {
        ...robot,
        direction: 'WEST',
      },
    }
  );
  t.deepEqual(
    rotateToRight({
      plain: { ...testPlainNoRobot, robot: { ...robot, direction: 'WEST' } },
    }),
    {
      ...testPlainNoRobot,
      robot: {
        ...robot,
        direction: 'NORTH',
      },
    }
  );
});
