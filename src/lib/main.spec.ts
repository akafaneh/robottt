import { performance } from 'perf_hooks';

import test from 'ava';

import { robotMain } from './main';
import { getRandomInt } from './utils';

const arrayToGetFromRandomly = ['MOVE', 'LEFT', 'RIGHT', 'REPORT'];
const dummyStaticData = [
  'PLACE 1,2,EAST',
  'MOVE',
  'MOVE',
  'LEFT',
  'MOVE',
  'REPORT',
];

test('robotMain', (t) => {
  t.is(robotMain({ input: dummyStaticData }), undefined);
  const bigDummyData = [
    'PLACE 1,2,EAST',
    ...Array.from(Array(10000)).map(() => {
      return arrayToGetFromRandomly[
        getRandomInt({ max: arrayToGetFromRandomly.length - 1, min: 0 })
      ];
    }),
  ];
  const startTime = performance.now();
  t.is(robotMain({ input: bigDummyData }), undefined);
  console.log(`Time taken: ${performance.now() - startTime} milliseconds`);
});
