import { describe, it, expect } from 'vitest';
import { generateLabels } from './hints';

describe('generateLabels', () => {
  it('returns an empty array (count=0)', () => {
    expect(generateLabels(0)).toEqual([]);
  });

  it('generates single-character labels (count<=26)', () => {
    expect(generateLabels(1)).toEqual(['a']);
    expect(generateLabels(3)).toEqual(['a', 'b', 'c']);
    const labels26 = generateLabels(26);
    expect(labels26).toHaveLength(26);
    expect(labels26[0]).toBe('a');
    expect(labels26[25]).toBe('z');
  });

  it('generates two-character labels (count>26)', () => {
    const labels = generateLabels(27);
    expect(labels).toHaveLength(27);
    expect(labels[0]).toBe('aa');
    expect(labels[25]).toBe('az');
    expect(labels[26]).toBe('ba');
  });

  it('generates the maximum two-character labels (676)', () => {
    const labels = generateLabels(676);
    expect(labels).toHaveLength(676);
    expect(labels[0]).toBe('aa');
    expect(labels[675]).toBe('zz');
  });

  it('generates three-character labels (count>676)', () => {
    const labels = generateLabels(677);
    expect(labels).toHaveLength(677);
    expect(labels[0]).toBe('aaa');
    expect(labels[676]).toBe('baa');
  });

  it('produces all-unique labels', () => {
    for (const count of [10, 26, 27, 100, 676, 700]) {
      const labels = generateLabels(count);
      expect(new Set(labels).size).toBe(count);
    }
  });
});
