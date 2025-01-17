import '@testing-library/jest-dom';
import { cleanup } from '@testing-library/react';
import { afterEach, vi } from 'vitest';
import { configure } from '@testing-library/react';
import { JSDOM } from 'jsdom';

// Setup JSDOM
const dom = new JSDOM('<!doctype html><html><body></body></html>');
global.window = dom.window;
global.document = dom.window.document;
global.navigator = dom.window.navigator;

// Configure testing library
configure({ testIdAttribute: 'data-testid' });

// Mock global objects
if (typeof window !== 'undefined') {
  window.URL.createObjectURL = vi.fn();
  window.URL.revokeObjectURL = vi.fn();
}

// Mock FileReader
global.FileReader = class {
  readAsDataURL() {
    setTimeout(() => {
      this.onloadend?.({
        target: {
          result: 'data:image/jpeg;base64,mock'
        }
      });
    }, 0);
  }
};

// Clean up after each test
afterEach(() => {
  cleanup();
  vi.clearAllMocks();
});