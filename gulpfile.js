/// <binding AfterBuild='lint' />
'use strict';

const WebpackDevServer = require('webpack-dev-server');
const KarmaConfig = require('./config/karma/KarmaConfig');
const WebpackConfig = require('./config/webpack/WebpackConfig');
const directories = require('./config/directories');
const del = require('del');
const gulp = require('gulp');
const KarmaServer = require('karma').Server;
const path = require('path');
const webpack = require('webpack');
const webpackStream = require('webpack-stream');
const tslint = require('gulp-tslint');
const sourceFiles = path.join(directories.src, '**', '*.ts*');
const specFiles = path.join(directories.spec, '**', '*.ts*');

function buildDirectory(config) {
  return (callback) => {
    const buildDirectory = path.join(directories.output, config.profileName());
    gulp.src(path.join(directories.src, 'Main.ts'))
    .pipe(webpackStream(config.build()))
    .pipe(gulp.dest(buildDirectory))
    .on('error', callback)
    .on('end', callback);
  }
};

function startWebpackDevServer(config) {
  return (callback) => {
    const apiPort = 3080;
    const serverOptions = {
      historyApiFallback: true,
      stats: {
        colors: true
      },
    };
    const webpackConfig = webpack(config.build());
    const server = new WebpackDevServer(webpackConfig, serverOptions);
    server.use(require('body-parser').json());
    require('./config/fakeApi').setup(server.app);
    server.listen(8080, '0.0.0.0', callback);
  };
};

function test(config) {
  return (callback) => new KarmaServer(config.build(), callback).start();
}

function lint() {
  return (callback) => {
    gulp.src([sourceFiles, specFiles])
      .pipe(tslint({
        formatter: 'prose'
      }))
      .pipe(tslint.report({ summarizeFailureOutput: true }))
      .on('error', callback)
      .on('end', callback);
  }
}

gulp.task('clean', () => del.sync([path.join(directories.output, '**')]));
gulp.task('lint', lint());
gulp.task('lint:watch', ['lint'], () => {
    gulp.watch([sourceFiles, specFiles], ['lint']);
});

gulp.task('build', buildDirectory(new WebpackConfig().deployment().debug()));
gulp.task('build:release', buildDirectory(new WebpackConfig().deployment().release()));

gulp.task('test:ci', test(new KarmaConfig().debug().singleRun().teamcityReporter()));
gulp.task('test:ci:release', test(new KarmaConfig().release().singleRun().teamcityReporter()));

gulp.task('server', startWebpackDevServer(new WebpackConfig().developmentServer().debug()));
gulp.task('server:release', startWebpackDevServer(new WebpackConfig().developmentServer().release()));

gulp.task('test', test(new KarmaConfig().debug().singleRun().dotsReporter()));
gulp.task('test:release', test(new KarmaConfig().release().singleRun().dotsReporter()));

gulp.task('test:watch', test(new KarmaConfig().debug().watch().dotsReporter()));
gulp.task('test:watch:release', test(new KarmaConfig().release().watch().dotsReporter()));

gulp.task('test:doc', test(new KarmaConfig().debug().singleRun().mochaReporter()));
gulp.task('test:doc:release', test(new KarmaConfig().release().singleRun().mochaReporter()));

gulp.task('test:watch:doc', test(new KarmaConfig().debug().watch().mochaReporter()));
gulp.task('test:watch:doc:release', test(new KarmaConfig().release().watch().mochaReporter()));

gulp.task('ci', ['lint', 'build:release', 'test:ci:release']);
