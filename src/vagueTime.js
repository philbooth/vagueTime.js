/**
 * This module formats precise time differences as a vague/fuzzy
 * time, e.g. '3 weeks ago', 'just now' or 'in 2 hours'.
 */

 /*globals define, module */

(function (globals) {
    'use strict';

    var times = {
        year: 31557600000, // 1000 ms * 60 s * 60 m * 24 h * 365.25 d
        month: 2629800000, // 31557600000 ms / 12 m
        week: 604800000, // 1000 ms * 60 s * 60 m * 24 h * 7 d
        day: 86400000, // 1000 ms * 60 s * 60 m * 24 h
        hour: 3600000, // 1000 ms * 60 s * 60 m
        minute: 60000 // 1000 ms * 60 s
    },

    defaults = {
        past: 'just now',
        future: 'soon'
    },

    formats = {
        past: formatPast,
        future: formatFuture
    },

    functions = {
        get: getVagueTime
    };

    exportFunctions();

    /**
     * Public function `get`.
     *
     * Returns a vague time, such as '3 weeks ago', 'just now' or 'in 2 hours'.
     *
     * @option [from] {Date}    The origin time. Defaults to `Date.now()`.
     * @option [to] {Date}      The target time. Defaults to `Date.now()`.
     * @option [units] {string} If `from` or `to` are timestamps rather than date
     *                          instances, this indicates the units that they are
     *                          measured in. Can be either `ms` for milliseconds
     *                          or `s` for seconds. Defaults to `ms`.
     */
    function getVagueTime (options) {
        var units = normaliseUnits(options.units),
            now = Date.now(),
            from = normaliseTime(options.from, units, now),
            to = normaliseTime(options.to, units, now),
            difference = from - to,
            type;

        if (difference > 0) {
            type = 'past';
        } else {
            type = 'future';
            difference = -difference;
        }

        return estimate(difference, type);
    }

    function normaliseUnits (units) {
        if (typeof units === 'undefined') {
            return 'ms';
        }

        if (units === 's' || units === 'ms') {
            return units;
        }

        throw new Error('Invalid units');
    }

    function normaliseTime(time, units, defaultTime) {
        if (typeof time === 'undefined') {
            return defaultTime;
        }

        if (typeof time === 'string') {
            time = parseInt(time, 10);
        }

        if (isNotDate(time) && isNotTimestamp(time)) {
            throw new Error('Invalid time');
        }

        if (typeof time === 'number' && units === 's') {
            time *= 1000;
        }

        return time;
    }

    function isNotDate (date) {
        return Object.prototype.toString.call(date) !== "[object Date]" || isNaN(date.getTime());
    }

    function isNotTimestamp (timestamp) {
        return typeof timestamp !== 'number' || isNaN(timestamp);
    }

    function estimate (difference, type) {
        var time, vagueTime;

        for (time in times) {
            if (times.hasOwnProperty(time) && difference >= times[time]) {
                vagueTime = Math.floor(difference / times[time]);
                return formats[type](vagueTime, pluraliseNoun(time, vagueTime));
            }
        }

        return defaults[type];
    }

    function pluraliseNoun (noun, amount) {
        return noun + (amount > 1 ? 's' : '');
    }

    function formatPast (vagueTime, unit) {
        return vagueTime + ' ' + unit + ' ago';
    }

    function formatFuture (vagueTime, unit) {
        return 'in ' + vagueTime + ' ' + unit;
    }

    function exportFunctions () {
        if (typeof define === 'function' && define.amd) {
            define(function () {
                return functions;
            });
        } else if (typeof module !== 'undefined' && module !== null) {
            module.exports = functions;
        } else {
            globals.vagueTime = functions;
        }
    }
}(this));

