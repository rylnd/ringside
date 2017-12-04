module.exports = {
  "transform": {
    ".(ts|tsx)": "<rootDir>/node_modules/ts-jest/preprocessor.js"
  },
  "mapCoverage": true,
  "collectCoverageFrom": [
    "src/**/*.ts"
  ],
  "coveragePathIgnorePatterns": [
    "/test/",
    "/node_modules/"
  ],
  "testEnvironment": "node",
  "testRegex": "test/.*\\.test\\.ts$",
  "moduleFileExtensions": [
    "ts",
    "js",
    "json"
  ]
};
