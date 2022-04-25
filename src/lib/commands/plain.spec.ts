import test from 'ava';

import { initPlain } from '.';

test('initPlain', (t) => {
  // invalid plain size
  t.deepEqual(
    initPlain({
      width: 0,
      height: 0,
    }),
    undefined
  );
  t.deepEqual(
    initPlain({
      width: 10,
      height: 10,
    }),
    {
      size: {
        width: 10,
        height: 10,
      },
    }
  );
  t.deepEqual(
    initPlain({
      width: 5,
      height: 7,
    }),
    {
      size: {
        width: 5,
        height: 7,
      },
    }
  );
});
