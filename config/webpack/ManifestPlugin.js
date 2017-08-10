'use strict';

const path = require('path');

module.exports = class ManifestPlugin {
  constructor(options) {
    this.options = options;
  }

  apply(compiler) {
    compiler.plugin('emit', (compilation, done) => {
      this.allFilePaths = this.filePaths(compilation);
      this.javaScriptFilePaths = this.filePaths(compilation).filter(this.isJavaScriptFile);
      this.cssFilePaths = this.filePaths(compilation).filter(this.isCssFile);
      this.moveAllCompiledAssetsToPublicDirectory(compilation);
      this.addFileToCompiledAssets(compilation, this.options.manifestFileName, this.renderManifest());
      done();
    })
  }

  addFileToCompiledAssets(compilation, filename, fileContents) {
    compilation.assets[filename] = {
      source: () => fileContents,
        size: () => fileContents.length
    };
  }

  filePaths(compilation) {
    return Object.keys(compilation.assets);
  }

  isCssFile(filename) {
    return path.extname(filename) === '.css';
  }

  isJavaScriptFile(filename) {
    return path.extname(filename) === '.js';
  }

  moveAllCompiledAssetsToPublicDirectory(compilation) {
    this.filePaths(compilation).forEach(filename => {
      const newFilePath = path.join(this.options.publicDirectoryPath, filename);
      const fileContents = compilation.assets[filename];
      compilation.assets[newFilePath] = fileContents;
      delete compilation.assets[filename];
    });
  }

  renderManifest() {
    const manifest = {
      allFilePaths: this.allFilePaths,
      cssFilePaths: this.cssFilePaths,
      javaScriptFilePaths: this.javaScriptFilePaths,
      javaScriptMainMethodName: this.options.javaScriptMainMethodName,
      publicDirectoryPath: this.options.publicDirectoryPath
    }
    const replacer = null;
    const prettyPrint = 2;
    return JSON.stringify(manifest, replacer, prettyPrint);
  }
}
