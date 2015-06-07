# gulp-filenames-to-json [![Build Status](https://travis-ci.org/olohmann/gulp-filenames-to-json.svg?branch=master)](https://travis-ci.org/olohmann/gulp-files-to-json)

> Simple gulp plugin that creates a JSON file containing the relative filenames of all piped files as an array.


## Install

```
$ npm install --save-dev gulp-filenames-to-json
```


## Usage

```js
var gulp = require('gulp');
var filenamesToJson = require('gulp-filenames-to-json');

gulp.task('default', function () {
	return gulp.src('src/file.ext')
		.pipe(filenamesToJson())
		.pipe(gulp.dest('.'));
});
```


## API

### filenamesToJson(options)

#### options

##### fileName

Type: `string`  
Default: `files.json`

The file name of the generated JSON document.


## License

MIT © [Oliver Lohmann](http://www.oliver-lohmann.me/)
