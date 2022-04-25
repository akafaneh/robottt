import { directionsArr, relativeDirectionsArr } from '../constants';

export type Direction = typeof directionsArr[number];
export type RelativeDirection = typeof relativeDirectionsArr[number];

export type Position = Record<'x' | 'y', number>;
