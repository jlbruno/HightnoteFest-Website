
exports.build = function(gulp, plugins, config) {

  var postCssProcessors = [];
  if (config.postcss.processors) {
    postCssProcessors = config.postcss.processors.map(function(p) {
      return plugins[p.name].call(plugins, p.config);
    });
  }

  return function(){
    return gulp.src(config.srcRoot + 'static/sass/*.scss')
      .pipe( (process.env.NODE_ENV !== "production") ? plugins.sourcemaps.init() : plugins.util.noop() )
      .pipe(plugins.sass({
        outputStyle: (process.env.NODE_ENV === "production") ? "compressed" : "nested"
      }).on('error', plugins.sass.logError))
      .pipe( plugins.postcss(postCssProcessors) )
      .pipe( (process.env.NODE_ENV !== "production") ? plugins.sourcemaps.write('.') : plugins.util.noop() )
      .pipe(gulp.dest(config.distRoot + 'static/css'))
      .pipe(plugins.browserSync.stream());

  }
}



exports.sass = function(gulp, plugins, config) {

  return function(){
    return gulp.src(config.srcRoot + 'static/sass/*.scss')
      .pipe(sourcemaps.init())
      .pipe(sass({
        outputStyle: (process.env.NODE_ENV === "production") ? "compressed" : "nested",
        sourceMap: true
      }).on('error', sass.logError))
      .pipe(sourcemaps.write('.'))
      .pipe(gulp.dest(config.distRoot + 'static/css'));

  }
}

exports.postcss = function(gulp, plugins, config) {
  var postCssProcessors = [];
  if (config.postcss.processors) {
    postCssProcessors = config.postcss.processors.map(function(p) {
      return plugins[p.name].call(plugins, p.config);
    });
  }

  return function(){
    return gulp.src(config.srcRoot + 'static/css/*.css')
      //.pipe( sourcemaps.init() )
      .pipe( plugins.postcss(config.postcss.processors) )
      //.pipe( sourcemaps.write('.') )
      .pipe( gulp.dest(config.distRoot + 'static/css') );

  }
}


exports.watch = function(gulp, plugins, config) {

  return function(){
    gulp.watch(config.srcRoot + 'static/sass/**/*.scss', ['css:build']);
  }
}
