import gulp from "gulp";
import del from "del";
import browserSync from "browser-sync";
import sourcemaps from "gulp-sourcemaps";

import uglify from "gulp-uglify";
import webpack from "webpack-stream";

/**
 * @source https://stackoverflow.com/questions/40096470/get-webpack-not-to-bundle-files
 * Чтобы добавить новый выходной файл — пропиши его сюда
 * - [ ] Вынести в отдельный конфиг jsEntryPoints
 */
const jsEntryPoints = {
  index: "/src/js/index.js",
  // product: "/src/js/product.js",
  // new: "/src/js/new.js"
}

export default function jsBuild() {
  del("./dist/js/**/*.js");
  return gulp
    .src(app.path.src.js, { sourcemaps: app.isDev })
    .pipe(
      webpack({
        mode: app.isDev ? "development" : "production",
        entry: jsEntryPoints,
        output: {
          filename: "[name].min.js",
          sourceMapFilename: './[name].js.map'
        },
      })
    )
    .pipe(sourcemaps.init())
    .pipe(uglify())
    .pipe(sourcemaps.write("../maps"))
    .pipe(gulp.dest(app.path.build.js))
    .pipe(browserSync.reload({ stream: true }));
}
