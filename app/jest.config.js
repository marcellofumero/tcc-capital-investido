module.exports = {
  // automock: false,
  // bail: true,
  // clearMocks: true,
  collectCoverage: true,
  collectCoverageFrom: [
    "<rootDir>/src/business/services/*.js",
    "<rootDir>/src/business/services/*/*.js",
    "<rootDir>/src/business/repository/*.js",
    "<rootDir>/src/business/repository/*/*.js"],
  coveragePathIgnorePatterns: [],
  coverageDirectory: "coverage",
  coverageProvider: "v8",
  testEnvironment: "node",
  testMatch: [
    "**/__tests__/**/*.spec.js?(x)"
  ],
  moduleNameMapper: {
    "^@/(.*)$": "<rootDir>/src/$1"
  }

};
