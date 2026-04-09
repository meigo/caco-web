import { describe, it, expect } from 'vitest';
import { readFileSync, existsSync } from 'node:fs';
import { join } from 'node:path';

const cssPath = join(process.cwd(), 'src', 'styles', 'global.css');
const css = existsSync(cssPath) ? readFileSync(cssPath, 'utf-8') : '';

describe('global.css — file', () => {
  it('exists at src/styles/global.css', () => {
    expect(existsSync(cssPath)).toBe(true);
  });
});

describe('global.css — color palette', () => {
  it('defines a near-black background variable', () => {
    // matches very dark hex values like #000–#1ff (first digit 0 or 1)
    expect(css).toMatch(/--color-bg\s*:\s*#[01][0-9a-f]/i);
  });

  it('defines a gold accent variable', () => {
    expect(css).toContain('--color-gold');
  });

  it('defines a red accent variable', () => {
    expect(css).toContain('--color-red');
  });

  it('uses dark background on body', () => {
    expect(css).toContain('background-color: var(--color-bg)');
  });
});

describe('global.css — typography', () => {
  it('defines a heading font variable', () => {
    expect(css).toContain('--font-heading');
  });

  it('includes Metal Mania or a gothic/serif metal font', () => {
    expect(css).toMatch(/Metal Mania|UnifrakturMaguntia|Cinzel|gothic|blackletter/i);
  });

  it('applies heading font family to h1–h6', () => {
    expect(css).toContain('font-family: var(--font-heading)');
  });

  it('sets themed heading color', () => {
    expect(css).toContain('--color-text-heading');
  });
});

describe('global.css — reset / normalize', () => {
  it('includes universal box-sizing reset', () => {
    expect(css).toContain('box-sizing: border-box');
  });

  it('resets margin to 0', () => {
    expect(css).toContain('margin: 0');
  });

  it('resets padding to 0', () => {
    expect(css).toContain('padding: 0');
  });
});

describe('global.css — link styles', () => {
  it('sets link color via variable', () => {
    expect(css).toContain('color: var(--color-text-link)');
  });

  it('includes hover state for links', () => {
    expect(css).toMatch(/a:hover/);
  });
});
