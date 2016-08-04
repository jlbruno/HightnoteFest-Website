
var date = new Date();

exports.uglifyjs = function(gulp, plugins, config) {

  return function(){
    return gulp.src(config.srcRoot + 'static/js/common.js')
      .pipe( plugins.uglify({mangle: false, preserveComments: true}) )
      .pipe( plugins.header("/* Copyright (c) " + date.getFullYear() + ' ' + config.author + " */ \n") )
      .pipe( gulp.dest(config.distRoot + 'static/js') );

  }
}


exports.gulpfile = function(gulp, plugins, config) {

  return function(){
    return gulp.src('gulpfile.js')
      .pipe( plugins.jshint() )
      .pipe( plugins.jshint.reporter('default') );

  }
}


exports.lint = function(gulp, plugins, config) {

  return function(){
    return gulp.src(config.srcRoot + 'static/script/*.js')
      .pipe( plugins.jshint() )
      .pipe( plugins.jshint.reporter('default') );

  }
}



exports.babel = function(gulp, plugins, config) {

  return function(){
    return gulp.src(config.srcRoot + 'static/script/common.js')
      .pipe(plugins.babel())
      .pipe(gulp.dest(config.distRoot + 'static/js'));

  }
}