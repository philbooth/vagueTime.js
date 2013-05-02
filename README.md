# vagueTime.js

[![Build status][ci-image]][ci-status]

A tiny JavaScript library
that formats precise time differences
as a vague/fuzzy time,
e.g. '3 months ago', 'just now' or 'in 2 hours'.

If this project isn't quite what your'e looking for,
you may be interested in vagueTime's big sister,
[vagueDate.js][vague-date].

## Installation

### Via NPM

```
npm install vague-time
```

### Via Jam

```
jam install vague-time
```

### Via Git

```
git clone git@github.com:philbooth/vagueTime.js.git
```

## Usage

### Loading the library

Both
CommonJS
(e.g.
if you're running on [Node.js][node]
or if you're in the browser with [Browserify])
and AMD
(e.g. if you're using [Require.js][require])
loading styles are supported.
If neither system is detected,
the library defaults to
exporting it's interface globally
as `vagueTime`.

### Calling the library

vagueTime.js exports a single public function, `get`,
which returns a vague time string
based on the argument(s) that you pass it.

The arguments are passed as properties on a single options object.
The optional property `from` is a timestamp or `Date` instance
denoting the origin point from which the vague time will be calculated,
defaulting to `Date.now()` if undefined.
The optional property `to` is a timestamp or `Date` instance
denoting the target point to which the vague time will be calculated,
defaulting to `Date.now()` if undefined.
The optional property `units` is a string,
denoting the units that the `from` and `to` timestamps are specified in,
either `'s'` for seconds or `'ms'` for milliseconds,
defaulting to `'ms'` if undefined.
This property has no effect
when `from` and `to` are `Date` instances
rather than timestamps.

Essentially, if `to` is less than `from` the returned vague time will
indicate some point in the past. If `to` is greater than `from` it will
indicate some point in the future.

### Examples

```
vagueTime.get({
    from: 60,
    to: 0,
	units: 's'
}); // returns '1 minute ago'

vagueTime.get({
    from: 0,
    to: 60,
	units: 's'
}); // returns 'in 1 minute'

vagueTime.get({
    from: 7200,
    to: 0,
	units: 's'
}); // returns '2 hours ago'

vagueTime.get({
    from: 0,
    to: 7200,
	units: 's'
}); // returns 'in 2 hours'

vagueTime.get({
    from: new Date(2013, 0, 1)
	to: new Date(2012, 11, 31)
}); // returns '1 day ago'
```

## Development

### Dependencies

The build environment relies on
Node.js,
[NPM],
[Jake],
[JSHint],
[Mocha],
[Chai] and
[UglifyJS].
Assuming that you already have Node.js and NPM set up,
you just need to run `npm install`
to install all of the dependencies as listed in `package.json`.

### Unit tests

The unit tests are in `test/vagueTime.js`.
You can run them with the command `npm test` or `jake test`.
To run the tests in a web browser,
open `test/vagueTime.html`.

[ci-image]: https://secure.travis-ci.org/philbooth/vagueTime.js.png?branch=master
[ci-status]: http://travis-ci.org/#!/philbooth/vagueTime.js
[vague-date]: https://github.com/philbooth/vagueDate.js
[node]: http://nodejs.org/
[browserify]: http://browserify.org/
[require]: http://requirejs.org/
[npm]: https://npmjs.org/
[jake]: https://github.com/mde/jake
[jshint]: https://github.com/jshint/node-jshint
[mocha]: http://visionmedia.github.com/mocha
[chai]: http://chaijs.com/
[uglifyjs]: https://github.com/mishoo/UglifyJS

