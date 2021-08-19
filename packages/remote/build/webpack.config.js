/* eslint-disable @typescript-eslint/no-var-requires */

const path = require('path');
const webpack = require('webpack');
const dependencies = require('../package.json').dependencies;
const HtmlWebpackPlugin = require('html-webpack-plugin');

const { ModuleFederationPlugin } = require('webpack').container;
const { VueLoaderPlugin } = require('vue-loader');
const { NodeAsyncHttpRuntime } = require('@telenko/node-mf');

const getConfig = ({ target }) => ({
  entry: './src/app.js',
  target: target === 'web' ? 'web' : false,
  mode: 'development',
  devtool: 'hidden-source-map',
  output: {
    path: path.resolve(__dirname, '../dist', target),
    publicPath: `http://localhost:3001/${target}/`,
    clean: true
  },
  devServer: {
    port: '3001',
    compress: true
  },
  resolve: {
    alias: {
      '@': path.resolve(__dirname, '../src'),
      vue: '@vue/runtime-dom'
    },
    extensions: [
      '.mjs',
      '.js',
      '.jsx',
      '.vue'
    ]
  },
  module: {
    noParse: /es6-promise\.js$/, // avoid webpack shimming
    rules: [
      {
        test: /bootstrap\.js$/,
        loader: 'bundle-loader',
        options: {
          lazy: true
        }
      },
      {
        test: /\.vue$/,
        use: [
          { loader: 'vue-loader' }
        ]
      },
      {
        test: /\.(sa|sc|c)ss$/,
        use: [
          'css-loader'
        ]
      }
    ]
  },
  plugins: [
    new VueLoaderPlugin(),
    new ModuleFederationPlugin({
      name: 'remote',
      filename: 'remoteEntry.js',
      exposes: {
        './RemoteComponent': './src/RemoteComponent.vue'
      },
      shared: {
        vue: {
          requiredVersion: dependencies.vue,
          singleton: true
        }
      }
    }),
    ...(target === 'web'
      ? [
        new HtmlWebpackPlugin({
          template: './public/index.html'
        })
      ]
      : [new NodeAsyncHttpRuntime()]),
    new webpack.DefinePlugin({
      __VUE_OPTIONS_API__: false,
      __VUE_PROD_DEVTOOLS__: false
    })
  ]
});

module.exports = [
  getConfig({ target: 'web' }),
  getConfig({ target: 'node' })
];
