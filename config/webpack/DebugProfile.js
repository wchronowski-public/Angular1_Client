'use strict';

module.exports = class DebugProfile {
  name() { return 'debug'; }

  applyToConfig(config) {
    config.devtool = 'inline-source-map';
    config.debug = true;
    config.module.loaders.find(loader => loader.loader === 'file-loader').query = {name: "[name].[ext]"};
    config.output.filename = 'application.js';
    config.module.loaders.push({
      test: /\.scss$/,
      loaders: ['style-loader', 'css-loader', 'sass-loader']
    });
  }
}
