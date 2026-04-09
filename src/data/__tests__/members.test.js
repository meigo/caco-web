const members = require('../members.json');

describe('members.json', () => {
  test('is a non-empty array', () => {
    expect(Array.isArray(members)).toBe(true);
    expect(members.length).toBeGreaterThan(0);
  });

  test('contains Jason Becker', () => {
    const jason = members.find(m => m.name === 'Jason Becker');
    expect(jason).toBeDefined();
  });

  test('contains Marty Friedman', () => {
    const marty = members.find(m => m.name === 'Marty Friedman');
    expect(marty).toBeDefined();
  });

  test('each member has required fields', () => {
    const requiredFields = ['name', 'born', 'birthplace', 'role', 'instruments', 'active_in_band', 'bio'];
    members.forEach(member => {
      requiredFields.forEach(field => {
        expect(member).toHaveProperty(field);
      });
    });
  });

  test('each member has instruments as a non-empty array', () => {
    members.forEach(member => {
      expect(Array.isArray(member.instruments)).toBe(true);
      expect(member.instruments.length).toBeGreaterThan(0);
    });
  });

  test('Jason Becker plays guitar', () => {
    const jason = members.find(m => m.name === 'Jason Becker');
    expect(jason.instruments).toContain('guitar');
  });

  test('Marty Friedman plays guitar', () => {
    const marty = members.find(m => m.name === 'Marty Friedman');
    expect(marty.instruments).toContain('guitar');
  });

  test('each member bio is a non-empty string', () => {
    members.forEach(member => {
      expect(typeof member.bio).toBe('string');
      expect(member.bio.length).toBeGreaterThan(0);
    });
  });
});
