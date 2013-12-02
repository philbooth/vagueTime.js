# vagueTime.js

[![Build status][ci-image]][ci-status]

A tiny JavaScript library
that formats precise time differences
as a vague/fuzzy time,
e.g. '3 months ago', 'just now' or 'in 2 hours'.
Supports both English and German phrases.

* [Why would I want that?](#why-would-i-want-that)
* [What alternative libraries are there?](#what-alternative-libraries-are-there)
* [How tiny is it?](#how-tiny-is-it)
* [How do I install it?](#how-do-i-install-it)
* [How do I use it?](#how-do-i-use-it)
    * [Loading the library](#loading-the-library)
    * [Calling the exported functions](#calling-the-exported-functions)
    * [Examples](#examples)
* [How do I set up the build environment?](#how-do-i-set-up-the-build-environment)
* [What license is it released under?](#what-license-is-it-released-under)

## Why would I want that?

Displaying precise dates and times
can give a website a formal and officious feel.
Using fuzzy or vague time phrases
like 'just now' or '2 days ago'
can contribute to a much friendlier interface.

vagueTime.js provides a small, clean API
for translating timestamps
into those user-friendly phrases,
heavily supported by unit tests.
Vague time strings can be returned
in both English and German.

## What alternative libraries are there?

If this project isn't quite what you're looking for,
you may be interested in vagueTime's big sister,
[vagueDate.js][vague-date].
Or if you would like
to parse vague time strings
rather than generate them,
you should try
Matthew Mueller's [date]
or Tim Wood's [moment].

## How tiny is it?

4.7 kb unminified with comments, 1.5 kb minified, 0.8 kb minified + gzipped

## How do I install it?

Any of the following will do:

```
npm install vague-time

jam install vague-time

bower install vague-time

component install philbooth/vagueTime.js

git clone git@github.com:philbooth/vagueTime.js.git
```

## How do I use it?

### Loading the library

f you are running in
[Node.js][node],
[Browserify]
or another CommonJS-style
environment,
you can `require`
vagueTime.js like so:

```javascript
var vagueTime = require('vague-time');
```

It also the supports
the AMD-style format
preferred by [Require.js][require]:

```javascript
require.config({
    paths: {
        vague-time: 'vagueTime.js/src/vagueTime'
    }
});

require([ 'vague-time' ], function (vagueTime) {
});
```

If you are
including vagueTime.js
with an HTML `<script>` tag,
or neither of the above environments
are detected,
the interface will be globally available
as `vagueTime`.

### Calling the exported functions

vagueTime.js exports a single public function, `get`,
which returns a vague time string
based on the argument(s) that you pass it.

The arguments are passed as properties
 on a single options object:

* `from`:
  timestamp or `Date` instance denoting the origin point from which the vague time will be calculated.
  Defaults to `Date.now()`.
* `to`:
  timestamp or `Date` instance denoting the target point to which the vague time will be calculated.
  Defaults to `Date.now()`.
* `units`:
   string denoting the units that the `from` and `to` timestamps are specified in.
  May be `'s'` for seconds or `'ms'` for milliseconds.
  Defaults to `'ms'`.
  This property has no effect
  when `from` and `to` are `Date` instances
  rather than timestamps.
* `lang`:
  string denoting the output language.
  May be `'en'` (English)
  or `'de'` (German).
  Defaults to `'en'`.

Essentially,
if `to` is less than `from`,
the returned vague time will indicate
some point in the past.
If `to` is greater than `from`,
it will indicate
some point in the future.

### Examples

```javascript
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
	units: 's',
	lang: 'de'
}); // returns 'vor 2 Stunden'

vagueTime.get({
    from: new Date(2013, 0, 1),
	to: new Date(2012, 11, 31),
	lang: 'de'
}); // returns 'in 1 Tag'
```

## How do I set up the build environment?

The build environment relies on
Node.js,
[NPM],
[JSHint],
[Mocha],
[Chai] and
[UglifyJS].
Assuming that you already have Node/NPM set up,
you just need to run `npm install`
to install all of the dependencies as listed in `package.json`.

The unit tests are in `test/vagueTime.js`.
You can run them with the command `npm test`.
To run the tests in a web browser,
open `test/vagueTime.html`.

## What license is it released under?

[MIT][license]

[ci-image]: https://secure.travis-ci.org/philbooth/vagueTime.js.png?branch=master
[ci-status]: http://travis-ci.org/#!/philbooth/vagueTime.js
[vague-date]: https://github.com/philbooth/vagueDate.js
[date]: https://github.com/MatthewMueller/date
[moment]: https://github.com/timrwood/moment
[node]: http://nodejs.org/
[browserify]: http://browserify.org/
[require]: http://requirejs.org/
[npm]: https://npmjs.org/
[jshint]: https://github.com/jshint/node-jshint
[mocha]: http://visionmedia.github.com/mocha
[chai]: http://chaijs.com/
[uglifyjs]: https://github.com/mishoo/UglifyJS
[license]: https://github.com/philbooth/vagueTime.js/blob/master/COPYING

