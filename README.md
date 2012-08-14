# vagueTime.js

A small javascript library for formatting time differences as
a vague time, e.g. '1 hour ago'.

[![Build status][ci-image]][ci-status]

## Installation

`npm install vague-time`

## Usage

Import the module using `require`, referencing either
the raw source (`src/vagueTime.js`, *4.4 kb*) or
minified version (`src/vagueTime.min.js` *1.1 kb*).

To call the library in a browser environment, use [OneJS]
or [Browserify].

vagueTime.js exports a single public function, `get`,
which returns a vague time string, such as 'just now'
or '3 months ago', based on the timestamp argument(s)
that you pass it.

The first argument is a number representing the timestamp
in seconds that is to be converted into a vague time. The
optional second argument is another timestamp that is
used as the reference point from which to base the vague
time string. If the second argument is not specified, the
function defaults to basing the vague time on `Date.now()`
instead.

### Examples

```
vagueTime.get('1171452690', '1234567890'); // returns '2 years ago'
vagueTime.get('1231938091', '1234567890'); // returns '4 weeks ago'
vagueTime.get('1234567890', '1234567890'); // returns 'just now'
```

## Development

### Dependencies

The build environment relies on [Node.js][node], [NPM], [Jake],
[JSHint], [Mocha], [Chai] and [UglifyJS]. Assuming
that you already have Node.js and NPM set up, you just need to
run `npm install` to install all of the dependencies as listed
in `package.json`.

### Unit tests

The unit tests are in `test/vagueTime.js`. You can run them
with the command `npm test` or `jake test`.

[ci-image]: https://secure.travis-ci.org/philbooth/vagueTime.js.png?branch=master
[ci-status]: http://travis-ci.org/#!/philbooth/vagueTime.js
[onejs]: https://github.com/azer/onejs
[browserify]: https://github.com/substack/node-browserify
[node]: http://nodejs.org/
[npm]: https://npmjs.org/
[jake]: https://github.com/mde/jake
[mocha]: http://visionmedia.github.com/mocha
[chai]: http://chaijs.com/
[jshint]: https://github.com/jshint/node-jshint
[uglifyjs]: https://github.com/mishoo/UglifyJS

