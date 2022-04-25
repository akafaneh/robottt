import { Direction, Position } from '.';

export type Robot = {
  readonly position: Position;
  readonly direction: Direction;
};
/**
 * Plain point of origin (0, 0) is the most south west corner (bottom left).
 */
export type Plain = {
  readonly size: Record<'width' | 'height', number>;
  readonly robot?: Robot;
};
