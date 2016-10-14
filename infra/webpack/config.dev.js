const merge = require('webpack-merge');
const webpack = require('webpack');
const DashboardPlugin = require('webpack-dashboard/plugin');

const config = require('./config');


module.exports = merge(config, {
  module: {
    loaders: [{
      test: /\.jsx?$/,
      exclude: /node_modules/,
      loader: 'babel',
      query: {
        env: {
          development: {
            presets: ['react-hmre'],
          },
        },
      },
    }, {
      test: /\.scss$/,
      loaders: [
        'style',
        'css',
        'postcss',
        'sass',
      ],
    }],
  },
  output: {
    publicPath: '/',
  },
  plugins: [
    new webpack.DefinePlugin({
      'process.env.NODE_ENV': '"development"',
    }),
    new webpack.HotModuleReplacementPlugin(),
    new DashboardPlugin(),
  ],

  devtool: '#eval',
  devServer: {
    contentBase: 'build',
    historyApiFallback: true,
    hot: true,
    inline: true,
    port: Number(process.env.npm_package_config_port),
    proxy: {
      '/api/*': {
        target: `http://${process.env.npm_package_config_api_ip}`,
      },
    },
  },
});
