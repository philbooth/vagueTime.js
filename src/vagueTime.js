/**
 * This module contains functionality that allows a precise timestamp
 * to be converted to a vague time, e.g. 'just now' or '3 weeks ago'.
 */

 /*globals exports, window */

(function () {
    'use strict';

    var times = {
        year: 31557600000, // 1000 ms * 60 s * 60 m * 24 h * 365.25 d
        month: 2629800000, // 31557600000 ms / 12 m
        week: 604800000, // 1000 ms * 60 s * 60 m * 24 h * 7 d
        day: 86400000, // 1000 ms * 60 s * 60 m * 24 h
        hour: 3600000, // 1000 ms * 60 s * 60 m
        minute: 60000 // 1000 ms * 60 s
    };

    if (typeof exports === 'undefined') {
        window.vagueTime = {
            get: getVagueTime
        };
    } else {
        exports.get = getVagueTime;
    }

    /**
     * Public function `get`.
     *
     * Returns a vague time, such as 'just now' or '3 weeks ago',
     * based on a precise timestamp and an optional reference
     * timestamp.
     *
     * @param from {number}    The timestamp to convert, in seconds.
     * @param [until] {number} The optional reference timestamp from
     *                         which to calculate the vague time,
     *                         defaults to `Date.now()`.
     * @param [units] {string} The units the timestamps are measured
     *                         in, either 's' for seconds or 'ms' for
     *                         milliseconds, defaults to 's'.
     */
    function getVagueTime (options) {
        var units = normaliseUnits(options.units),
            from = normaliseTimestamp(options.from, units),
            until = normaliseTimestamp(options.until, units, Date.now()),
            difference, time, vagueTime;

        difference = until - from;

        for (time in times) {
            if (times.hasOwnProperty(time) && difference >= times[time]) {
                vagueTime = Math.floor(difference / times[time]);
                return vagueTime + ' ' + pluraliseNoun(time, vagueTime) + ' ago';
            }
        }

        return 'just now';
    }

    function normaliseUnits (units) {
        if (typeof units === 'undefined') {
            return 's';
        }

        if (units === 's' || units === 'ms') {
            return units;
        }

        throw new Error('Invalid units');
    }

    function normaliseTimestamp (time, units, defaultTime) {
        if (typeof time === 'undefined' && typeof defaultTime === 'number') {
            return defaultTime;
        }

        if (typeof time === 'string') {
            time = parseInt(time, 10);
        }

        if (typeof time !== 'number' || isNaN(time)) {
            throw new Error('Invalid timestamp');
        }

        if (units === 's') {
            return time * 1000;
        }

        return time;
    }

    function pluraliseNoun (noun, amount) {
        return noun + (amount > 1 ? 's' : '');
    }
}());

