const nextJest = require('next/jest');
const createJestConfig = nextJest({ dir: './' });

module.exports = createJestConfig({
  setupFilesAfterEnv: ['<rootDir>/jest.setup.js'],
  testEnvironment: 'jest-environment-jsdom',
  collectCoverage: true,
  coverageDirectory: 'coverage',
  coverageReporters: ['lcov', 'text', 'html'],
  coverageThreshold: {
    global: {
      branches: 80,
      functions: 80,
      lines: 80,
      statements: 80
    }
  },
  collectCoverageFrom: [
    "components/**/*.{js,jsx,ts,tsx}",
    "src/**/*.{js,jsx,ts,tsx}",
    "!**/node_modules/**",  // Ignore node_modules
    "!**/.next/**",         // Ignore Next.js cache
    "!**/coverage/**",      // Ignore previous coverage reports
    "!**/jest.config.js",   // Ignore Jest config itself
    "!**/*.config.js"       // Ignore other config files
  ],
  transformIgnorePatterns: ["<rootDir>/node_modules/"], // Ensure transformations
});
