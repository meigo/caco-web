import { describe, it, expect } from 'vitest';
import { readFileSync, existsSync } from 'node:fs';
import { join } from 'node:path';

const distDir = join(process.cwd(), 'dist');
const indexPath = join(distDir, 'index.html');

describe('build output', () => {
  it('generates dist/index.html', () => {
    expect(existsSync(indexPath)).toBe(true);
  });

  it('index.html contains expected page title', () => {
    const html = readFileSync(indexPath, 'utf-8');
    expect(html).toContain('<title>Cacophony</title>');
  });

  it('index.html contains expected heading', () => {
    const html = readFileSync(indexPath, 'utf-8');
    expect(html).toContain('<h1>Cacophony</h1>');
  });

  it('index.html is valid HTML with doctype', () => {
    const html = readFileSync(indexPath, 'utf-8');
    expect(html.toLowerCase()).toMatch(/^<!doctype html>/);
  });

  it('built HTML includes inlined dark background CSS variable', () => {
    const html = readFileSync(indexPath, 'utf-8');
    expect(html).toContain('--color-bg');
  });

  it('built HTML includes inlined gold accent CSS variable', () => {
    const html = readFileSync(indexPath, 'utf-8');
    expect(html).toContain('--color-gold');
  });

  it('built HTML references Google Fonts for metal typography', () => {
    const html = readFileSync(indexPath, 'utf-8');
    expect(html).toContain('fonts.googleapis.com');
  });
});
