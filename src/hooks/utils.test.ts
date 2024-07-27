import { isFalsy, uniq } from './utils';

describe('uniq function helper', () => {
  test('remove duplicate numbers', () => {
    expect(uniq([1, 1, 2, 3, 4, 5, 5, 6, 6])).toEqual([1, 2, 3, 4, 5, 6]);
  });
  test('remove duplicate strings', () => {
    expect(uniq(['abc', 'abc', 'jkl', 'mno', 'pos', 'jkl'])).toEqual([
      'abc',
      'jkl',
      'mno',
      'pos',
    ]);
  });
});

describe('isFalsy function helper', () => {
  test('when input is null', () => {
    expect(isFalsy(null)).toEqual(true);
  });
  test('when input is empty object', () => {
    expect(isFalsy({})).toEqual(true);
  });
  test('when input is empty array', () => {
    expect(isFalsy([])).toEqual(true);
  });
  test('when input is undefined', () => {
    expect(isFalsy(null)).toEqual(true);
  });
});
