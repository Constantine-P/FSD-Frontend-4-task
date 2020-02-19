/* eslint-disable */
const path = require('path');
const HTMLPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const webpack = require('webpack');
const FileManagerPlugin = require('filemanager-webpack-plugin');
const merge = require('webpack-merge');
const FaviconsWebpackPlugin = require('favicons-webpack-plugin');

const common = {
  module: {
    rules: [
      {
        test: /\.tsx?$/,
        use: 'ts-loader',
        exclude: /node_modules/,
      },
      {
        test: /\.styl$/,
        use: [
          MiniCssExtractPlugin.loader,
          'css-loader',
          'stylus-loader',
        ],
      },
      {
        test: /\.(jpg|png|svg)$/,
        loader: 'file-loader',
        options: {
          name: '[name].[ext]',
          outputPath: 'assets/',
        },
      },
    ],
  },
  resolve: {
    extensions: ['.tsx', '.ts', '.js'],
  },
  plugins: [
    new MiniCssExtractPlugin({
      filename: '[name]-styles.css',
      chunkFilename: '[id].css',
    }),
    new HTMLPlugin({
      filename: 'index.html',
      chunks: ['demo'],
      template: path.join(__dirname, 'src', 'demo-page', 'index.html'),
    }),
    new webpack.ProvidePlugin({
      $: 'jquery',
      jQuery: 'jquery',
    }),
    new FaviconsWebpackPlugin({
      logo: path.join(__dirname, 'src/app/styles/logo.png'),
      mode: 'webapp',
      devMode: 'webapp',
      favicons: {
        appName: 'slider-demo-page',
        appDescription: 'slider demo page',
        developerName: 'Constantin P.',
        developerURL: null,
        background: '#ddd',
        theme_color: '#333',
        icons: {
          coast: false,
          yandex: false
        }
      }
    })
  ],
};

const development = {
  devtool: 'eval',
  entry: {
    demo: path.join(__dirname, 'src', 'demo-page', 'index.ts'),
  },
  output: {
    filename: '[name].js',
    path: path.join(__dirname, 'dist'),
  }
};

const production = {
  entry: {
    demo: path.join(__dirname, 'src', 'demo-page', 'index.ts'),
    app: path.join(__dirname, 'src', 'app', 'Slider.ts'),
    appJQ: path.join(__dirname, 'src', 'app', 'SliderJQ.ts'),
  },
  output: {
    filename: '[name].js',
    path: path.join(__dirname, 'dist'),
  },
  plugins: [
    new FileManagerPlugin({
      onEnd: {
        mkdir: [
          'dist/app/',
          'dist/appJQ/',
          'dist/demo/',
        ],
        copy: [
          {source: 'dist/assets/', destination: 'dist/app/assets/'},
          {source: 'dist/assets/', destination: 'dist/appJQ/assets/'},
        ],
        move: [
          {source: 'dist/demo.js', destination: 'dist/demo/demo.js'},
          {source: 'dist/demo.css', destination: 'dist/demo/demo.css'},
          {source: 'dist/index.html', destination: 'dist/demo/index.html'},
          {source: 'dist/assets/', destination: 'dist/demo/assets/'},
          {source: 'dist/app.js', destination: 'dist/app/app.js'},
          {source: 'dist/app.css', destination: 'dist/app/app.css'},
          {source: 'dist/appJQ.js', destination: 'dist/appJQ/appJQ.js'},
          {source: 'dist/appJQ.css', destination: 'dist/appJQ/appJQ.css'},
        ]
      }
    })
  ],
};

module.exports = function (env) {
  if (env === 'production') {
    return merge([
      common,
      production
    ]);
  }
  if (env === 'development') {
    return merge([
      common,
      development
    ])
  }
};
