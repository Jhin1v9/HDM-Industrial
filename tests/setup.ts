import "@testing-library/jest-dom/vitest";
import { afterEach } from "vitest";

// RTL auto-registers cleanup() when imported (globals: true exposes afterEach),
// so component tests stay clean. Here we only reset storage between tests.
afterEach(() => {
  if (typeof window !== "undefined") {
    window.localStorage.clear();
  }
});
