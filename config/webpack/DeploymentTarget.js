'use strict';

const ManifestPlugin = require('./ManifestPlugin');

module.exports = class DeploymentTarget {
  applyToConfig(config) {
    const manifestPlugin = new ManifestPlugin({
      javaScriptMainMethodName: 'window.start',
      manifestFileName: 'manifest.json',
      publicDirectoryPath: 'public'
    });
    config.plugins.push(manifestPlugin);
  }
}
