#### 微信小程序 less 支持
小程序中的.wxss文件和css基本一致，主要差异在基本单位的使用上，css中的px对应到wxss是rpx。
less的好处很多，将less编译为wxss只需吧less中的px转换为rpx，将文件后缀名改为wxss即可。

* 使用webstorm
    * 添加 less watcher
    * 添加less后存在rpx单位转换的问题，想办法将px单位转换为rpx单位(出了1px)，添加另外一个watcher，用`sed`命令来进行替换
        * Program 填 sed
        * Arguments -i ".bak" -e "s/px/rpx/g" -e "s/1rpx/1px/g" $FilePath$,在vim中的正则`%s/\(\d\d\|[2-9]\)px/\1rpx/g`,sed中模仿的正则`s/\([[:digit:]][[:digit:]]\|[2-9]\)px/\1rpx/g`（没起作用）
* 使用gulp + less
```
const gulp = require("gulp")
const less = require('gulp-less');
const replace = require('gulp-just-replace');
const rename = require('gulp-rename');

gulp.task('buildLess', function () {
    return gulp.src('pages/**/*.less')
        .pipe(less()) // 编译less
        .pipe(replace(/(\d\d|[^\d][3-9])px/g,'$1rpx')) // 替换rpx
        .pipe(rename( function (path) {
                path.extname = ".wxss";
            } )) // 生成wxss文件
        .pipe(gulp.dest(function (file) {
            console.log(file.base)
            return file.base;
        })); //输出到原来less文件相同的目录下
});
gulp.task('watchLess',function () {
    gulp.watch('pages/**/*.less', gulp.series('buildLess')); //当所有less文件发生改变时，调用Less任务
})
gulp.task('less',gulp.series('buildLess','watchLess'));

```
##### 推荐使用gulp方案
编辑器的方案是通过添加两个file watcher来实现的，其中lesswatcher会自动触发，sed命令的watcher需要激活.wxss文件才会触发，使用起来不方便，使用less可以一步到位并且脱离编辑器的束缚。

