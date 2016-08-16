'use strict';

var through = require('through2');
var gutil = require('gulp-util');
var path = require('path');
var slash = require('slash');
var escapeStringRegexp = require('escape-string-regexp');

var PluginError = gutil.PluginError;

var PLUGIN_NAME = 'gulp-filenames-to-json';

function gulpFileNamesToJson(options) {
    if (typeof options !== 'object') {
        options = {};
    }

    if (typeof options.fileName === 'undefined') {
        options.fileName = 'files.json';
    }

    function combine(file, enc, cb) {
        if (typeof(this.files) === 'undefined') {
            this.files = [];
        }

        var fileName = slash(path.relative(file.cwd, file.path)),
            ignore = false;

        if (options.base) {
            fileName = fileName.replace(
                new RegExp('^' + escapeStringRegexp(options.base + '/') + '?'), ''
            );
        }

        if (options.ignore) {
            if (Array.isArray(options.ignore)) {
                options.ignore.forEach(
                    function(pattern) {
                        if (fileName.test(pattern)) {
                            ignore = true;
                        }
                    });
            } else if (options.ignore instanceof RegExp || typeof options.ignore === 'string') {
                if (fileName.test(options.ignore)) {
                    ignore = true;
                }
            }
        }

        if (ignore) {
            cb();
            return;
        }

        this.files.push(fileName);
        cb();
    }

    function flush(cb) {
        var file = new gutil.File({
                cwd: '',
                base: '',
                path: path.join(options.fileName),
                contents: new Buffer(JSON.stringify(this.files))
            });

        this.push(file);
        cb();
    }

    return through.obj(combine, flush);
}

module.exports = gulpFileNamesToJson;
