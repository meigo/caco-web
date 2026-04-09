import { describe, it, expect } from 'vitest';
import albums from './albums.json' assert { type: 'json' };

describe('albums.json', () => {
  it('is a non-empty array', () => {
    expect(Array.isArray(albums)).toBe(true);
    expect(albums.length).toBeGreaterThan(0);
  });

  it('contains Speed Metal Symphony', () => {
    const album = albums.find(a => a.title === 'Speed Metal Symphony');
    expect(album).toBeDefined();
  });

  it('contains Go Off!', () => {
    const album = albums.find(a => a.title === 'Go Off!');
    expect(album).toBeDefined();
  });

  it('Speed Metal Symphony was released in 1987', () => {
    const album = albums.find(a => a.title === 'Speed Metal Symphony');
    expect(album.year).toBe(1987);
  });

  it('Go Off! was released in 1988', () => {
    const album = albums.find(a => a.title === 'Go Off!');
    expect(album.year).toBe(1988);
  });

  it('each album has required fields', () => {
    for (const album of albums) {
      expect(album).toHaveProperty('title');
      expect(album).toHaveProperty('year');
      expect(album).toHaveProperty('label');
      expect(album).toHaveProperty('tracks');
      expect(album).toHaveProperty('wikipedia_url');
    }
  });

  it('each album has a non-empty track list', () => {
    for (const album of albums) {
      expect(Array.isArray(album.tracks)).toBe(true);
      expect(album.tracks.length).toBeGreaterThan(0);
    }
  });

  it('each track has a number and title', () => {
    for (const album of albums) {
      for (const track of album.tracks) {
        expect(track).toHaveProperty('number');
        expect(track).toHaveProperty('title');
        expect(typeof track.number).toBe('number');
        expect(typeof track.title).toBe('string');
      }
    }
  });

  it('both albums are on Shrapnel Records', () => {
    for (const album of albums) {
      expect(album.label).toMatch(/Shrapnel/);
    }
  });
});
