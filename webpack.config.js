const fs = require('fs');
const path = require('path');
const nodeExternals = require('webpack-node-externals');

// both configs emit into dist/, so clean it once up front
fs.rmSync(path.resolve(__dirname, 'dist'), { recursive: true, force: true });

const commonConfig = {
  entry: './src/index.ts',
  resolve: {
    extensions: ['.ts', '.js'],
    modules: [path.resolve(__dirname, 'src'), 'node_modules'],
  },
  module: {
    rules: [
      {
        enforce: 'pre',
        test: /\.ts$/,
        loader: 'tslint-loader',
        options: {
          emitErrors: true,
          failOnHint: true,
        },
        exclude: /node_modules/,
      },
      {
        test: /\.ts$/,
        loader: 'ts-loader',
        exclude: [/node_modules/],
      },
    ],
  },
};

const nodeConfig = {
  ...commonConfig,
  target: 'node',
  output: {
    library: 'ringside',
    libraryTarget: 'umd',
    filename: 'index.js',
  },
  externals: [nodeExternals()],
};

const browserConfig = {
  ...commonConfig,
  target: 'web',
  output: {
    library: 'ringside',
    libraryTarget: 'umd',
    filename: 'index.browser.js',
  },
};

module.exports = [nodeConfig, browserConfig];
