import { describe, it, expect } from 'vitest';
import members from './members.json' assert { type: 'json' };

describe('members.json', () => {
  it('is a non-empty array', () => {
    expect(Array.isArray(members)).toBe(true);
    expect(members.length).toBeGreaterThan(0);
  });

  it('contains Marty Friedman', () => {
    const marty = members.find((m) => m.name === 'Marty Friedman');
    expect(marty).toBeDefined();
  });

  it('contains Jason Becker', () => {
    const jason = members.find((m) => m.name === 'Jason Becker');
    expect(jason).toBeDefined();
  });

  it('each member has required fields', () => {
    for (const member of members) {
      expect(member).toHaveProperty('name');
      expect(member).toHaveProperty('role');
      expect(member).toHaveProperty('bio');
      expect(member).toHaveProperty('instruments');
      expect(member).toHaveProperty('wikipedia_url');
    }
  });

  it('each member plays guitar', () => {
    for (const member of members) {
      expect(Array.isArray(member.instruments)).toBe(true);
      expect(member.instruments).toContain('Guitar');
    }
  });

  it('each member has a wikipedia link', () => {
    for (const member of members) {
      expect(member.wikipedia_url).toMatch(/wikipedia\.org/);
    }
  });
});
