import { describe, it, expect } from 'vitest';
import { measureText } from '../lib/utils/helpers';

describe('MeasureText function', () => {
  // Happy paths
  it('should return true when text width is less than maxWidth', () => {
    const canvas = document.createElement('canvas');
    const context = canvas.getContext('2d');
    if (context) {
      context.font = '16px Arial';
      const result = measureText(context, 'Hello', 100);
      expect(result).equals(true);
    }
  });
  it('should return true when text width is equal to maxWidth', () => {
    const canvas = document.createElement('canvas');
    const context = canvas.getContext('2d');
    if (context) {
      context.font = '16px Arial';
      const text = 'Hello';
      const maxWidth = context.measureText(text).width;
      const result = measureText(context, text, maxWidth);
      expect(result).equals(true);
    }
  });
  it('should return false when text width exceeds maxWidth', () => {
    const canvas = document.createElement('canvas');
    const context = canvas.getContext('2d');
    if (context) {
      context.font = '16px Arial';
      const result = measureText(context, 'This is a long text', 10);
      expect(result).equals(false);
    }
  });

  // Edge cases
  it('should return true when text is an empty string', () => {
    const canvas = document.createElement('canvas');
    const context = canvas.getContext('2d');
    if (context) {
      context.font = '16px Arial';
      const result = measureText(context, '', 100);
      expect(result).equals(true);
    }
  });
  it('should return false when maxWidth is zero', () => {
    const canvas = document.createElement('canvas');
    const context = canvas.getContext('2d');
    if (context) {
      context.font = '16px Arial';
      const result = measureText(context, 'Hello', 0);
      expect(result).equals(false);
    }
  });
  it('should return true when text width with non-standard font is less than maxWidth', () => {
    const canvas = document.createElement('canvas');
    const context = canvas.getContext('2d');
    if (context) {
      context.font = '20px Comic Sans MS';
      const result = measureText(context, 'Hello', 200);
      expect(result).equals(true);
    }
  });
});
