/** @type {import('jest').Config} */
module.exports = {
  testEnvironment: "jsdom", // 'jsdom' for front-end tests
  clearMocks: true,
  testMatch: ["**/?(*.)+(spec|test).[jt]s?(x)"],
  collectCoverageFrom: ["src/**/*.{js,jsx,ts,tsx}"],
  coverageThreshold: {
    global: {
      branches: 80,
      functions: 80,
      lines: 80,
      statements: 80,
    },
  },
};
