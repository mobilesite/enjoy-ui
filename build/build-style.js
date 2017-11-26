const gulp = require('gulp');
const cleanCSS = require('gulp-clean-css');
const less = require('gulp-less');
const rename = require('gulp-rename');
const autoprefixer = require('gulp-autoprefixer');
const replace = require('gulp-replace');

// 编译less
gulp.task('css', function () {
    gulp.src('../src/styles/lib.less')
        .pipe(less())
        .pipe(replace('../assets', '..'))
        .pipe(autoprefixer({
            browsers: ['last 2 versions', 'ie > 8']
        }))
        .pipe(cleanCSS())
        .pipe(rename('enjoyUI.css'))
        .pipe(gulp.dest('../dist/styles/'));
});

// 拷贝字体文件
gulp.task('fonts', function () {
    gulp.src('../src/styles/iconfont/*.*')
        .pipe(gulp.dest('../dist/styles/iconfont'));
});

gulp.task('default', ['css', 'fonts']);