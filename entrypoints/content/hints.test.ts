import { describe, it, expect } from 'vitest';
import { generateLabels } from './hints';

describe('generateLabels', () => {
  it('空の配列を返す（count=0）', () => {
    expect(generateLabels(0)).toEqual([]);
  });

  it('1文字ラベルを生成する（count≤26）', () => {
    expect(generateLabels(1)).toEqual(['a']);
    expect(generateLabels(3)).toEqual(['a', 'b', 'c']);
    const labels26 = generateLabels(26);
    expect(labels26).toHaveLength(26);
    expect(labels26[0]).toBe('a');
    expect(labels26[25]).toBe('z');
  });

  it('2文字ラベルを生成する（count>26）', () => {
    const labels = generateLabels(27);
    expect(labels).toHaveLength(27);
    expect(labels[0]).toBe('aa');
    expect(labels[25]).toBe('az');
    expect(labels[26]).toBe('ba');
  });

  it('2文字ラベルの最大（676個）を生成する', () => {
    const labels = generateLabels(676);
    expect(labels).toHaveLength(676);
    expect(labels[0]).toBe('aa');
    expect(labels[675]).toBe('zz');
  });

  it('3文字ラベルを生成する（count>676）', () => {
    const labels = generateLabels(677);
    expect(labels).toHaveLength(677);
    expect(labels[0]).toBe('aaa');
    expect(labels[676]).toBe('baa');
  });

  it('全ラベルが一意である', () => {
    for (const count of [10, 26, 27, 100, 676, 700]) {
      const labels = generateLabels(count);
      expect(new Set(labels).size).toBe(count);
    }
  });
});
