var del = require('del'),
    exec = require('child_process').exec,
    gulp = require('gulp'),
    livereload = require('gulp-livereload'),
    taskListing = require('gulp-task-listing');

// delete _site directory
gulp.task('clean', function(cb) {
  del(['_site'], cb);
});

// build Jekyll
gulp.task('build', function() {
  exec('bundle exec jekyll build', function(error, stdout, stderr) {
    console.log(stdout);
    console.log(stderr);
    if (error) console.log(error);
  });
});

// build Jekyll and serve _site directory
gulp.task('serve', function() {
  exec('bundle exec jekyll serve --watch', function(error, stdout, stderr) {
    console.log(stdout);
    console.log(stderr);
    if (error) console.log(error);
  });
});

// serve Jekyll and livereload on change
gulp.task('watch', ['serve'], function() {
  livereload.listen();
  gulp.watch('_site/**/*')
    .on('change', livereload.changed);
});

// list gulp tasks
gulp.task('default', taskListing);
