'use strict';

var project = require("./package.json");
var config = require("./config.json");

const gulp = require('gulp');

const plugins = require('gulp-load-plugins')();

// These are non-gulp plugins used in tasks, so well add them to the plugin object created by gulp-load-plugins
plugins.browserSync = require("browser-sync");
plugins.autoprefixer = require('autoprefixer');

plugins.util.log("node environment: " + process.env.NODE_ENV);
plugins.util.log("flag: " + plugins.util.env.mode);

// set environment if NODE_ENV is set or not
// use "development" or "production"
// set NODE_ENV=development
process.env.NODE_ENV = process.env.NODE_ENV || 'development';
// override NODE_ENV if a flag was passed
// call like:
// gulp css:build --mode development
// undocumented feature :)
if (plugins.util.env.mode) {
  process.env.NODE_ENV = plugins.util.env.mode;
}


plugins.util.log("Using node environment: " + process.env.NODE_ENV);

function getTask(file, task) {
  var temp = require('./gulp_tasks/' + file);
  return temp[task](gulp, plugins, config);
}


// full CSS build task
// compiles Sass and runs through PostCSS
gulp.task('css:build', getTask('css', 'build'));
// watches css and runs the build task...useful if you aren't running serve
gulp.task('css:watch', getTask('css', 'watch'));


// JavaScript tasks
gulp.task('lint', getTask('script','lint'));

gulp.task('gulpfile', getTask('script','gulpfile'));

gulp.task('uglifyjs', getTask('script','uglifyjs'));



// Local dev server
gulp.task('serve', ['css:build'], getTask('serve','serve'));


// create a build
gulp.task('default', ['gulpfile', 'lint', 'css:build']);
