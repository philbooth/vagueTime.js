# vagueTime.js

A tiny JavaScript library
that formats precise time differences
as a vague/estimated time,
e.g. '3 months ago', 'just now' or 'in 2 hours'.

[![Build status][ci-image]][ci-status]

## Installation

### Node.js

```
npm install vague-time
```

### Browser

To use vagueTime.js in a browser environment, you can
either clone the git repository like so:

```
git clone git@github.com:philbooth/vagueTime.js.git
```

Or use one of the growing number of package managers, such as
[Jam] (`vague-time`),
[Component] (`philbooth/vagueTime.js`),
[Ender] (`vague-time`)
or [Bower] (`vagueTime.js`).

## Usage

### Loading the library

#### Node.js

```
var vagueTime = require('vague-time');
```

#### Browser

```
<script type="text/javascript" src=".../vagueTime.js/src/vagueTime.min.js"></script>
```

### Calling the library

vagueTime.js exports a single public function, `get`,
which returns a vague time string
based on the argument(s) that you pass it.

The arguments are passed as properties on a single options object.
The optional property `from` is a timestamp
denoting the origin point from which the vague time will be calculated,
defaulting to `Date.now()` if undefined.
The optional property `to` is a timestamp
denoting the target point to which the vague time will be calculated,
defaulting to `Date.now()` if undefined.
The optional property `units` is a string,
denoting the units that the `from` and `to` timestamps are specified in,
either `'s'` for seconds or `'ms'` for milliseconds,
defaulting to `'s'` if undefined.

Essentially, if `to` is less than `from` the returned vague time will
indicate some point in the past. If `to` is greater than `from` it will
indicate some point in the future.

### Examples

```
vagueTime.get({
    from: 60,
    to: 0
}); // returns '1 minute ago'

vagueTime.get({
    from: 0,
    to: 60
}); // returns 'in 1 minute'

vagueTime.get({
    from: 7200,
    to: 0
}); // returns '2 hours ago'

vagueTime.get({
    from: 0,
    to: 7200
}); // returns 'in 2 hours'

vagueTime.get({
    from: 345600,
    to: 0
}); // returns '4 days ago'

vagueTime.get({
    from: 0,
    to: 345600
}); // returns 'in 4 days'

vagueTime.get({
    from: Date.now(),
    units: 'ms'
}); // returns 'now'
```

## Development

### Dependencies

The build environment relies on
[Node.js][node],
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

[ci-image]: https://secure.travis-ci.org/philbooth/vagueTime.js.png?branch=master
[ci-status]: http://travis-ci.org/#!/philbooth/vagueTime.js
[component]: https://github.com/component/component
[jam]: http://jamjs.org/
[ender]: https://github.com/ender-js/Ender
[bower]: https://github.com/twitter/bower
[node]: http://nodejs.org/
[npm]: https://npmjs.org/
[jake]: https://github.com/mde/jake
[jshint]: https://github.com/jshint/node-jshint
[mocha]: http://visionmedia.github.com/mocha
[chai]: http://chaijs.com/
[uglifyjs]: https://github.com/mishoo/UglifyJS

