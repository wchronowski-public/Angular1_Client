'use strict';

const webpack = require('webpack');
const ExtractTextPlugin = require("extract-text-webpack-plugin");

module.exports = class ReleaseProfile {
  name() { return 'release'; }

  applyToConfig(config) {
    config.devtool = 'source-map';
    config.debug = true;
    config.module.loaders.find(loader => loader.loader === 'file-loader').query = {name: "[name]-[hash].[ext]"};
    config.output.filename = 'application-[hash].js';
    config.plugins.push(new webpack.optimize.DedupePlugin());
    config.plugins.push(new webpack.optimize.OccurrenceOrderPlugin(true));
    config.plugins.push(new webpack.optimize.UglifyJsPlugin({minimize: true, compress: {warnings: false}}));
    config.plugins.push(new ExtractTextPlugin("application-[contenthash].css"));
    config.module.loaders.push({
      test: /\.scss$/,
      loader: ExtractTextPlugin.extract('style-loader', 'css-loader!sass-loader')
    });
  }
}
