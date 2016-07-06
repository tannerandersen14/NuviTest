// Using gulp to build project.
var gulp = require("gulp");
var browserify = require("browserify");
var source = require("vinyl-source-stream");
var babelify = require('babelify');

// Task to bundle all the .jsx files into one and allow them to be read by the Node backend.
gulp.task("bundle", function () {
    return browserify({
        entries: "./app/main.jsx",
        debug: true
    }).transform(babelify, {presets: ["es2015", "react"]})
        .bundle()
        .pipe(source("main.js"))
        .pipe(gulp.dest("app/dist"))
});

// Task to copy all the other files into the build folder (also runs the bundle task when called).
gulp.task("copy", ["bundle"], function () {
    return gulp.src(["app/index.html","app/lib/bootstrap-css/css/bootstrap.min.css", "app/lib/bootstrap-css/css/bootstrap.min.css.map", "app/style.css"])
        .pipe(gulp.dest("./app/dist"));
});

// Declares the default task when gulp is run, which runs the copy task (Which runs the bundle task). Logs to console upon completion.
gulp.task("default",["copy"],function(){
   console.log("Gulp completed...");
});