/**
 * This module contains functionality that allows a precise timestamp
 * to be converted to a vague time, e.g. 'an hour ago'.
 */

 /*globals exports */

(function () {
    'use strict';

    var constants = {
        year: 31557600000, // 1000 ms * 60 s * 60 m * 24 h * 365.25 d
        month: 2629800000, // 31557600000 ms / 12 m
        week: 604800000, // 1000 ms * 60 s * 60 m * 24 h * 7 d
        day: 86400000, // 1000 ms * 60 s * 60 m * 24 h
        hour: 3600000, // 1000 ms * 60 s * 60 m
        minute: 60000 // 1000 ms * 60 s
    };

    exports.getVagueTime = getVagueTime;

    /**
     * Public function `vagueTime.get`.
     *
     * Returns a vague time, such as 'an hour ago', based on
     * a precise timestamp and an optional reference timestamp.
     * If the reference timestamp is not provided, `Date.now()`
     * is used instead.
     *
     * @param timestamp {number}           The timestamp to convert,
     *                                     in seconds.
     * @param [referenceTimesamp] {number} The optional reference
     *                                     timestamp from which to
     *                                     calculate the vague time
     *                                     (defaults to `Date.now()`.
     */
    function getVagueTime (timestamp, referenceTimestamp) {
        var times = getTimes(timestamp, referenceTimestamp);

        if (times.difference >= constants.year) {
            return getTimeDifferenceAsYears(times.difference);
        }

        if (times.difference >= constants.month) {
            return getTimeDifferenceAsMonths(times.difference);
        }

        if (times.difference >= constants.week) {
            return getTimeDifferenceAsWeeksAndDays(times.difference);
        }

        if (times.difference >= constants.day) {
            return getTimeDifferenceAsDays(times.difference);
        }

        if (times.difference >= constants.hour) {
            return getTimeDifferenceAsHours(times.difference);
        }

        if (times.difference >= constants.minute) {
            return getTimeDifferenceAsMinutes(times.difference);
        }

        return 'just now';
    }

    function getTimes (timestamp, referenceTimestamp) {
        var times = {
            then: getTime(timestamp + '000'),
            now: referenceTimestamp ? getTime(referenceTimestamp + '000') : getTime(Date.now())
        };

        times.difference = times.now.getTime() - times.then.getTime();

        return times;
    }

    function getTime (timestamp) {
        var time = new Date();
        time.setTime(timestamp);
        return time;
    }

    function getTimeDifferenceAsYears (difference) {
        return getTimeDifferenceAsUnits(difference, constants.year, 'year');
    }

    function getTimeDifferenceAsMonths (difference) {
        return getTimeDifferenceAsUnits(difference, constants.month, 'month');
    }

    function getTimeDifferenceAsWeeksAndDays (difference) {
        if (difference % constants.week === 0) {
            return getTimeDifferenceAsWeeks(difference);
        }

        return getTimeDifferenceAsMixedUnits(difference, constants.week, 'week', constants.day, 'day');
    }

    function getTimeDifferenceAsWeeks (difference) {
        return getTimeDifferenceAsUnits(difference, constants.week, 'week');
    }

    function getTimeDifferenceAsDays (difference) {
        return getTimeDifferenceAsUnits(difference, constants.day, 'day');
    }

    function getTimeDifferenceAsHours (difference) {
        return getTimeDifferenceAsUnits(difference, constants.hour, 'hour');
    }

    function getTimeDifferenceAsMinutes (difference) {
        return getTimeDifferenceAsUnits(difference, constants.minute, 'minute');
    }

    function getTimeDifferenceAsUnits (differenceAsMilliseconds, unitAsMilliseconds, unitName) {
        var units = Math.floor(differenceAsMilliseconds / unitAsMilliseconds);
        return units + ' ' + pluraliseNoun(units, unitName) + ' ago';
    }

    function getTimeDifferenceAsMixedUnits (differenceAsMilliseconds, firstUnitAsMilliseconds, firstUnitName, secondUnitAsMilliseconds, secondUnitName) {
        var firstUnits = Math.floor(differenceAsMilliseconds / firstUnitAsMilliseconds),
            secondUnits = Math.floor(differenceAsMilliseconds % firstUnitAsMilliseconds / secondUnitAsMilliseconds);
        return firstUnits + ' ' + pluraliseNoun(firstUnits, firstUnitName) + ' and ' +
            secondUnits + ' ' + pluraliseNoun(secondUnits, secondUnitName) + ' ago';
    }

    function pluraliseNoun (amount, noun) {
        return noun + (amount > 1 ? 's' : '');
    }
}());

