var gulp = require('gulp');
var eslint = require('gulp-eslint');
var webpack = require('gulp-webpack');
var del = require('del');
var browsersync = require('browser-sync');
var coveralls = require('gulp-coveralls');
var shell = require('gulp-shell');
var argv = require('yargs').argv;
var jsdoc = require('gulp-jsdoc3');
var insert = require('gulp-insert');
var version = argv.version ? argv.version : 'temp';

gulp.task('clean', function(){
    return del('dist/**/*', { force: true });
});

gulp.task('eslint', function() {
    return gulp.src('src/**/*.js')
    .pipe(eslint())
    .pipe(eslint.format())
    .pipe(eslint.failOnError());
});

gulp.task('test:single', shell.task(['./node_modules/karma/bin/karma start karma.conf.js']));

gulp.task('test', ['test:single'], function(){
    if(argv.watch){
        browsersync({
            port: 3000,
            startPath: '/test/report/lcov-report',
            server: {
                baseDir: '.'
            }
        });
        gulp.watch(['src/**/*.js', 'karma.conf.js', '!report/**/*.*'], ['test:single', browsersync.reload]);
    }
});

gulp.task('coveralls', function(){
    gulp.src('test/report/lcov.info')
    .pipe(coveralls());
});

gulp.task('webpack', function(){
    return gulp.src('src/main.js')
    .pipe(webpack({
        output: {
            filename: 'main.js',
            libraryTarget: 'umd',
            library: 'barneyjs'
        }
    }))
    .pipe(insert.append('\n\n/* barneyjs ' + version + ' */'))
    .pipe(gulp.dest('dist/'));
});

gulp.task('doc:single', function(done){
    gulp.src(['README.md', 'src/**/*.js'])
    .pipe(jsdoc({
        opts: {
            destination: 'docs/' + version,
            tags: {
                allowUnknownTags: true
            }
        }
    }, done));
});

gulp.task('doc', ['doc:single'], function(){
    if(argv.watch){
        browsersync({
            port: 4000,
            startPath: '/docs/' + version,
            server: {
                baseDir: '.'
            }
        });
        gulp.watch(['README.md', 'src/**/*.js'], ['doc:single', browsersync.reload]);
    }
});

// gulp.task('build:single', ['eslint', 'test:single', 'doc:single', 'clean', 'webpack']);
gulp.task('build:single', ['clean', 'webpack']);

gulp.task('build', ['build:single'], function(){
    if(argv.watch){
        browsersync({
            port: 5000,
            startPath: '/examples/',
            server: {}
        });
        gulp.watch(['examples/**/*.js', 'src/**/*.js'], ['build:single', browsersync.reload]);
    }
});