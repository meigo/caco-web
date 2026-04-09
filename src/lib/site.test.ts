import { describe, it, expect } from 'vitest';
import { SITE_TITLE, SITE_DESCRIPTION } from './site';

describe('site constants', () => {
  it('exports SITE_TITLE as a non-empty string', () => {
    expect(typeof SITE_TITLE).toBe('string');
    expect(SITE_TITLE.length).toBeGreaterThan(0);
  });

  it('exports SITE_DESCRIPTION as a non-empty string', () => {
    expect(typeof SITE_DESCRIPTION).toBe('string');
    expect(SITE_DESCRIPTION.length).toBeGreaterThan(0);
  });
});
