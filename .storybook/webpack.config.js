const path = require('path');
const webpack = require("webpack");

module.exports = {
  plugins: [
    new webpack.IgnorePlugin(/^(buffertools)$/), // unwanted "deeper" dependency
  ],
  module: {
    loaders: [
      {
        test: /\.css?$/,
        loader: 'style-loader!css-loader?modules&importLoaders=1&localIdentName=[name]__[local]___[hash:base64:5]!postcss-loader',
        include: path.resolve(__dirname, '../', 'src')
      },
      {
        test: /\.json$/,
        loader: 'json',
        include: path.resolve(__dirname, '../', 'test', 'data')
      }
    ]
  }
}
