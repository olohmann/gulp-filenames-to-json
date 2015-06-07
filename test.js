'use strict';
var assert = require('assert');
var gutil = require('gulp-util');
var filenamesToJson = require('./');

it('should create a JSON file with an array of all piped files', function (cb) {
	var stream = filenamesToJson();

	stream.on('data', function (file) {
        assert(file.path === 'files.json', 'expected the default file name to be "files.json"');

        var fileArray = JSON.parse(file.contents.toString());

        assert(fileArray.length === 2);
        assert(fileArray[0] === 'file1.js');
        assert(fileArray[1] === 'foo/file2.js');
	});

	stream.on('end', cb);

	stream.write(new gutil.File({
		base: __dirname,
		path: __dirname + '/file1.js',
		contents: new Buffer('')
	}));

    stream.write(new gutil.File({
        base: __dirname,
        path: __dirname + '/foo/file2.js',
        contents: new Buffer('')
    }));

	stream.end();
});
