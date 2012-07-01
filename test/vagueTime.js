/*globals require, exports */

(function () {
    'use strict';

    var assert = require('chai').assert;

    suite('vagueTime', function () {
        test('require does not throw', function () {
            assert.doesNotThrow(function () {
                require('../src/vagueTime');
            });
        });

        test('require returns object', function () {
            assert.isObject(require('../src/vagueTime'));
        });

        suite('require', function () {
            var vagueTime;

            setup(function () {
                vagueTime = require('../src/vagueTime');
            });

            teardown(function () {
                vagueTime = null;
            });

            test('getVagueTime function is exported', function () {
                assert.isFunction(vagueTime.getVagueTime);
            });

            test('getVagueTime returns just now when times are equal', function () {
                assert.strictEqual(vagueTime.getVagueTime('1234567890', '1234567890'), 'just now');
            });

            test('getVagueTime returns just now when time is 59 seconds ago', function () {
                assert.strictEqual(vagueTime.getVagueTime('1234567831', '1234567890'), 'just now');
            });

            test('getVagueTime returns 1 minute ago when time is 60 seconds ago', function () {
                assert.strictEqual(vagueTime.getVagueTime('1234567830', '1234567890'), '1 minute ago');
            });

            test('getVagueTime returns 59 minutes ago when time is 3,599 seconds ago', function () {
                assert.strictEqual(vagueTime.getVagueTime('1234564291', '1234567890'), '59 minutes ago');
            });

            test('getVagueTime returns 1 hour ago when time is 3,600 seconds ago', function () {
                assert.strictEqual(vagueTime.getVagueTime('1234564290', '1234567890'), '1 hour ago');
            });

            test('getVagueTime returns 23 hours ago when time is 86,399 seconds ago', function () {
                assert.strictEqual(vagueTime.getVagueTime('1234481491', '1234567890'), '23 hours ago');
            });

            test('getVagueTime returns 1 day ago when time is 86,400 seconds ago', function () {
                assert.strictEqual(vagueTime.getVagueTime('1234481490', '1234567890'), '1 day ago');
            });

            test('getVagueTime returns 6 days ago when time is 604,799 seconds ago', function () {
                assert.strictEqual(vagueTime.getVagueTime('1233963091', '1234567890'), '6 days ago');
            });

            test('getVagueTime returns 1 week ago when time is 604,800 seconds ago', function () {
                assert.strictEqual(vagueTime.getVagueTime('1233963090', '1234567890'), '1 week ago');
            });

            test('getVagueTime returns 4 weeks and 2 days ago when time is 2,629,799 seconds ago', function () {
                assert.strictEqual(vagueTime.getVagueTime('1231938091', '1234567890'), '4 weeks and 2 days ago');
            });

            test('getVagueTime returns 1 month ago when time is 2,629,800 seconds ago', function () {
                assert.strictEqual(vagueTime.getVagueTime('1231938090', '1234567890'), '1 month ago');
            });

            test('getVagueTime returns 11 months ago when time is 31,557,599 seconds ago', function () {
                assert.strictEqual(vagueTime.getVagueTime('1203010291', '1234567890'), '11 months ago');
            });

            test('getVagueTime returns 1 year ago when time is 31,557,600 seconds ago', function () {
                assert.strictEqual(vagueTime.getVagueTime('1203010290', '1234567890'), '1 year ago');
            });

            test('getVagueTime returns 2 years ago when time is 63,115,200 seconds ago', function () {
                assert.strictEqual(vagueTime.getVagueTime('1171452690', '1234567890'), '2 years ago');
            });

            test('getVagueTime accepts numeric arguments', function () {
                assert.strictEqual(vagueTime.getVagueTime(1234567890, 1234567890), 'just now');
            });

            test('getVagueTime returns just now when time difference is negative', function () {
                assert.strictEqual(vagueTime.getVagueTime('1234567890', '1234567830'), 'just now');
            });
        });
    });
}());

