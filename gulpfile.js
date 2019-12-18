// gulp主文件，用于注册任务
// 严格模式
'use strict';

  // 此处代码都是由node执行
  // 需要载入gulp模块
  var gulp=require('gulp');


  // 注册一个任务
  // gulp.task('say',function(){
  // 	console.log('hello world');
  // });
  var less=require('gulp-less');
var cssUglify = require('gulp-minify-css');

// 1、gulp也是轻内核的，对于转换less需要插件
// npm install --save-dev gulp-less
// npm install gulp-minify-css --save-dev 压缩css
gulp.task('style',function(){
	gulp.src('src/style/*.less')
	.pipe(less())//转成css
	.pipe(cssUglify())//压缩css
	.pipe(gulp.dest('dist/css'))
});

// 2、js先合并npm install --save-dev gulp-concat
//再js压缩混淆
var concat = require('gulp-concat');
var uglify = require('gulp-uglify');

gulp.task('scripts', function() {
  return gulp.src('src/js/*.js')
    .pipe(concat('all.js'))//all.js会自动在dist/js中创建，存放所有合并的js
    .pipe(uglify())//压缩混淆js
    .pipe(gulp.dest('dist/js'));
});

// 3、图片的处理
gulp.task('image',function(){
	gulp.src('src/image/*.*')
	.pipe(gulp.dest('dist/image'))
})



//将js代码自动插入HTML文件中
// $ npm install gulp-browsersync-inject --save-dev
// Example
// var browserSyncInject = require('gulp-browsersync-inject');//引包
 
// gulp.task('serve', function(){
//   gulp.src('src/index.html')
//   .pipe(browserSyncInject({port: 5000})) // BrowserSync will output the proxy port
//   .pipe(gulp.dest('dist/'));
  
// });

// 4、html复制压缩
// 通过命令行输入：gulp copy执行，则在dist里面就复制好了
//压缩HTML也是需要插件npm install --save-dev gulp-htmlnano
var htmlnano = require('gulp-htmlnano');

gulp.task('html',function(){
	// src创建一个流，用于从文件系统读取 Vinyl 对象
	gulp.src('src/index.html')
	.pipe(htmlnano())
	.pipe(gulp.dest('dist/'));//pipe管道，将此处需要的操作传递出去,dest输出一个流
});




//5，测试的时候 Install，浏览器上，统一文件多个窗口进行同步操作
// npm install browser-sync --save-dev
 var browserSync=require('browser-sync').create();//此时你是有用的
 // 运行gulp serve，然后就出自动打开浏览器http://localhost:3000
gulp.task('serve', function() {
    browserSync.init({
        server: {
            baseDir: "./dist/"//运行时直接在浏览器打开dist目录
        }
    });
    // watch监听 globs 并在发生更改时运行任务
    gulp.watch('src/*.html',gulp.series('html'));//启动时自动监视
	gulp.watch('src/style/*.less',gulp.series('style'));
	gulp.watch('src/js/*.js',gulp.series('scripts'));
	gulp.watch('src/image/*.*',gulp.series('image'));
});

