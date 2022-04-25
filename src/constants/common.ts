import { Direction, Position } from '../types';

/**
 * Commands stored in an array first then the types extracted from it so if needed we can loop over the commands for input validation reasons.
 */
export const commandsArr = [
  'PLACE',
  'MOVE',
  'LEFT',
  'RIGHT',
  'REPORT',
] as const;

export const directionsArr = ['NORTH', 'EAST', 'SOUTH', 'WEST'] as const;
export const relativeDirectionsArr = ['LEFT', 'RIGHT'] as const;

export const directionsStepValue: Record<Direction, Position> = {
  NORTH: { x: 0, y: 1 },
  EAST: { x: 1, y: 0 },
  SOUTH: { x: 0, y: -1 },
  WEST: { x: -1, y: 0 },
};

export const directionsInDegrees: Record<Direction, number> = {
  NORTH: 0,
  EAST: 90,
  SOUTH: 180,
  WEST: 270,
};

export const directionsInDegreesReverse: Record<number, Direction> = {
  0: 'NORTH',
  360: 'NORTH',
  90: 'EAST',
  180: 'SOUTH',
  270: 'WEST',
};
