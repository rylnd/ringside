const path = require('path');

const SRC = path.resolve(__dirname, '../src/');

module.exports = (baseConfig, env, defaultConfig) => ({
  ...defaultConfig,
  module: {
    rules: [
      ...defaultConfig.module.rules,
      {
        test: /\.tsx?$/,
        loader: 'ts-loader',
      },
    ],
  },
  resolve: {
    extensions: [...defaultConfig.resolve.extensions, '.ts', '.tsx'],
    modules: [...defaultConfig.resolve.modules, SRC],
  },
});
