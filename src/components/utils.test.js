import { alternate } from './utils';

describe('alternate', function () {
  const sep = ';';
  test.each([
    [sep, [], []],
    [sep, [1], [1]],
    [sep, [1, 2], [1, sep, 2]],
    [sep, [1, 2, 3], [1, sep, 2, sep, 3]],
  ])('works', (sep, list, expected) => {
    expect(alternate(sep, list)).toEqual(expected)
  })
});
