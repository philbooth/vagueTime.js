/**
 * This module formats precise time differences as a vague/fuzzy
 * time, e.g. '3 weeks ago', 'just now' or 'in 2 hours'.
 */

 /*globals define, module */

(function (globals) {
  'use strict';

  var times, functions;

  times = {
    year: 31557600000, // 1000 ms * 60 s * 60 m * 24 h * 365.25 d
    month: 2629800000, // 31557600000 ms / 12 m
    week: 604800000, // 1000 ms * 60 s * 60 m * 24 h * 7 d
    day: 86400000, // 1000 ms * 60 s * 60 m * 24 h
    hour: 3600000, // 1000 ms * 60 s * 60 m
    minute: 60000 // 1000 ms * 60 s
  };

  functions = {
    get: getVagueTime
  };

  exportFunctions();

  /**
   * Public function `get`.
   *
   * Returns a vague time, such as '3 weeks ago', 'just now' or 'in 2 hours'.
   *
   * @option from  The origin time. Defaults to `Date.now()`.
   * @option to    The target time. Defaults to `Date.now()`.
   * @option units If `from` or `to` are timestamps rather than date
   *               instances, this indicates the units that they are
   *               measured in. Can be either `ms` for milliseconds
   *               or `s` for seconds. Defaults to `ms`.
   */
  function getVagueTime (options) {
    var now, units, diff, action, fallback, time, value;

    now = Date.now();
    units = normaliseUnits(options.units);
    diff = normaliseTime(options.from, units, now) - normaliseTime(options.to, units, now);

    if (diff >= 0) {
      action = past;
      fallback = 'just now';
    } else {
      diff = -diff;
      action = future;
      fallback = 'soon';
    }

    for (time in times) {
      if (times.hasOwnProperty(time) && diff >= times[time]) {
        value = Math.floor(diff / times[time]);
        if (value === 1) {
          value = time === 'hour' ? 'an' : 'a';
        }

        return action(value, time + (value > 1 ? 's' : ''));
      }
    }

    return fallback;
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
    return Object.prototype.toString.call(date) !== '[object Date]' || isNaN(date.getTime());
  }

  function isNotTimestamp (timestamp) {
    return typeof timestamp !== 'number' || isNaN(timestamp);
  }

  function past (value, units) {
    return value + ' ' + units + ' ago';
  }

  function future (value, units) {
    return 'in ' + value + ' ' + units;
  }

  function exportFunctions () {
    if (typeof define === 'function' && define.amd) {
      define('vagueTime', ['exports'], function(exports) {
        exports.get = functions.get;
      });
    } else if (typeof module !== 'undefined' && module && module.exports) {
      module.exports = functions;
    } else {
      globals.vagueTime = functions;
    }
  }
}(this));
