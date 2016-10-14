const nodeExternals = require('webpack-node-externals');
const mergeConfigs = require('webpack-merge');
const path = require('path');
const baseConfig = require('./config');

const srcDir = path.resolve(__dirname, '../../src');

module.exports = mergeConfigs(baseConfig, {
  target: 'node',
  externals: [nodeExternals()],
  plugins: null,
  devtool: 'source-map',
  module: {
    loaders: [{
      test: /\.jsx?$/,
      include: [srcDir],
      loader: 'babel',
    }],
  },
});
