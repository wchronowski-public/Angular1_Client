'use strict';

const path = require('path');
const directories = require('../directories');
const WebpackConfig = require('../webpack/WebpackConfig');

module.exports = class KarmaConfig {
  constructor() {
    this.reporters = [];
  }

  build() {
    this.webpack.noEmitOnTypeError = this.singleRun;

    return {
      singleRun: this.singleRun,
      basePath: directories.root,
      browsers: ['PhantomJS'],
      files: ['spec/Main.ts'],
      frameworks: ['mocha'],
      port: 9876,
      preprocessors: { 'spec/Main.ts': ['webpack', 'sourcemap'] },
      reporters: this.reporters,
      mochaReporter: { showDiff: true },
      webpackMiddleware: { noInfo: true },
      webpack: this.webpack.build(),
    };
  }

  singleRun() {
    this.singleRun = true;
    return this;
  }

  watch() {
    this.singleRun = false;
    return this;
  }

  debug() {
    this.webpack = new WebpackConfig().specs().debug();
    return this;
  }

  release() {
    this.webpack = new WebpackConfig().specs().release();
    return this;
  }

  mochaReporter() {
    this.reporters.push('mocha');
    return this;
  }

  dotsReporter() {
    this.reporters.push('dots');
    return this;
  }

  teamcityReporter() {
    this.reporters.push('teamcity');
    return this;
  }
}
