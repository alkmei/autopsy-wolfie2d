var gulp = require("gulp");
var browserify = require("browserify");
var source = require("vinyl-source-stream");
var watchify = require("watchify");
var tsify = require("tsify");
var fancy_log = require("fancy-log");
const { exit } = require("process");
var paths = {
  pages: ["src/*.html"],
};

var b = browserify({
  basedir: ".",
  debug: true,
  entries: ["src/main.ts"],
  cache: {},
  packageCache: {},
});

b.plugin(tsify);

var watchedBrowserify = watchify(b);

gulp.task("copy-html", function () {
  return gulp.src(paths.pages).pipe(gulp.dest("dist"));
});

function prodBundle() {
  return b.bundle().pipe(source("bundle.js")).pipe(gulp.dest("dist"));
}

function bundle() {
  return watchedBrowserify
    .bundle()
    .on("error", fancy_log)
    .pipe(source("bundle.js"))
    .pipe(gulp.dest("dist"));
}

gulp.task("default", gulp.series(gulp.parallel("copy-html"), bundle));
gulp.task(
  "build",
  gulp.series(gulp.parallel("copy-html"), prodBundle, done => {
    done();
    exit(0);
  }),
);

watchedBrowserify.on("update", bundle);
watchedBrowserify.on("log", fancy_log);
