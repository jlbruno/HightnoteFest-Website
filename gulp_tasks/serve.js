
exports.serve = function(gulp, plugins, config) {

  return function(){
    plugins.browserSync.init( config.browserSync );


    gulp.watch(config.srcRoot + 'static/sass/**/*.scss', ['css:build']);
    gulp.watch(config.distRoot + '**/*.html').on('change', plugins.browserSync.reload);
    gulp.watch(config.srcRoot + 'static/script/**/*.js', function(event) {
      gulp.src(event.path)
        .pipe( gulp.dest(config.distRoot + 'static/js') )
        .pipe(plugins.browserSync.stream());
    });


  }
}
