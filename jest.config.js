/** @type {import('ts-jest/dist/types').InitialOptionsTsJest} */
module.exports = {
  preset: "ts-jest",
  testEnvironment: "jsdom",
  testMatch: ["**/**/*.test.ts", "**/**/*.test.tsx"],
  verbose: true,
  forceExit: true,
  clearMocks: true,
  resetMocks: true,
  restoreMocks: true,
  setupFiles: ["<rootDir>/browserMocks.js"],
  coverageThreshold: {
    './src/controllers': {
      branches: 71.42,
      functions: 77.77,
      lines: 92.82,
      statements: -6
    }
  }
};
