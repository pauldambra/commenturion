var gulp = require('gulp');
var browserify = require('browserify');  // Bundles JS.
var del = require('del');  // Deletes files.
var reactify = require('reactify');  // Transforms React JSX to JS.
var source = require('vinyl-source-stream');
var watchify = require('watchify');

gulp.task('clean', function(done) {
  del(['build'], done);
});
 
 function scripts(watch) {
  var bundler, rebundle;
  bundler = browserify('./react/Commenturion.jsx', {
    basedir: __dirname,
    cache: {}, // required for watchify
    packageCache: {}, // required for watchify
    fullPaths: watch // required to be true only for watchify
  });
  if(watch) {
    bundler = watchify(bundler) 
  }
 
  bundler.transform(reactify);
 
  rebundle = function() {
    var stream = bundler.bundle();
    stream = stream.pipe(source('bundle.js'));
    return stream.pipe(gulp.dest('./build'));
  };
 
  bundler.on('update', rebundle);
  return rebundle();
}
 
gulp.task('scripts', function() {
  return scripts(false);
});
 
gulp.task('watchScripts', function() {
  return scripts(true);
});