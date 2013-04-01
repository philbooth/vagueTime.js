/*globals require, exports */

(function () {
    'use strict';

    var assert = require('chai').assert,

    modulePath = '../src/vagueTime';

    suite('vagueTime:', function () {
        test('require does not throw', function () {
            assert.doesNotThrow(function () {
                require(modulePath);
            });
        });

        test('require returns object', function () {
            assert.isObject(require(modulePath));
        });

        suite('require:', function () {
            var vagueTime;

            setup(function () {
                vagueTime = require(modulePath);
            });

            teardown(function () {
                vagueTime = null;
            });

            test('get function is exported', function () {
                assert.isFunction(vagueTime.get);
            });

            test('get throws when from is bad string', function () {
                assert.throws(function () {
                    vagueTime.get({
                        from: 'foo',
                        to: 1234567890,
                        units: 's'
                    });
                });
            });

            test('get throws when until is bad string', function () {
                assert.throws(function () {
                    vagueTime.get({
                        from: 1234567890,
                        to: 'foo',
                        units: 's'
                    });
                });
            });

            test('get throws when units is bad string', function () {
                assert.throws(function () {
                    vagueTime.get({
                        from: 1234567890,
                        to: 1234567890,
                        units: 'foo'
                    });
                });
            });

            test('get returns just now when time is 1 second ago', function () {
                assert.strictEqual(vagueTime.get({
                    from: 1234567890,
                    to: 1234567889,
                    units: 's'
                }), 'just now');
            });

            test('get returns just now when time is 59 seconds ago', function () {
                assert.strictEqual(vagueTime.get({
                    from: 1234567890,
                    to: 1234567831,
                    units: 's'
                }), 'just now');
            });

            test('get returns 1 minute ago when time is 60 seconds ago', function () {
                assert.strictEqual(vagueTime.get({
                    from: 1234567890,
                    to: 1234567830,
                    units: 's'
                }), '1 minute ago');
            });

            test('get returns 59 minutes ago when time is 3,599 seconds ago', function () {
                assert.strictEqual(vagueTime.get({
                    from: 1234567890,
                    to: 1234564291,
                    units: 's'
                }), '59 minutes ago');
            });

            test('get returns 1 hour ago when time is 3,600 seconds ago', function () {
                assert.strictEqual(vagueTime.get({
                    from: 1234567890,
                    to: 1234564290,
                    units: 's'
                }), '1 hour ago');
            });

            test('get returns 23 hours ago when time is 86,399 seconds ago', function () {
                assert.strictEqual(vagueTime.get({
                    from: 1234567890,
                    to: 1234481491,
                    units: 's'
                }), '23 hours ago');
            });

            test('get returns 1 day ago when time is 86,400 seconds ago', function () {
                assert.strictEqual(vagueTime.get({
                    from: 1234567890,
                    to: 1234481490,
                    units: 's'
                }), '1 day ago');
            });

            test('get returns 6 days ago when time is 604,799 seconds ago', function () {
                assert.strictEqual(vagueTime.get({
                    from: 1234567890,
                    to: 1233963091,
                    units: 's'
                }), '6 days ago');
            });

            test('get returns 1 week ago when time is 604,800 seconds ago', function () {
                assert.strictEqual(vagueTime.get({
                    from: 1234567890,
                    to: 1233963090,
                    units: 's'
                }), '1 week ago');
            });

            test('get returns 4 weeks ago when time is 2,629,799 seconds ago', function () {
                assert.strictEqual(vagueTime.get({
                    from: 1234567890,
                    to: 1231938091,
                    units: 's'
                }), '4 weeks ago');
            });

            test('get returns 1 month ago when time is 2,629,800 seconds ago', function () {
                assert.strictEqual(vagueTime.get({
                    from: 1234567890,
                    to: 1231938090,
                    units: 's'
                }), '1 month ago');
            });

            test('get returns 11 months ago when time is 31,557,599 seconds ago', function () {
                assert.strictEqual(vagueTime.get({
                    from: 1234567890,
                    to: 1203010291,
                    units: 's'
                }), '11 months ago');
            });

            test('get returns 1 year ago when time is 31,557,600 seconds ago', function () {
                assert.strictEqual(vagueTime.get({
                    from: 1234567890,
                    to: 1203010290,
                    units: 's'
                }), '1 year ago');
            });

            test('get returns 2 years ago when time is 63,115,200 seconds ago', function () {
                assert.strictEqual(vagueTime.get({
                    from: 1234567890,
                    to: 1171452690,
                    units: 's'
                }), '2 years ago');
            });

            test('get returns just now when time is 59,000 milliseconds ago', function () {
                assert.strictEqual(vagueTime.get({
                    from: 1234567890000,
                    to: 1234567831000,
                    units: 'ms'
                }), 'just now');
            });

            test('get returns 1 minute ago when time is 60,000 milliseconds ago', function () {
                assert.strictEqual(vagueTime.get({
                    from: 1234567890000,
                    to: 1234567830000,
                    units: 'ms'
                }), '1 minute ago');
            });

            test('get returns 59 minutes ago when time is 3,599,000 milliseconds ago', function () {
                assert.strictEqual(vagueTime.get({
                    from: 1234567890000,
                    to: 1234564291000,
                    units: 'ms'
                }), '59 minutes ago');
            });

            test('get returns 1 hour ago when time is 3,600,000 milliseconds ago', function () {
                assert.strictEqual(vagueTime.get({
                    from: 1234567890000,
                    to: 1234564290000,
                    units: 'ms'
                }), '1 hour ago');
            });

            test('get returns 23 hours ago when time is 86,399,000 milliseconds ago', function () {
                assert.strictEqual(vagueTime.get({
                    from: 1234567890000,
                    to: 1234481491000,
                    units: 'ms'
                }), '23 hours ago');
            });

            test('get returns 1 day ago when time is 86,400,000 milliseconds ago', function () {
                assert.strictEqual(vagueTime.get({
                    from: 1234567890000,
                    to: 1234481490000,
                    units: 'ms'
                }), '1 day ago');
            });

            test('get returns 6 days ago when time is 604,799,000 milliseconds ago', function () {
                assert.strictEqual(vagueTime.get({
                    from: 1234567890000,
                    to: 1233963091000,
                    units: 'ms'
                }), '6 days ago');
            });

            test('get returns 1 week ago when time is 604,800,000 milliseconds ago', function () {
                assert.strictEqual(vagueTime.get({
                    from: 1234567890000,
                    to: 1233963090000,
                    units: 'ms'
                }), '1 week ago');
            });

            test('get returns 4 weeks ago when time is 2,629,799,000 milliseconds ago', function () {
                assert.strictEqual(vagueTime.get({
                    from: 1234567890000,
                    to: 1231938091000,
                    units: 'ms'
                }), '4 weeks ago');
            });

            test('get returns 1 month ago when time is 2,629,800,000 milliseconds ago', function () {
                assert.strictEqual(vagueTime.get({
                    from: 1234567890000,
                    to: 1231938090000,
                    units: 'ms'
                }), '1 month ago');
            });

            test('get returns 11 months ago when time is 31,557,599,000 milliseconds ago', function () {
                assert.strictEqual(vagueTime.get({
                    from: 1234567890000,
                    to: 1203010291000,
                    units: 'ms'
                }), '11 months ago');
            });

            test('get returns 1 year ago when time is 31,557,600,000 milliseconds ago', function () {
                assert.strictEqual(vagueTime.get({
                    from: 1234567890000,
                    to: 1203010290000,
                    units: 'ms'
                }), '1 year ago');
            });

            test('get returns 2 years ago when time is 63,115,200,000 milliseconds ago', function () {
                assert.strictEqual(vagueTime.get({
                    from: 1234567890000,
                    to: 1171452690000,
                    units: 'ms'
                }), '2 years ago');
            });

            test('get returns soon when times are equal', function () {
                assert.strictEqual(vagueTime.get({
                    from: 1234567890,
                    to: 1234567890,
                    units: 's'
                }), 'soon');
            });

            test('get accepts string arguments', function () {
                assert.strictEqual(vagueTime.get({
                    from: '1234567890',
                    to: '1234567890',
                    units: 's'
                }), 'soon');
            });

            test('get accepts date arguments', function () {
                assert.strictEqual(vagueTime.get({
                    from: new Date(2013, 0, 1),
                    to: new Date(2012, 11, 31)
                }), '1 day ago');
            });

            test('get ignores units when arguments are dates', function () {
                assert.strictEqual(vagueTime.get({
                    from: new Date(2012, 11, 16, 23, 59, 59),
                    to: new Date(2012, 11, 15),
                    units: 's'
                }), '1 day ago');
            });

            test('units defaults to milliseconds', function () {
                assert.strictEqual(vagueTime.get({
                    from: 60000,
                    to: 0,
                }), '1 minute ago');
            });

            test('until defaults to soon', function () {
                assert.include(vagueTime.get({
                    to: Date.now(),
                    units: 'ms'
                }), 'soon');
            });

            test('get returns soon when time is 59 seconds ahead', function () {
                assert.strictEqual(vagueTime.get({
                    from: 1234567890,
                    to: 1234567949,
                    units: 's'
                }), 'soon');
            });

            test('get returns in 1 minute when time is 60 seconds ahead', function () {
                assert.strictEqual(vagueTime.get({
                    from: 1234567890,
                    to: 1234567950,
                    units: 's'
                }), 'in 1 minute');
            });

            test('from defaults to soon', function () {
                assert.include(vagueTime.get({
                    to: Date.now(),
                    units: 'ms'
                }), 'soon');
            });
        });
    });
}());

