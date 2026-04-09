import { describe, it, expect } from 'vitest';
import albums from '../data/albums.json' assert { type: 'json' };
import band from '../data/band.json' assert { type: 'json' };

describe('Homepage data integration', () => {
  describe('featured albums', () => {
    const featuredAlbums = albums.slice(0, 2);

    it('shows exactly 2 featured albums', () => {
      expect(featuredAlbums).toHaveLength(2);
    });

    it('first featured album is Speed Metal Symphony', () => {
      expect(featuredAlbums[0].title).toBe('Speed Metal Symphony');
    });

    it('second featured album is Go Off!', () => {
      expect(featuredAlbums[1].title).toBe('Go Off!');
    });

    it('each featured album has a title, year, label, and tracks', () => {
      for (const album of featuredAlbums) {
        expect(album.title).toBeTruthy();
        expect(typeof album.year).toBe('number');
        expect(album.label).toBeTruthy();
        expect(Array.isArray(album.tracks)).toBe(true);
        expect(album.tracks.length).toBeGreaterThan(0);
      }
    });

    it('each album has at least 3 tracks (for preview listing)', () => {
      for (const album of featuredAlbums) {
        expect(album.tracks.length).toBeGreaterThanOrEqual(3);
      }
    });
  });

  describe('band info', () => {
    it('has a band name', () => {
      expect(band.name).toBe('Cacophony');
    });

    it('has formation and disbandment years', () => {
      expect(typeof band.formation_year).toBe('number');
      expect(typeof band.disbandment_year).toBe('number');
      expect(band.disbandment_year).toBeGreaterThan(band.formation_year);
    });

    it('has a non-empty bio', () => {
      expect(typeof band.bio).toBe('string');
      expect(band.bio.length).toBeGreaterThan(50);
    });

    it('has genres for display', () => {
      expect(Array.isArray(band.genres)).toBe(true);
      expect(band.genres.length).toBeGreaterThan(0);
    });
  });
});
