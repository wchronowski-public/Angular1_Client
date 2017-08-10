'use strict';

const path = require('path');
const directories = require('../directories');
const DeploymentTarget = require('./DeploymentTarget');
const DevelopmentServerTarget = require('./DevelopmentServerTarget');
const SpecsTarget = require('./SpecsTarget');
const DebugProfile = require('./DebugProfile');
const ReleaseProfile = require('./ReleaseProfile');

module.exports = class WebpackConfig {
  constructor() {
    this.noEmitOnTypeError = true;
  }

  build() {
    const config = {
      entry: path.join(directories.src, 'Main.ts'),
      bail: false,
      plugins: [],
      module: {
        loaders: [
          {test: /\.ts$/, loader: 'ts-loader'},
          {test: /\.(jpe?g|png|gif|svg|ttf|eot|woff|woff2|otf|ico)(\?.*.$|$)$/i, loader: 'file-loader'},
          {test: /\.html$/, loader: 'html-loader'},
        ]
      },
      output: {},
      resolve: {
        root: directories.root,
        extensions: ['', '.ts', '.js'],
      },
      sassLoader: {
        includePaths: require('node-bourbon').includePaths.concat(require('node-neat').includePaths)
      },
      ts: {
        compilerOptions: {
          noEmitOnError: this.noEmitOnTypeError
        }
      },
      htmlLoader: {
        root: directories.root,
      },
    };

    this.profile.applyToConfig(config);
    this.target.applyToConfig(config);
    return config;
  }

  profileName() {
    return this.profile.name();
  }

  deployment() {
    this.target = new DeploymentTarget();
    return this;
  }

  developmentServer() {
    this.noEmitOnTypeError = false;
    this.target = new DevelopmentServerTarget();
    return this;
  }

  specs() {
    this.target = new SpecsTarget();
    return this;
  }

  debug() {
    this.profile = new DebugProfile();
    return this;
  }

  release() {
    this.profile = new ReleaseProfile();
    return this;
  }
}
