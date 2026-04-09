import { describe, it, expect } from 'vitest';
import media from './media.json' assert { type: 'json' };

describe('media.json', () => {
  it('has a videos array', () => {
    expect(media).toHaveProperty('videos');
    expect(Array.isArray(media.videos)).toBe(true);
    expect(media.videos.length).toBeGreaterThan(0);
  });

  it('each video has required fields', () => {
    for (const video of media.videos) {
      expect(video).toHaveProperty('id');
      expect(video).toHaveProperty('title');
      expect(video).toHaveProperty('description');
      expect(video).toHaveProperty('type');
    }
  });

  it('each video id is a non-empty string', () => {
    for (const video of media.videos) {
      expect(typeof video.id).toBe('string');
      expect(video.id.length).toBeGreaterThan(0);
    }
  });

  it('each video has a non-empty title', () => {
    for (const video of media.videos) {
      expect(typeof video.title).toBe('string');
      expect(video.title.length).toBeGreaterThan(0);
    }
  });
});
