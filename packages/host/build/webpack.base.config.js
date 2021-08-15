const webpack = require('webpack');
const path = require('path');
const { VueLoaderPlugin } = require('vue-loader');
const HtmlWebpackPlugin = require("html-webpack-plugin");

module.exports = {
  mode: 'development',
  output: {
    path: path.resolve(__dirname, '../dist'),
    publicPath: "auto",
    filename: 'js/[name].js'
  },
  resolve: {
    alias: {
      '@': path.resolve(__dirname, '../src'),
      vue: "@vue/runtime-dom",
    },
    extensions: [
      '.mjs',
      '.js',
      '.jsx',
      '.vue',
    ],
  },
  module: {
    noParse: /es6-promise\.js$/, // avoid webpack shimming
    rules: [
      {
        test: /\.m?js$/,
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader',
          options: {
            envName: 'dev',
            filename: ''
          }
        }
      },
      {
        test: /\.vue$/,
        use: {
          loader: 'vue-loader',
          options: {
            extractCSS: true
          }
        }
      },
      {
        test: /\.css$/,
        use: [
          { loader: 'css-loader' }
        ]
      },
    ]
  },
  plugins: [
    new VueLoaderPlugin()
  ],
};
