'use strict';

var through = require('through2');
var gutil = require('gulp-util');
var path = require('path');
var slash = require('slash');

var PluginError = gutil.PluginError;

var PLUGIN_NAME = 'gulp-filenames-to-json';

function gulpFilenamesToJson(options) {
    if (typeof options === 'undefined') {
        options = {};
    }

    if (typeof options.fileName === 'undefined') {
        options.fileName = 'files.json';
    }

    function combine(file, enc, cb) {
        var cwd = options.cwd || file.cwd;

        if (typeof(this.files) === 'undefined') {
            this.files = [];
        }

        this.files.push(slash(path.relative(cwd, file.path)));

        cb();
    }

    function flush(cb) {
        var file = new gutil.File({
            cwd: '',
            base: 'app/',
            path: path.join(options.fileName),
            contents: new Buffer(JSON.stringify(this.files))
        });

        this.push(file);
        cb();
    }

    return through.obj(combine, flush);
}

module.exports = gulpFilenamesToJson;
