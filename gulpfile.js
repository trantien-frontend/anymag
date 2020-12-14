const { src, dest, watch, series, parallel } = require("gulp");
const sass = require("gulp-sass");
const cssNano = require("gulp-cssnano");
const image = require("gulp-imagemin");
const uglify = require("gulp-uglify");
const gulpBabel = require("gulp-babel");
const browserSync = require("browser-sync").create();
const del = require("del");
const sourcemaps = require("gulp-sourcemaps");
const autoprefixer = require("gulp-autoprefixer");
const useref = require("gulp-useref");
const gulpif = require("gulp-if");
const cache = require('gulp-cache');
const pug = require('gulp-pug');
//
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
    src:"./assets/pug/*.pug",
    dest: "./assets/"
  },
  vendor: {
    src: [
      './assets/vendor/jquery/jquery-3.5.1.js',
    ],
    dest: [
      "dist/vendor/jquery",
    ]
  },
  output: "dist",
};

function clean() {
  return del([path.output]);
}
function vendor() {
  for(var i = 0 ; i < path.vendor.src.length; i ++){
    src(path.vendor.src[i])
      .pipe(dest(path.vendor.dest[i]));
      return src(path.vendor.src);
  }
}
function browserSyncInit() {
  console.log("browserSyncInit");
  return browserSync.init({
    server: {
      port: 8080,
      baseDir: "./assets/",
      index: "home.html",
    },
  });
}
function pugTask () {
  return src(path.pug.src)
  .pipe(pug({
    doctype: 'html',
    pretty: true
  }))
  .pipe(browserSync.stream())
  .pipe(dest("./assets/"))
}
function sassTask() {
  return src(path.scssTask.src).pipe(sass())
  .pipe(browserSync.stream())
  .pipe(dest("./assets/css"))
}
function dev() {
  // clean();
  // series(sassTask, parallel(browserSyncInit, userefTask))();
  browserSyncInit();
  watch(path.scssTask.src, series(sassTask, userefTask)).on('change',browserSync.reload);
  watch(path.jsTask.src, userefTask).on('change',browserSync.reload);
  watch(path.pug.src,series(pugTask));
  watch('./assets/*html').on('change',browserSync.reload);

  // watch("./assets/images",imageTask).on('change',browserSync.reload);
}
// image watch
function  imageTask(){
  return src("./assets/images/**/*.+(png|jpg|gif|svg)")
    .pipe(
      image({
        optimizationLevel: 5,
        progressive: true,
        interlaced: true,
      })
      .pipe(cache(imagemin({
        interlaced: true
      })))
    )
    .pipe(dest("dist/images"));
}
// image watch
function userefTask() {
  return src("./*.html")
    .pipe(useref())
    .pipe(
      browserSync.reload({
        stream: true,
      })
    );
}
function minfyJsAndCss() {
  return src("./assets/*.html")
  .pipe(sourcemaps.init())
    .pipe(useref())
    .pipe(
      gulpif(
        "*.js",
        gulpBabel({
          presets: ["@babel/env"],
        })
      )
    )
    .pipe(gulpif("*.js", uglify()))
    .pipe(gulpif("*.css", cssNano()))
    .pipe(sourcemaps.write())
    .pipe(dest(path.output));
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

const pro = series(clean, sassTask, parallel(minfyJsAndCss, minfyImages));
exports.clean = clean;
exports.dev = dev;
exports.pro = pro;
exports.vendor = vendor; 
exports.pugTask = pugTask;


