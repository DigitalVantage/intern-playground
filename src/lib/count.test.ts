import { describe, expect, it } from 'vitest';
import { peopleSoFar } from './count';

describe('peopleSoFar', () => {
  it('formats singular correctly', () => {
    expect(peopleSoFar(1)).toBe('1 person so far');
  });

  it('formats plural correctly', () => {
    expect(peopleSoFar(2)).toBe('2 people so far');
    expect(peopleSoFar(5)).toBe('5 people so far');
  });
});