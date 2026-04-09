const discography = require('../discography.json');

describe('discography.json', () => {
  test('is a non-empty array', () => {
    expect(Array.isArray(discography)).toBe(true);
    expect(discography.length).toBeGreaterThan(0);
  });

  test('contains three albums', () => {
    expect(discography).toHaveLength(3);
  });

  test('each album has required fields', () => {
    const requiredFields = ['title', 'year', 'label', 'type', 'tracklist'];
    discography.forEach(album => {
      requiredFields.forEach(field => {
        expect(album).toHaveProperty(field);
      });
    });
  });

  test('each album tracklist is a non-empty array of strings', () => {
    discography.forEach(album => {
      expect(Array.isArray(album.tracklist)).toBe(true);
      expect(album.tracklist.length).toBeGreaterThan(0);
      album.tracklist.forEach(track => {
        expect(typeof track).toBe('string');
        expect(track.length).toBeGreaterThan(0);
      });
    });
  });

  test('contains Speed Metal Symphony (1987)', () => {
    const album = discography.find(a => a.title === 'Speed Metal Symphony');
    expect(album).toBeDefined();
    expect(album.year).toBe(1987);
  });

  test('contains Go Off! (1988)', () => {
    const album = discography.find(a => a.title === 'Go Off!');
    expect(album).toBeDefined();
    expect(album.year).toBe(1988);
  });

  test('contains Mountain Jam (1992)', () => {
    const album = discography.find(a => a.title === 'Mountain Jam');
    expect(album).toBeDefined();
    expect(album.year).toBe(1992);
  });

  test('album years are numbers', () => {
    discography.forEach(album => {
      expect(typeof album.year).toBe('number');
    });
  });

  test('album labels are non-empty strings', () => {
    discography.forEach(album => {
      expect(typeof album.label).toBe('string');
      expect(album.label.length).toBeGreaterThan(0);
    });
  });
});
