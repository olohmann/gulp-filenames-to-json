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
	return gulp.src('./js/**/*.js')
		.pipe(filenamesToJson())
		.pipe(gulp.dest('.'));
    
    // --> 
    // creates a file "./files.json" with the following contents:
    // ["js/fileA.js","js/fileB.js"]
});
```

For a full sample see [gulp-filenames-to-json-sample](https://github.com/olohmann/gulp-filenames-to-json-sample).

## API

### filenamesToJson(options)

#### options

##### fileName

Type: `string`  
Default: `files.json`

The file name of the generated JSON document.


## License

MIT © [Oliver Lohmann](http://www.oliver-lohmann.me/)
