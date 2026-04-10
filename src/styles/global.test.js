import { describe, it, expect } from 'vitest';
import { readFileSync } from 'fs';
import { resolve } from 'path';

const css = readFileSync(resolve(import.meta.dirname, 'global.css'), 'utf-8');

describe('global.css design system', () => {
  describe('Google Fonts', () => {
    it('imports Space Mono for headings', () => {
      expect(css).toContain('Space+Mono');
    });

    it('imports Roboto Mono for body text', () => {
      expect(css).toContain('Roboto+Mono');
    });

    it('uses monospaced font families', () => {
      expect(css).toContain("--font-heading: 'Space Mono'");
      expect(css).toContain("--font-body: 'Roboto Mono'");
    });
  });

  describe('color palette', () => {
    it('defines a dark primary background', () => {
      expect(css).toContain('--color-bg-primary');
      expect(css).toMatch(/--color-bg-primary:\s*#0\w+/);
    });

    it('defines gold accent color', () => {
      expect(css).toContain('--color-accent-gold');
    });

    it('defines red accent color', () => {
      expect(css).toContain('--color-accent-red');
    });

    it('defines primary text color', () => {
      expect(css).toContain('--color-text-primary');
    });
  });

  describe('typography tokens', () => {
    it('defines heading font family', () => {
      expect(css).toContain('--font-heading');
    });

    it('defines body font family', () => {
      expect(css).toContain('--font-body');
    });

    it('defines a type scale from xs to 6xl', () => {
      for (const size of ['--text-xs', '--text-sm', '--text-base', '--text-lg', '--text-6xl']) {
        expect(css).toContain(size);
      }
    });
  });

  describe('spacing tokens', () => {
    it('defines spacing scale', () => {
      for (const token of ['--space-1', '--space-4', '--space-8', '--space-16']) {
        expect(css).toContain(token);
      }
    });
  });

  describe('utility classes', () => {
    it('defines .container', () => {
      expect(css).toContain('.container');
    });

    it('defines .section', () => {
      expect(css).toContain('.section');
    });

    it('defines .btn', () => {
      expect(css).toContain('.btn');
    });

    it('defines .btn--primary', () => {
      expect(css).toContain('.btn--primary');
    });

    it('defines .btn--secondary', () => {
      expect(css).toContain('.btn--secondary');
    });
  });

  describe('headings', () => {
    it('applies uppercase text transform to all headings', () => {
      expect(css).toMatch(/h1,\s*\nh2,\s*\nh3,\s*\nh4,\s*\nh5,\s*\nh6\s*\{[^}]*text-transform:\s*uppercase/s);
    });

    it('applies overflow-wrap to prevent heading overflow', () => {
      expect(css).toMatch(/h1,\s*\nh2,\s*\nh3,\s*\nh4,\s*\nh5,\s*\nh6\s*\{[^}]*overflow-wrap:\s*break-word/s);
    });
  });

  describe('base styles', () => {
    it('has box-sizing reset', () => {
      expect(css).toContain('box-sizing: border-box');
    });

    it('sets body background to primary bg color', () => {
      expect(css).toContain('background-color: var(--color-bg-primary)');
    });

    it('sets body font to body font family', () => {
      expect(css).toContain('font-family: var(--font-body)');
    });
  });

  describe('texture / atmosphere', () => {
    it('applies a grain noise effect via body::before', () => {
      expect(css).toContain('body::before');
      expect(css).toContain('feTurbulence');
    });
  });
});
