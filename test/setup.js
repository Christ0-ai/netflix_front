import { afterEach } from 'vitest';
import { cleanup } from '@testing-library/react';

// jsdom does not implement window.matchMedia, but embla-carousel relies on it
// to resolve responsive breakpoint options. Provide a minimal mock.
Object.defineProperty(window, 'matchMedia', {
  writable: true,
  value: (query) => ({
    matches: false,
    media: query,
    onchange: null,
    addListener: () => {},
    removeListener: () => {},
    addEventListener: () => {},
    removeEventListener: () => {},
    dispatchEvent: () => false,
  }),
});

// jsdom does not implement IntersectionObserver, which embla-carousel uses
// to track slide visibility.
class MockIntersectionObserver {
  observe = () => {};
  unobserve = () => {};
  disconnect = () => {};
}
window.IntersectionObserver = MockIntersectionObserver;
globalThis.IntersectionObserver = MockIntersectionObserver;

// jsdom does not implement ResizeObserver, which embla-carousel uses
// to react to container/slide size changes.
class MockResizeObserver {
  observe = () => {};
  unobserve = () => {};
  disconnect = () => {};
}
window.ResizeObserver = MockResizeObserver;
globalThis.ResizeObserver = MockResizeObserver;

afterEach(() => {
  cleanup();
});
