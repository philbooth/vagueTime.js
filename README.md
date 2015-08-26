# vagueTime.js

A tiny JavaScript library
that formats precise time differences
as a vague/fuzzy time.
Supports 10 different languages.

[![Build status][ci-image]][ci-status]

* [Why would I want that?](#why-would-i-want-that)
* [What alternative libraries are there?](#what-alternative-libraries-are-there)
* [How tiny is it?](#how-tiny-is-it)
* [How do I install it?](#how-do-i-install-it)
* [How do I use it?](#how-do-i-use-it)
    * [Loading the library](#loading-the-library)
    * [Calling the exported functions](#calling-the-exported-functions)
    * [Examples](#examples)
* [How do I build it?](#how-do-i-build-it)
* [What license is it released under?](#what-license-is-it-released-under)

## Why would I want that?

Displaying precise dates and times
can give a website a formal and officious feel.
Using fuzzy or vague time phrases
like 'just now' or '3 days ago'
can contribute to a much friendlier interface.

vagueTime.js provides a small, clean API
for translating timestamps
into those user-friendly phrases,
heavily supported by unit tests.
Vague time strings
can be returned in
Brazilian Portuguese,
Chinese,
Danish,
Dutch,
English,
French,
German,
Japanese,
Korean or
Spanish.

## What alternative libraries are there?

* [date.js][date];
* [moment.js][moment];
* [xdate];
* [countdown.js][countdown].

## How tiny is it?

The library can be built
for any combination
of the supported languages.
Single-language builds
are typically around
4.3 kb unminified with comments,
1.3 kb minified or
0.7 kb minified+gzipped.

The largest build,
containing all 10 supported languages,
is 8.7 kb unminified with comments,
3.4 kb minified or
1.4 kb minified+gzipped.

## How do I install it?

If you're using npm:

```
npm install vague-time
```

Or if you just want
the git repo:

```
git clone git@github.com:philbooth/vagueTime.js.git
```

If you're into
other package managers,
it is also
available from
Bower,
Component and
Jam.

## How do I use it?

### Loading the library

If you are running in
Node.js,
Browserify
or another CommonJS-style
environment,
you can `require`
vagueTime.js like so:

```javascript
var vagueTime = require('vague-time');
```

It also the supports
the AMD-style format
preferred by Require.js.

If you are
including vagueTime.js
with an HTML `<script>` tag,
or neither of the above environments
are detected,
the interface will be globally available
as `vagueTime`.

Please note
that the default module
contains all 10
supported languages.
If you want
to load
a custom build,
you must ensure
that you reference
that correct explicitly.

### Calling the exported functions

vagueTime.js exports a single public function, `get`,
which returns a vague time string
based on the argument(s) that you pass it.

The arguments are passed as properties
 on a single options object:

* `from`:
  Timestamp or `Date` instance denoting the origin point from which the vague time will be calculated.
  Defaults to `Date.now()`.
* `to`:
  Timestamp or `Date` instance denoting the target point to which the vague time will be calculated.
  Defaults to `Date.now()`.
* `units`:
  String denoting the units that the `from` and `to` timestamps are specified in.
  May be `'s'` for seconds or `'ms'` for milliseconds.
  Defaults to `'ms'`.
  This property has no effect
  when `from` and `to` are `Date` instances
  rather than timestamps.
* `lang`:
  String denoting the output language.
  May be `'br'` (Brazilian Portuguese),
  `'da'` (Danish),
  `'de'` (German),
  `'en'` (English),
  `'es'` (English),
  `'fr'` (French),
  `'jp'` (Japanese),
  `'ko'` (Korean),
  `'nl'` (Dutch) or
  `'zh'` (Chinese.
  The default is set by the build options.

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
    from: new Date(2015, 0, 3),
    to: new Date(2014, 11, 31),
    lang: 'de'
}); // returns 'in 3 Tagen'

vagueTime.get({
    from: 0,
    to: 259200,
    units: 's',
    lang: 'fr'
}); // returns 'il y a 3 jours'

vagueTime.get({
    from: new Date(2015, 0, 27),
    to: new Date(2014, 11, 31),
    lang: 'fr'
}); // returns 'dans 4 semaines'
```

## How do I build it?

The build environment relies on
Node.js,
[JSHint],
[Commander]
[Mocha],
[Chai] and
[UglifyJS].
Assuming that you already have
Node.js and NPM set up,
you just need to run `npm install`
to install all of the dependencies
as listed in `package.json`.

You can then lint the source module
with the command `npm run lint`.

You can run the standard build process
with the command `npm run build`
or run a custom build using the build script:

```
./build.js -l <comma-separated list of language codes> -d <default language code>
```

The unit tests are in `test/vagueTime.js`.
You can run them with the command `npm test`.
To run the tests in a web browser,
open `test/vagueTime.html`.

## What license is it released under?

[MIT][license]

[ci-image]: https://secure.travis-ci.org/philbooth/vagueTime.js.png?branch=master
[ci-status]: http://travis-ci.org/#!/philbooth/vagueTime.js
[date]: http://www.datejs.com/
[moment]: http://momentjs.com/
[xdate]: http://arshaw.com/xdate
[countdown]: http://countdownjs.org/
[jshint]: https://github.com/jshint/node-jshint
[commander]: https://github.com/visionmedia/commander.js
[mocha]: http://visionmedia.github.com/mocha
[chai]: http://chaijs.com/
[uglifyjs]: https://github.com/mishoo/UglifyJS
[license]: COPYING

