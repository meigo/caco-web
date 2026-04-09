const band = require('../band.json');

describe('band.json', () => {
  test('has required fields', () => {
    expect(band).toHaveProperty('name');
    expect(band).toHaveProperty('founded');
    expect(band).toHaveProperty('disbanded');
    expect(band).toHaveProperty('origin');
    expect(band).toHaveProperty('genres');
    expect(band).toHaveProperty('active_years');
    expect(band).toHaveProperty('labels');
  });

  test('name is Cacophony', () => {
    expect(band.name).toBe('Cacophony');
  });

  test('founded in 1986', () => {
    expect(band.founded).toBe(1986);
  });

  test('disbanded in 1993', () => {
    expect(band.disbanded).toBe(1993);
  });

  test('origin is in California', () => {
    expect(band.origin).toMatch(/California/);
  });

  test('genres is a non-empty array', () => {
    expect(Array.isArray(band.genres)).toBe(true);
    expect(band.genres.length).toBeGreaterThan(0);
  });

  test('labels is a non-empty array', () => {
    expect(Array.isArray(band.labels)).toBe(true);
    expect(band.labels.length).toBeGreaterThan(0);
  });
});
