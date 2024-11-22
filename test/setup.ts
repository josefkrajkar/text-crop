import '@testing-library/jest-dom';
import { vi } from 'vitest';

// Mock canvas and context for tests
const mockContext = {
  measureText: vi.fn().mockReturnValue({ width: 100 }),
  font: '',
};

const mockCanvas = {
  getContext: vi.fn().mockReturnValue(mockContext),
};

global.document.createElement = vi.fn().mockImplementation((tag) => {
  if (tag === 'canvas') return mockCanvas;
  return document.createElement(tag);
});
