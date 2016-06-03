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
   * @option raw   Return translation-friendly raw data in the format
   *               `{ v: value, u: units }`.
   */
  function getVagueTime (options) {
    var now, units, diff, action, key, numericalValue, value, threshold, plural;

    now = Date.now();
    units = normaliseUnits(options.units);
    diff = normaliseTime(options.from, units, now) - normaliseTime(options.to, units, now);
    plural = 's';

    if (diff >= 0) {
      action = past;
    } else {
      diff = -diff;
      action = future;
    }

    for (key in times) {
      if (times.hasOwnProperty(key)) {
        value = times[key];
        threshold = value / 4;

        if (diff < threshold) {
          continue;
        }

        if (diff < value - threshold) {
          if (key !== 'hour') {
            continue;
          }

          value = 'half ' + singleValue(key);
          numericalValue = 0.5;
          plural = '';
        } else {
          value = numericalValue = Math.round(diff / value);

          switch (value) {
            case 1:
              value = singleValue(key);
              plural = '';
              break;
            case 2:
              value = 'a couple of';
          }
        }

        if (options.raw) {
          return translationFriendlyResult(action, numericalValue, key);
        }

        return action(value, key + plural);
      }
    }

    if (options.raw) {
      return translationFriendlyResult(action, 0, null);
    }

    return action.f;
  }

  function normaliseUnits (units) {
    if (typeof units === 'undefined') {
      return 'ms';
    }

    if (units === 's' || units === 'ms') {
      return units;
    }

    fail('units');
  }

  function fail (reason) {
    throw new Error('Invalid ' + reason);
  }

  function normaliseTime(time, units, defaultTime) {
    if (typeof time === 'undefined') {
      return defaultTime;
    }

    if (typeof time === 'string') {
      time = parseInt(time, 10);
    }

    if (isNotDate(time) && isNotTimestamp(time)) {
      fail('time');
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
  past.f = 'just now';

  function future (value, units) {
    return 'in ' + value + ' ' + units;
  }
  future.f = 'soon';

  function singleValue (time) {
    return time === 'hour' ? 'an' : 'a';
  }

  function translationFriendlyResult (action, numericalValue, unit) {
    return {
      v: action === past ? -numericalValue : numericalValue,
      u: unit
    };
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
