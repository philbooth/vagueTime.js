# vagueTime.js

A small javascript library for formatting time differences as a vague
time, e.g. 'just now' or '3 months ago'.

[![Build status][ci-image]][ci-status]

## Installation

`npm install vague-time`

## Usage

`var vagueTime = require('vague-time');`

To call the library in a browser environment, use [OneJS],
[Browserify] or [Ender].

vagueTime.js exports a single public function, `get`, which returns
a vague time string, such as 'just now' or '3 months ago', based on
the argument(s) that you pass it.

The arguments are passed as properties on a single options object.
The property `from` is a timestamp denoting the point in time that
you would like to convert to a vague time. The optional property
`until` is a timestamp denoting the reference point from which you
want to calculate the vague time difference, or it defaults to
`Date.now()` if undefined. The optional property `units` is a
string denoting the units that the `from` and `until` timestamps
are specified in, either 's' for seconds or 'ms' for milliseconds.

### Examples

```
vagueTime.get('1171452690', '1234567890'); // returns '2 years ago'
vagueTime.get('1231938091', '1234567890'); // returns '4 weeks ago'
vagueTime.get('1234567890', '1234567890'); // returns 'just now'
```

## Development

### Dependencies

The build environment relies on [Node.js][node], [NPM], [Jake], [JSHint],
[Mocha], [Chai] and [UglifyJS]. Assuming that you already have Node.js
and NPM set up, you just need to run `npm install` to install all of the
dependencies as listed in `package.json`.

### Unit tests

The unit tests are in `test/vagueTime.js`. You can run them with the
command `npm test` or `jake test`.

[ci-image]: https://secure.travis-ci.org/philbooth/vagueTime.js.png?branch=master
[ci-status]: http://travis-ci.org/#!/philbooth/vagueTime.js
[onejs]: https://github.com/azer/onejs
[browserify]: https://github.com/substack/node-browserify
[ender]: http://ender.no.de/
[node]: http://nodejs.org/
[npm]: https://npmjs.org/
[jake]: https://github.com/mde/jake
[mocha]: http://visionmedia.github.com/mocha
[chai]: http://chaijs.com/
[jshint]: https://github.com/jshint/node-jshint
[uglifyjs]: https://github.com/mishoo/UglifyJS

