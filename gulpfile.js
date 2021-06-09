const { src, dest, watch, series, parallel } = require("gulp");
const scss = require("gulp-sass");
const uglify = require("gulp-uglify");
const browserSync = require("browser-sync").create();
const autoprefixer = require("gulp-autoprefixer");
const useref = require("gulp-useref");
const cssnano = require("gulp-cssnano");
const del = require("del");
const gulpIf = require("gulp-if");
const pug = require("gulp-pug");
const image = require("gulp-imagemin");

const path = {
  images: {
    src: "./assets/images/**/*.+(png|jpg|gif|svg)",
    dest: "dist/images",
  },
  scssTask: {
    src: "./assets/scss/**/*.scss",
    dest: "./assets/css",
  },
  cssTask: {
    src: "./assets/css/**/*.css",
    dest: "dist/css",
  },
  jsTask: {
    src: "./assets/js/**/*.js",
    dest: "dist/js",
  },
  pug: {
    src: "./assets/pug/*.pug",
    dest: "./assets/",
  },
  output: "dist",
};

function clean() {
  return del([path.output]);
}
function pugTask() {
  return src(path.pug.src)
    .pipe(
      pug({
        doctype: "html",
        pretty: true,
      })
    )
    .pipe(browserSync.stream())
    .pipe(dest("./assets/"));
}
function scssTask() {
  return src(path.scssTask.src)
    .pipe(scss())
    .pipe(
      autoprefixer({
        browsers: ["last 3 versions", "iOS >= 8", "Safari >= 8", "ie 11"],
      })
    )
    .pipe(browserSync.stream())
    .pipe(dest("./assets/css"));
}

function browserSyncInit() {
  console.log("browserSyncInit");
  return browserSync.init({
    server: {
      baseDir: "./assets/",
      index: "index.html",
    },
  });
}
function userefTask() {
  return src("./*.html")
    .pipe(useref())
    .pipe(
      browserSync.reload({
        stream: true,
      })
    );
}
function minfyImages() {
  return src(path.images.src)
    .pipe(
      image({
        optimizationLevel: 5,
        progressive: true,
        interlaced: true,
      })
    )
    .pipe(dest(path.images.dest))
    .pipe(
      browserSync.reload({
        stream: true,
      })
    );
}
function minfyJsAndCss() {
  return src("./assets/*.html")
    .pipe(useref())
    .pipe(gulpIf("*.css", cssnano()))
    .pipe(gulpIf("*.js", uglify()))
    .pipe(dest(path.output));
}
function dev() {
  browserSyncInit();
  watch(path.scssTask.src, series(scssTask, userefTask)).on(
    "change",
    browserSync.reload
  );
  watch(path.pug.src, series(pugTask));
  watch(path.jsTask.src, userefTask).on("change", browserSync.reload);
  watch("./assets/*html").on("change", browserSync.reload);
}
const pro = series(clean, scssTask, parallel(minfyJsAndCss, minfyImages));

exports.dev = dev;
exports.pro = pro;
