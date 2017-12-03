module.exports = {
  "transform": {
    ".(ts|tsx)": "<rootDir>/node_modules/ts-jest/preprocessor.js"
  },
  "mapCoverage": true,
  "collectCoverageFrom": [
    "src/**/*.ts"
  ],
  "coveragePathIgnorePatterns": [
    "/__tests__/",
    "/node_modules/"
  ],
  "testEnvironment": "node",
  "testRegex": "__tests__/.*\\.test\\.ts$",
  "moduleFileExtensions": [
    "ts",
    "js",
    "json"
  ]
};
