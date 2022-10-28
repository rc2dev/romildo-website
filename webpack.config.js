const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const FaviconsWebpackPlugin = require('favicons-webpack-plugin');
const CopyPlugin = require('copy-webpack-plugin');

module.exports = {
  devServer: {
    host: '0.0.0.0',
    port: 9000,
  },
  entry: path.resolve(__dirname, 'src/index.js'),
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: 'bundle[contenthash].js',
    publicPath: '/',
    clean: true,
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader',
          options: {
            presets: ['@babel/preset-env'],
          }
        },
      },
      {
        test: /\.scss$/,
        use: [
          'style-loader',
          'css-loader',
          'sass-loader'
        ],
      },
      {
        test: /\.(png|jpg|webp)$/,
        type: 'asset/resource',
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
      template: './src/template.html',
      minify: {
        removeComments: true,
        collapseWhitespace: false,
      },
    }),
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
  ],
};
