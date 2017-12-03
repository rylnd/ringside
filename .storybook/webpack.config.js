const path = require('path');

var genDefaultConfig = require('@storybook/react/dist/server/config/defaults/webpack.config.js');
const SRC = path.resolve(__dirname, '../src/');

module.exports = function(config, env) {
  var config = genDefaultConfig(config, env);

  config.module.rules = [
    ...config.module.rules,
    {
      test: /\.tsx?$/,
      loader: 'ts-loader',
    },
  ];
  config.resolve.extensions = [
    ...config.resolve.extensions,
    '.ts',
    '.tsx',
  ];
  config.resolve.modules = [
    ...config.resolve.modules,
    SRC,
  ];

  return config;
};
