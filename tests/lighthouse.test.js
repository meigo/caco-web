import { describe, it, expect, beforeAll, afterAll } from 'vitest';
import { default as lighthouse } from 'lighthouse';
import { launch as chromeLaunch } from 'chrome-launcher';
import { spawn } from 'node:child_process';
import { setTimeout as sleep } from 'node:timers/promises';

const PREVIEW_PORT = 4399;
const BASE_URL = `http://localhost:${PREVIEW_PORT}/caco-web`;

/** Minimum required Lighthouse scores (0–100) */
const THRESHOLDS = {
  accessibility: 100,
  'best-practices': 100,
  seo: 100,
};

const PAGES = ['/', '/history', '/discography', '/gallery', '/media', '/members'];

let previewServer;

beforeAll(async () => {
  previewServer = spawn('npx', ['astro', 'preview', '--port', String(PREVIEW_PORT)], {
    cwd: process.cwd(),
    stdio: 'pipe',
    shell: true,
  });

  // Wait for the server to be ready
  await new Promise((resolve, reject) => {
    const timeout = setTimeout(() => reject(new Error('Preview server timed out')), 30_000);
    previewServer.stdout.on('data', (data) => {
      if (data.toString().includes('ready')) {
        clearTimeout(timeout);
        resolve();
      }
    });
    previewServer.on('error', (err) => {
      clearTimeout(timeout);
      reject(err);
    });
  });

  // Extra buffer for server to stabilise
  await sleep(500);
}, 35_000);

afterAll(() => {
  if (previewServer) {
    previewServer.kill('SIGTERM');
  }
});

describe('Lighthouse audits', () => {
  let chrome;
  let scores;

  beforeAll(async () => {
    chrome = await chromeLaunch({
      chromeFlags: ['--headless', '--no-sandbox', '--disable-gpu'],
    });

    const options = {
      logLevel: 'error',
      output: 'json',
      onlyCategories: ['accessibility', 'best-practices', 'seo'],
      port: chrome.port,
    };

    scores = {};
    for (const page of PAGES) {
      const result = await lighthouse(`${BASE_URL}${page}`, options);
      scores[page] = {
        accessibility: Math.round(result.lhr.categories.accessibility.score * 100),
        'best-practices': Math.round(result.lhr.categories['best-practices'].score * 100),
        seo: Math.round(result.lhr.categories.seo.score * 100),
      };
    }
  }, 120_000);

  afterAll(async () => {
    if (chrome) {
      try {
        await chrome.kill();
      } catch {
        // Ignore cleanup errors
      }
    }
  });

  for (const page of PAGES) {
    describe(`Page: ${page}`, () => {
      for (const [category, min] of Object.entries(THRESHOLDS)) {
        it(`${category} score >= ${min}`, () => {
          expect(scores[page][category]).toBeGreaterThanOrEqual(min);
        });
      }
    });
  }
});
