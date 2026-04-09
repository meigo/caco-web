import { describe, it, expect } from 'vitest';
import band from './band.json' assert { type: 'json' };

describe('band.json', () => {
  it('has required top-level fields', () => {
    expect(band).toHaveProperty('name');
    expect(band).toHaveProperty('formation_year');
    expect(band).toHaveProperty('origin');
    expect(band).toHaveProperty('genres');
    expect(band).toHaveProperty('active_years');
    expect(band).toHaveProperty('bio');
    expect(band).toHaveProperty('wikipedia_url');
  });

  it('has correct band name', () => {
    expect(band.name).toBe('Cacophony');
  });

  it('was formed in 1986', () => {
    expect(band.formation_year).toBe(1986);
  });

  it('disbanded in 1989', () => {
    expect(band.disbandment_year).toBe(1989);
  });

  it('originated in California', () => {
    expect(band.origin).toMatch(/California/);
  });

  it('genres is a non-empty array', () => {
    expect(Array.isArray(band.genres)).toBe(true);
    expect(band.genres.length).toBeGreaterThan(0);
  });

  it('wikipedia_url points to wikipedia', () => {
    expect(band.wikipedia_url).toMatch(/wikipedia\.org/);
  });
});
