const Random = require('../src/Random');

function generateRandom() {
  return Math.floor(Math.random() * 100);
}

describe('Random', () => {
  describe('.between', () => {
    test('returns random number between min and max', () => {
      const min = generateRandom();
      const max = min + generateRandom();

      const number = Random.between(min, max);

      expect(number).toBeGreaterThanOrEqual(min);
      expect(number).toBeLessThanOrEqual(max);
    });
  });

  describe('.pick', () => {
    beforeEach(() => {
      jest.spyOn(Math, 'random').mockReturnValue(0.5);
    });

    afterEach(() => {
      jest.spyOn(Math, 'random').mockRestore();
    })

    test('returns true if random lte than factor', () => {
      expect(Random.pick(1)).toBe(true);

      expect(Random.pick(0.5)).toBe(true);

      expect(Random.pick(0)).toBe(false);
      expect(Random.pick(0.4)).toBe(false);
    });
  });
});
