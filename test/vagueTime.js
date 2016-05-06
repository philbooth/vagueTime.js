/*globals require, chai */

(function (require) {
  'use strict';

  var assert, modulePath;

  if (typeof require === 'undefined') {
    assert = chai.assert;
    require = function () { return vagueTime; };
  } else {
    assert = require('chai').assert;
    modulePath = '../src/vagueTime';
  }

  suite('vagueTime:', function () {
    test('require does not throw', function () {
      assert.doesNotThrow(function () {
        require(modulePath);
      });
    });

    suite('require:', function () {
      var vagueTime;

      setup(function () {
        vagueTime = require(modulePath);
      });

      teardown(function () {
        vagueTime = null;
      });

      test('correct interface is exported', function () {
        assert.isObject(vagueTime);
        assert.lengthOf(Object.keys(vagueTime), 1);
        assert.isFunction(vagueTime.get);
        assert.lengthOf(vagueTime.get, 1);
      });

      test('get throws when `from` is bad string', function () {
        assert.throws(function () {
          vagueTime.get({
            from: 'foo',
            to: 1234567890,
            units: 's'
          });
        });
      });

      test('get throws when `to` is bad string', function () {
        assert.throws(function () {
          vagueTime.get({
            from: 1234567890,
            to: 'foo',
            units: 's'
          });
        });
      });

      test('get throws when `units` is bad string', function () {
        assert.throws(function () {
          vagueTime.get({
            from: 1234567890,
            to: 1234567890,
            units: 'foo'
          });
        });
      });

      test('get returns "just now" when time is identical', function () {
        assert.equal(vagueTime.get({
          from: 1234567890,
          to: 1234567890,
          units: 's'
        }), 'just now');
      });

      test('get returns "just now" when time is 1 second ago', function () {
        assert.equal(vagueTime.get({
          from: 1234567890,
          to: 1234567889,
          units: 's'
        }), 'just now');
      });

      test('get returns "just now" when time is 44 seconds ago', function () {
        assert.equal(vagueTime.get({
          from: 1234567890,
          to: 1234567846,
          units: 's'
        }), 'just now');
      });

      test('get returns "a minute ago" when time is 45 seconds ago', function () {
        assert.equal(vagueTime.get({
          from: 1234567890,
          to: 1234567845,
          units: 's'
        }), 'a minute ago');
      });

      test('get returns "a minute ago" when time is 89 seconds ago', function () {
        assert.equal(vagueTime.get({
          from: 1234567890,
          to: 1234567801,
          units: 's'
        }), 'a minute ago');
      });

      test('get returns "a couple of minutes ago" when time is 90 seconds ago', function () {
        assert.equal(vagueTime.get({
          from: 1234567890,
          to: 1234567800,
          units: 's'
        }), 'a couple of minutes ago');
      });

      test('get returns "a couple of minutes ago" when time is 149 seconds ago', function () {
        assert.equal(vagueTime.get({
          from: 1234567890,
          to: 1234567741,
          units: 's'
        }), 'a couple of minutes ago');
      });

      test('get returns "3 minutes ago" when time is 150 seconds ago', function () {
        assert.equal(vagueTime.get({
          from: 1234567890,
          to: 1234567740,
          units: 's'
        }), '3 minutes ago');
      });

      test('get returns "14 minutes ago" when time is 869 seconds ago', function () {
        assert.equal(vagueTime.get({
          from: 1234567890,
          to: 1234567021,
          units: 's'
        }), '14 minutes ago');
      });

      test('get returns "15 minutes ago" when time is 870 seconds ago', function () {
        assert.equal(vagueTime.get({
          from: 1234567890,
          to: 1234567020,
          units: 's'
        }), '15 minutes ago');
      });

      test('get returns "15 minutes ago" when time is 899 seconds ago', function () {
        assert.equal(vagueTime.get({
          from: 1234567890,
          to: 1234566991,
          units: 's'
        }), '15 minutes ago');
      });

      test('get returns "half an hour ago" when time is 900 seconds ago', function () {
        assert.equal(vagueTime.get({
          from: 1234567890,
          to: 1234566990,
          units: 's'
        }), 'half an hour ago');
      });

      test('get returns "half an hour ago" when time is 2,699 seconds ago', function () {
        assert.equal(vagueTime.get({
          from: 1234567890,
          to: 1234565191,
          units: 's'
        }), 'half an hour ago');
      });

      test('get returns "an hour ago" when time is 2,700 seconds ago', function () {
        assert.equal(vagueTime.get({
          from: 1234567890,
          to: 1234565190,
          units: 's'
        }), 'an hour ago');
      });

      test('get returns "an hour ago" when time is 5,399 seconds ago', function () {
        assert.equal(vagueTime.get({
          from: 1234567890,
          to: 1234562491,
          units: 's'
        }), 'an hour ago');
      });

      test('get returns "a couple of hours ago" when time is 5,400 seconds ago', function () {
        assert.equal(vagueTime.get({
          from: 1234567890,
          to: 1234562490,
          units: 's'
        }), 'a couple of hours ago');
      });

      test('get returns "a couple of hours ago" when time is 8,999 seconds ago', function () {
        assert.equal(vagueTime.get({
          from: 1234567890,
          to: 1234558891,
          units: 's'
        }), 'a couple of hours ago');
      });

      test('get returns "3 hours ago" when time is 9,000 seconds ago', function () {
        assert.equal(vagueTime.get({
          from: 1234567890,
          to: 1234558890,
          units: 's'
        }), '3 hours ago');
      });

      test('get returns "18 hours ago" when time is 64,799 seconds ago', function () {
        assert.equal(vagueTime.get({
          from: 1234567890,
          to: 1234503091,
          units: 's'
        }), '18 hours ago');
      });

      test('get returns "a day ago" when time is 64,800 seconds ago', function () {
        assert.equal(vagueTime.get({
          from: 1234567890,
          to: 1234503090,
          units: 's'
        }), 'a day ago');
      });

      test('get returns "a day ago" when time is 129,599 seconds ago', function () {
        assert.equal(vagueTime.get({
          from: 1234567890,
          to: 1234438291,
          units: 's'
        }), 'a day ago');
      });

      test('get returns "a couple of days ago" when time is 129,600 seconds ago', function () {
        assert.equal(vagueTime.get({
          from: 1234567890,
          to: 1234438290,
          units: 's'
        }), 'a couple of days ago');
      });

      test('get returns "5 days ago" when time is 453,599 seconds ago', function () {
        assert.equal(vagueTime.get({
          from: 1234567890,
          to: 1234114291,
          units: 's'
        }), '5 days ago');
      });

      test('get returns "a week ago" when time is 453,600 seconds ago', function () {
        assert.equal(vagueTime.get({
          from: 1234567890,
          to: 1234114290,
          units: 's'
        }), 'a week ago');
      });

      test('get returns "a week ago" when time is 907,199 seconds ago', function () {
        assert.equal(vagueTime.get({
          from: 1234567890,
          to: 1233660691,
          units: 's'
        }), 'a week ago');
      });

      test('get returns "a couple of weeks ago" when time is 907,200 seconds ago', function () {
        assert.equal(vagueTime.get({
          from: 1234567890,
          to: 1233660690,
          units: 's'
        }), 'a couple of weeks ago');
      });

      test('get returns "3 weeks ago" when time is 1,972,349 seconds ago', function () {
        assert.equal(vagueTime.get({
          from: 1234567890,
          to: 1232595541,
          units: 's'
        }), '3 weeks ago');
      });

      test('get returns "a month ago" when time is 1,972,350 seconds ago', function () {
        assert.equal(vagueTime.get({
          from: 1234567890,
          to: 1232595540,
          units: 's'
        }), 'a month ago');
      });

      test('get returns "a month ago" when time is 3,944,699 seconds ago', function () {
        assert.equal(vagueTime.get({
          from: 1234567890,
          to: 1230623191,
          units: 's'
        }), 'a month ago');
      });

      test('get returns "a couple of months ago" when time is 3,944,700 seconds ago', function () {
        assert.equal(vagueTime.get({
          from: 1234567890,
          to: 1230623190,
          units: 's'
        }), 'a couple of months ago');
      });

      test('get returns "9 months ago" when time is 23,668,199 seconds ago', function () {
        assert.equal(vagueTime.get({
          from: 1234567890,
          to: 1210899691,
          units: 's'
        }), '9 months ago');
      });

      test('get returns "a year ago" when time is 23,668,200 seconds ago', function () {
        assert.equal(vagueTime.get({
          from: 1234567890,
          to: 1210899690,
          units: 's'
        }), 'a year ago');
      });

      test('get returns "a year ago" when time is 47,336,399 seconds ago', function () {
        assert.equal(vagueTime.get({
          from: 1234567890,
          to: 1187231491,
          units: 's'
        }), 'a year ago');
      });

      test('get returns "a couple of years ago" when time is 47,336,400 seconds ago', function () {
        assert.equal(vagueTime.get({
          from: 1234567890,
          to: 1187231490,
          units: 's'
        }), 'a couple of years ago');
      });

      test('get returns "just now" when time is 44,999 milliseconds ago', function () {
        assert.equal(vagueTime.get({
          from: 44999,
          to: 0,
          units: 'ms'
        }), 'just now');
      });

      test('get returns "a minute ago" when time is 45,000 milliseconds ago', function () {
        assert.equal(vagueTime.get({
          from: 55000,
          to: 0,
          units: 'ms'
        }), 'a minute ago');
      });

      test('get returns "soon" when time is in 1 second', function () {
        assert.equal(vagueTime.get({
          from: 0,
          to: 1,
          units: 's'
        }), 'soon');
      });

      test('get returns "soon" when time is in 14 seconds', function () {
        assert.equal(vagueTime.get({
          from: 0,
          to: 14,
          units: 's'
        }), 'soon');
      });

      test('get returns "in a minute" when time is 45 seconds ahead', function () {
        assert.equal(vagueTime.get({
          from: 0,
          to: 45,
          units: 's'
        }), 'in a minute');
      });

      test('get accepts string arguments', function () {
        assert.equal(vagueTime.get({
          from: '1234567890',
          to: '1234567890',
          units: 's'
        }), 'just now');
      });

      test('get accepts date arguments', function () {
        assert.equal(vagueTime.get({
          from: new Date(2013, 0, 1),
          to: new Date(2012, 11, 31)
        }), 'a day ago');
      });

      test('get ignores units when arguments are dates', function () {
        assert.equal(vagueTime.get({
          from: new Date(2012, 11, 15, 23, 59, 59),
          to: new Date(2012, 11, 15),
          units: 's'
        }), 'a day ago');
      });

      test('`units` defaults to milliseconds', function () {
        assert.equal(vagueTime.get({
          from: 60000,
          to: 0,
        }), 'a minute ago');
      });

      test('`from` defaults to just now', function () {
        assert.include(vagueTime.get({
          to: Date.now(),
          units: 'ms'
        }), 'just now');
      });

      test('`to` defaults to just now', function () {
        assert.include(vagueTime.get({
          to: Date.now(),
          units: 'ms'
        }), 'just now');
      });
    });
  });
}(typeof require === 'function' ? require : undefined));

