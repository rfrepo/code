import { defineConfig } from "vitest/config";

// Services are plain TypeScript and run in Node. Components (.tsx tests) need a DOM, so they run in happy-dom.
export default defineConfig({
  resolve: { tsconfigPaths: true },
  test: {
    projects: [
      {
        extends: true,
        test: {
          name: "node",
          include: ["src/**/__tests__/*.test.ts"],
          environment: "node"
        }
      },
      {
        extends: true,
        test: {
          name: "dom",
          include: ["src/**/__tests__/*.test.tsx"],
          environment: "happy-dom"
        }
      }
    ]
  }
});
