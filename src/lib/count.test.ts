import { describe, it, expect } from 'vitest';
import { peopleSoFar } from './count';

describe('peopleSoFar', () => {
  it('correctly formats different counts', () => {
    expect(peopleSoFar(0)).toBe('0 people so far');
    expect(peopleSoFar(1)).toBe('1 person so far');
    expect(peopleSoFar(2)).toBe('2 people so far');
    expect(peopleSoFar(21)).toBe('21 people so far');
  });
});