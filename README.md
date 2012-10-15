# vagueTime.js

A small javascript library for formatting time differences as a vague
time, e.g. 'just now' or '3 months ago'.

[![Build status][ci-image]][ci-status]

## Installation

### Node.js

```
npm install vague-time
```

### Browser

```
git clone git@github.com:philbooth/vagueTime.js.git
```

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
which returns a vague time string,
such as 'just now' or '3 months ago',
based on the argument(s) that you pass it.

The arguments are passed as properties on a single options object.
The required property `from` is a timestamp,
denoting the point in time that you would like to convert to a vague time.
The optional property `until` is a timestamp,
denoting the reference point from which you want to calculate the vague time difference,
defaulting to `Date.now()` if undefined.
The optional property `units` is a string,
denoting the units that the `from` and `until` timestamps are specified in,
either `'s'` for seconds or `'ms'` for milliseconds,
defaulting to `'s'` if undefined.

### Examples

```
vagueTime.get({
    from: 0,
    until: 60
}); // returns '1 minute ago'

vagueTime.get({
    from: 0,
    until: 7200
}); // returns '2 hours ago'

vagueTime.get({
    from: 0,
    until: 345600
}); // returns '4 days ago'

vagueTime.get({
    from: Date.now(),
    units: 'ms'
}); // returns 'just now'
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
[node]: http://nodejs.org/
[npm]: https://npmjs.org/
[jake]: https://github.com/mde/jake
[jshint]: https://github.com/jshint/node-jshint
[mocha]: http://visionmedia.github.com/mocha
[chai]: http://chaijs.com/
[uglifyjs]: https://github.com/mishoo/UglifyJS

