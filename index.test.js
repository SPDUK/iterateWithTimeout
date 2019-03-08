const iterateWithTimeout = require('./index');

describe('Works with valid inputs', () => {
  // usually takes 4, but could be 3
  test('[1,2,3,4] adds to [100,200,300,400] after 4 seconds', () => {
    expect.assertions(2);
    const start = Date.now();

    return iterateWithTimeout([1, 2, 3, 4], 1000, x => x * 100).then(arr => {
      const timeSpent = Math.floor((Date.now() - start) / 1000);
      expect(timeSpent).toBeGreaterThanOrEqual(4);

      expect(arr).toEqual([100, 200, 300, 400]);
    });
  });

  test('[1,2,3,4,5] should add to [300, 400,500] when using an index of 2 to start at index 2', () => {
    expect.assertions(1);

    return iterateWithTimeout([1, 2, 3, 4, 5], 50, x => x * 100, 2).then(arr => {
      expect(arr).toEqual([300, 400, 500]);
    });
  });

  test('[1] should add to the end of [900,1000] to create [900,1000,1100] when passing in array', () => {
    expect.assertions(1);
    return iterateWithTimeout([1], 50, x => x + 1099, 0, [900, 1000]).then(arr => {
      expect(arr).toEqual([900, 1000, 1100]);
    });
  });
});

describe('Throws error with invalid inputs', () => {
  const types = [
    'Hello',
    8888,
    new Set(),
    x => x,
    { a: 'object' },
    Symbol('notAnArray'),
    null,
    undefined,
    true,
    false
  ];

  test('', () => {
    return types.forEach(type => {
      expect(() =>
        iterateWithTimeout(type, 1000, x => x * 100).then(arr => {
          console.log(arr)
        })
      ).toThrow(TypeError);
    });
  });
});
