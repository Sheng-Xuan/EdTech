const gulp = require('gulp');
const ts = require('gulp-typescript');
const JSON_FILES = ['src/*.json', 'src/**/*.json'];
let exec = require('child_process').exec;

// pull in the project TypeScript config
const tsProject = ts.createProject('tsconfig.json');
const PATHS = {
  scripts: ['./src/**/*.ts'],
  output: './dest'
};
let child;

gulp.task('restart', function() {
  child = exec(
    'supervisor -w build ./dest/index.js',
    (error, stdout, stderr) => {
      console.log(`stdout: ${stdout}`);
      console.log(`stderr: ${stderr}`);
      if (error !== null) {
        console.log(`exec error: ${error}`);
      }
    }
  );
});

gulp.task('build', gulp.series(['restart']), function() {
  return gulp
    .src(PATHS.scripts)
    .pipe(tsProject())
    .pipe(gulp.dest(PATHS.output));
});

gulp.task('watch', gulp.series(['build']), function() {
  gulp.watch(PATHS.scripts, ['build']);
});

gulp.task('assets', function() {
  return gulp.src(JSON_FILES).pipe(gulp.dest('dist'));
});

gulp.task('dev', gulp.series('build', 'assets', 'restart', 'watch'));
