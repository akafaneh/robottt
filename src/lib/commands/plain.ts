import { Plain } from '../../types';
import { Command } from '../../types';

/**
 * Function that return a new plain with the given size if the size is valid.
 */
export const initPlain: Command<Plain['size']> = ({ width, height }) => {
  if (width <= 0 || height <= 0) {
    console.error('Plain width and height must be greater than 0');
    return;
  }
  const plain: Plain = {
    size: { width, height },
  };
  return plain;
};
