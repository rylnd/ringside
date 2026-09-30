const path = require('path');

const SRC = path.resolve(__dirname, '../src/');

module.exports = {
  stories: ['../stories/**/*.story.@(ts|tsx)'],
  addons: ['@storybook/addon-knobs'],
  core: {
    builder: 'webpack5',
  },
  webpackFinal: config => ({
    ...config,
    module: {
      ...config.module,
      rules: [
        ...config.module.rules,
        {
          test: /\.tsx?$/,
          loader: 'ts-loader',
          options: { transpileOnly: true },
          exclude: /node_modules/,
        },
      ],
    },
    resolve: {
      ...config.resolve,
      extensions: [...config.resolve.extensions, '.ts', '.tsx'],
      modules: [...config.resolve.modules, SRC],
    },
  }),
};
