const Extract = require('extract-text-webpack-plugin');
const merge = require('webpack-merge');
const webpack = require('webpack');

const config = require('./config');
const packageName = require('../../package.json').name;

module.exports = merge(config, {
  module: {
    loaders: [{
      test: /\.jsx?$/,
      exclude: /node_modules/,
      loader: 'babel',
    }, {
      test: /\.scss$/,
      loader: Extract.extract([
        'css',
        'postcss',
        'sass',
      ]),
    }],
  },
  output: {
    publicPath: `/${packageName}/`,
  },
  plugins: [
    new Extract('[hash].css'),
    new webpack.DefinePlugin({
      'process.env.NODE_ENV': '"production"',
    }),
    new webpack.optimize.DedupePlugin(),
    new webpack.optimize.UglifyJsPlugin(),
  ],
});
