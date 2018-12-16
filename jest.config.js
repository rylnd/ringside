module.exports = {
  "transform": {
    ".(ts|tsx)": "ts-jest"
  },
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
