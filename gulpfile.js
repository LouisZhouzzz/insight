const gulp = require("gulp");
const del = require('del');
const gulplog = require('gulplog');
const env = process.env.NODE_ENV || 'development';
const isProduction = () => env === 'production';
const runSequence = require('run-sequence');

const gulpLoadPlugins = require('gulp-load-plugins');
const plugins = gulpLoadPlugins();

const condition = './src/ec-canvas';

// 清空 ./dist 目录
gulp.task('clean', () => del(['./dist/**']));

//gulp.task(name[, deps], fn), name指定任务名，可以diy
gulp.task('wxml', () => {
  return gulp.src(['./src/**/*.wxml'])
  //.pipe(plugins.htmlmin({
  //    collapseWhitespace: true,
  //    keepClosingSlash: true, // wxml
  //    removeComments: true,
  //    removeEmptyAttributes: true,
  //    removeScriptTypeAttributes: true,
  //    removeStyleLinkTypeAttributes: true
  //}))
    .pipe(gulp.dest('dist'));
});

gulp.task('wxs', () => {
  return gulp.src(['./src/**/*.wxs'])
    .pipe(gulp.dest('dist'));
});

gulp.task('scss', () => {
  return gulp.src('./src/**/*.scss')
    .pipe(plugins.sass())
    .pipe(plugins.if(isProduction, plugins.cssnano({compatibility: '*'})))
    .pipe(plugins.rename({
      extname: '.wxss'
    }))
    .pipe(gulp.dest('dist'));
});
// , '!./src/ec-canvas/**'
gulp.task('js', () => {
  return gulp.src(['./src/**/*.js', '!./src/ec-canvas/*.js'])
    .pipe(plugins.babel({
      presets: ['env'],
      compact: false
    }))
    .pipe(plugins.if(isProduction, plugins.uglify()))
    .on('error', function (err) {
      gulplog.error(err.toString());
    })
    .pipe(gulp.dest('dist'));
});

gulp.task('extras', () => {
  // 这里输出位置匹配要注意
  return gulp.src('./src/ec-canvas/*.js')
    .pipe(gulp.dest('dist/ec-canvas'));
});

gulp.task('json', () => {
  return gulp.src(['src/**/*.json'])
    .pipe(plugins.jsonminify())
    .pipe(gulp.dest('dist'))
});

gulp.task('img', () => {
  return gulp.src(['src/**/*.{jpg,jpeg,png,gif,svg}'])
    .pipe(plugins.imagemin())
    .pipe(gulp.dest('dist'))
});

gulp.task('build', callback => {
  return runSequence(
    'clean',
    'extras',
    ['js', 'wxml', 'wxs', 'scss', 'json', 'img'],
    callback);
});

gulp.task('watch', ['build'], () => {
  gulp.watch('src/**/*.js', ['js']);
  gulp.watch('src/**/*.wxml', ['wxml']);
  gulp.watch('src/**/*.scss', ['scss']);
  gulp.watch('src/**/*.wxs', ['wxs']);
  gulp.watch('src/**/*.json', ['json']);
  gulp.watch('src/**/*.{jpe?g,png,gif,svg}', ['img']);
});