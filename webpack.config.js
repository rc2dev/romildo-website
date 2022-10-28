const path = require('path');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const FaviconsWebpackPlugin = require('favicons-webpack-plugin');
const CopyPlugin = require('copy-webpack-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');

module.exports = {
  devServer: {
    host: '0.0.0.0',
    port: 9000,
  },
  entry: path.resolve(__dirname, 'src/js/index.js'),
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: 'bundle.js',
    publicPath: '/',
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /node_modules\/(?!(autotrack|dom-utils))/,
        loader: 'babel-loader',
      },
      {
        test: /\.scss$/,
        use: [MiniCssExtractPlugin.loader, 'css-loader', 'sass-loader'],
      },
      {
        test: /\.(png|jpg|webp)$/,
        use: [
          {
            loader: 'file-loader',
            options: {
              name: '[name].[ext]',
              outputPath: 'assets/images/',
              publicPath: 'assets/images/',
            },
          },
        ],
      },
      {
        test: /\.(ttf|eot|svg|gif|woff|woff2)(\?v=[0-9]\.[0-9]\.[0-9])?$/,
        use: [
          {
            loader: 'file-loader',
            options: {
              name: '[name].[ext]',
              outputPath: 'assets/fonts/',
              publicPath: 'assets/fonts/',
            },
          },
        ],
      },
    ],
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: './src/index.html',
      minify: {
        removeComments: true,
        collapseWhitespace: false,
      },
    }),
    new MiniCssExtractPlugin(),
    new FaviconsWebpackPlugin({
      logo: './src/img/logo_nolabel.png',
      favicons: {
        appName: 'Romildo Corretor',
        lang: 'pt-BR',
        start_url: '/',
      },
    }),
    new CopyPlugin({
      patterns: [{ from: 'src/robots.txt', to: 'robots.txt' }],
    }),
    new CleanWebpackPlugin(),
  ],
};
