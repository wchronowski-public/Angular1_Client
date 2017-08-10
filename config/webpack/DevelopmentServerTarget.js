'use strict';

const path = require("path");
const directories = require("../directories");
const HtmlWebpackPlugin = require('html-webpack-plugin')

module.exports = class DevelopmentServerTarget {
  applyToConfig(config) {
    const htmlWebpackPlugin = new HtmlWebpackPlugin({
      template: path.join(directories.config, 'index.ejs'),
      inject: 'head'
    });
    config.plugins.push(htmlWebpackPlugin);
    config.output.path = directories.output;
  }
}
