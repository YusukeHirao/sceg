gulp = require 'gulp'
babel = require 'gulp-babel'
rename = require 'gulp-rename'
header = require 'gulp-header'
ts = require 'gulp-typescript'
moment = require 'moment'
runSequence = require 'run-sequence'
git = require 'git-rev-sync'

pkg = require './package.json'
banner = """/**!
  * <%= pkg.name %> - v<%= pkg.version %>
  * revision: <%= git.long() %>
  * update: <%= moment().format("YYYY-MM-DD") %>
  * Author: <%= pkg.author %> [<%= pkg.website %>]
  * Github: <%= pkg.repository.url %>
  * License: Licensed under the <%= pkg.license %> License
  */

"""

gulp.task 'ts', ->
  gulp.src('src/**/*.ts')
    .pipe ts 'tsconfig.json'
    .pipe babel()
    .pipe gulp.dest './lib/'

gulp.task 'watch', ->
  gulp.watch 'src/**/*.ts', ['ts']

gulp.task 'build', (cb) -> runSequence(
  'ts',
  cb
)

gulp.task 'default', (cb) -> runSequence(
  'build',
  cb
)
