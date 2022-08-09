const path                      = require('path')
const htmlWebpackPlugin         = require('html-webpack-plugin')
const ReactRefreshWebpackPlugin = require('@pmmmwh/react-refresh-webpack-plugin')
const MiniCssExtractPlugin      = require('mini-css-extract-plugin')

module.exports = {
  mode: 'development',
  entry: path.resolve(__dirname, './src/index.tsx'),
  resolve: {
    extensions:['.tsx', '.ts', '.js']},
  output: {
    path: path.resolve(__dirname, './build'),
    filename: 'bundle.js'
  },
  module: {
    rules: [
      {
        test: /\.(js|ts)x?$/,
        exclude: /node_modules/,
        use: [
          {
            loader: 'babel-loader'
          }
        ]
      },
      {
        test: /\.scss$/,
        use: [MiniCssExtractPlugin.loader,'css-loader', 'sass-loader']
      }
    ]
  },
  plugins: [
    new htmlWebpackPlugin({
      template: path.resolve(__dirname, './public/index.html')
    }),
    new ReactRefreshWebpackPlugin(),
    new MiniCssExtractPlugin()
  ],
  devServer: {
    hot: true,
  }
}
