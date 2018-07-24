const gulp = require("gulp");
const del = require('del');
const gulplog = require('gulplog');
const env = process.env.NODE_ENV || 'development';
const isProduction = () => env === 'production';
const runSequence = require('run-sequence');

const gulpLoadPlugins = require('gulp-load-plugins');
//Loads gulp plugins from package dependencies and attaches them to plugins
const plugins = gulpLoadPlugins();

// 清空 ./dist 目录
gulp.task('clean', () => del(['./dist/**']));

//gulp.task(name[, deps], fn), name指定任务名，可以diy
gulp.task('wxml', () => {
    return gulp.src('./src/pages/**/*.wxml')
        .pipe(plugins.htmlmin({
            collapseWhitespace: true,
            removeComments: true
        }))
        .pipe(gulp.dest('dist/pages/'));
});

gulp.task('scss', () => {
    return gulp.src('./src/**/*.scss')
        .pipe(plugins.sass())
        .pipe(plugins.if(isProduction, plugins.cssnano({ compatibility: '*' })))
        .pipe(plugins.rename({
            extname: '.wxss'
        }))
        .pipe(gulp.dest('dist'));
});

gulp.task('js', () => {
    return gulp.src('./src/**/*.js')
        .pipe(plugins.babel({
            presets: ['env']
        }))
        .pipe(plugins.if(isProduction, plugins.uglify()))
        .on('error', function (err) {
            gulplog.error(err.toString());
        })
        .pipe(gulp.dest('dist'));
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
        ['js', 'wxml', 'scss', 'json', 'img'],
        callback);
});

gulp.task('watch', ['build'], () => {
    gulp.watch('src/**/*.js', ['js']);
    gulp.watch('src/**/*.wxml', ['wxml']);
    gulp.watch('src/**/*.scss', ['scss']);
    gulp.watch('src/**/*.json', ['json']);
    gulp.watch('src/**/*.{jpe?g,png,gif,svg}', ['img']);
});