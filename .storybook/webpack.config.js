const path = require('path');

const SRC = path.resolve(__dirname, '../src/');

module.exports = ({ config} ) => ({
  ...config,
  module: {
    rules: [
      ...config.module.rules,
      {
        test: /\.tsx?$/,
        loader: 'ts-loader',
      },
    ],
  },
  resolve: {
    extensions: [...config.resolve.extensions, '.ts', '.tsx'],
    modules: [...config.resolve.modules, SRC],
  },
});
