const autoprefixer = require('autoprefixer');
const Html = require('html-webpack-plugin');
const path = require('path');

const srcDir = path.resolve(__dirname, '../../src');

module.exports = {
  cache: false,
  context: path.resolve('./src'),
  entry: [
    'babel-polyfill',
    './bootstrap.jsx',
  ],
  module: {
    loaders: [{
      test: /\.(jpg|png|svg|woff|pdf)$/,
      loader: 'file',
      query: {
        name: 'assets/[hash].[ext]',
      },
    }, {
      test: /\.json$/,
      loader: 'json',
    }],
  },
  output: {
    filename: '[hash].js',
    path: path.resolve('./dist'),
  },
  plugins: [
    new Html({
      cache: false,
      minify: {
        collapseWhitespace: true,
      },
      template: './index.html',
      title: process.env.npm_package_config_title,
    }),
  ],
  postcss() {
    return [autoprefixer];
  },
  resolve: {
    alias: {
      modules: path.join(srcDir, '/modules'),
      utils: path.join(srcDir, '/utils'),
    },
    extensions: [
      '',
      '.js',
      '.jsx',
      '.json',
      '.scss',
    ],
  },
};
