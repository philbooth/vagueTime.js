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

    languages = {
        br: {
            year: [ 'ano', 'anos' ],
            month: [ 'mês', 'meses' ],
            week: [ 'semana', 'semanas' ],
            day: [ 'dia', 'dias' ],
            hour: [ 'hora', 'horas' ],
            minute: [ 'minuto', 'minutos' ],

            past: function (vagueTime, unit) {
                return vagueTime + ' ' + unit + ' atrás';
            },

            future: function (vagueTime, unit) {
                return 'em ' + vagueTime + ' ' + unit;
            },

            defaults: {
                past: 'agora mesmo',
                future: 'em breve'
            }
        }
,
        da: {
            year: [ 'år', 'år' ],
            month: [ 'måned', 'måneder' ],
            week: [ 'uge', 'uger' ],
            day: [ 'dag', 'dage' ],
            hour: [ 'time', 'timer' ],
            minute: [ 'minut', 'minutter' ],
        
            past: function (vagueTime, unit) {
                return vagueTime + ' ' + unit + ' siden';
            },
        
            future: function (vagueTime, unit) {
                return 'om ' + vagueTime + ' ' + unit;
            },
        
            defaults: {
                past: 'lige nu',
                future: 'snart'
            }
        },
        de: {
            year: [ 'Jahr', 'Jahren' ],
            month: [ 'Monat', 'Monaten' ],
            week: [ 'Woche', 'Wochen' ],
            day: [ 'Tag', 'Tagen' ],
            hour: [ 'Stunde', 'Stunden' ],
            minute: [ 'Minute', 'Minuten' ],
        
            past: function (vagueTime, unit) {
                return 'vor ' + vagueTime + ' ' + unit;
            },
        
            future: function (vagueTime, unit) {
                return 'in ' + vagueTime + ' ' + unit;
            },
        
            defaults: {
                past: 'jetzt gerade',
                future: 'bald'
            }
        },
        en: {
            year: [ 'year', 'years' ],
            month: [ 'month', 'months' ],
            week: [ 'week', 'weeks' ],
            day: [ 'day', 'days' ],
            hour: [ 'hour', 'hours' ],
            minute: [ 'minute', 'minutes' ],
        
            past: function (vagueTime, unit) {
                return vagueTime + ' ' + unit + ' ago';
            },
        
            future: function (vagueTime, unit) {
                return 'in ' + vagueTime + ' ' + unit;
            },
        
            defaults: {
                past: 'just now',
                future: 'soon'
            }
        },
        fr: {
            year: [ 'an', 'ans' ],
            month: [ 'mois', 'mois' ],
            week: [ 'semaine', 'semaines' ],
            day: [ 'jour', 'jours' ],
            hour: [ 'heure', 'heures' ],
            minute: [ 'minute', 'minutes' ],
        
            past: function (vagueTime, unit) {
                return 'il y a ' + vagueTime + ' ' + unit;
            },
        
            future: function (vagueTime, unit) {
                return 'dans ' + vagueTime + ' ' + unit;
            },
        
            defaults: {
                past: 'tout de suite',
                future: 'bientôt'
            }
        },
		jp: {
			year: [ '年', '年' ],
				month: [ 'ヶ月', 'ヶ月' ],
				week: [ '週間', '週間' ],
				day: [ '日', '日' ],
				hour: [ '時間', '時間' ],
				minute: [ '分', '分' ],

				past: function (vagueTime, unit) {
				return vagueTime + ' ' + unit + '前';
			},

			future: function (vagueTime, unit) {
				return vagueTime + ' ' + unit + '後';
			},

			defaults: {
				past: '今',
					future: 'すぐに'
			}
		},
		ko: {
			year: [ '년', '년' ],
				month: [ '개월', '개월' ],
				week: [ '주', '주' ],
				day: [ '일', '일' ],
				hour: [ '시간', '시간' ],
				minute: [ '분', '분' ],

				past: function (vagueTime, unit) {
				return vagueTime + ' ' + unit + ' 전';
			},

			future: function (vagueTime, unit) {
				return vagueTime + ' ' + unit + ' 후';
			},

			defaults: {
				past: '지금',
					future: '곧'
			}
  		},
        nl: {
            year: [ 'jaar', 'jaar' ],
            month: [ 'maand', 'maanden' ],
            week: [ 'week', 'weken' ],
            day: [ 'dag', 'dagen' ],
            hour: [ 'uur', 'uur' ],
            minute: [ 'minuut', 'minuten' ],
        
            past: function (vagueTime, unit) {
                return vagueTime + ' ' + unit + ' geleden';
            },
        
            future: function (vagueTime, unit) {
                return 'over ' + vagueTime + ' ' + unit;
            },
        
            defaults: {
                past: 'juist nu',
                future: 'binnenkort'
            }
        },
		zh: {
			year: [ '年', '年' ],
				month: [ '个月', '个月' ],
				week: [ '周', '周' ],
				day: [ '天', '天' ],
				hour: [ '小时', '小时' ],
				minute: [ '分钟', '分钟' ],

				past: function (vagueTime, unit) {
				return vagueTime + ' ' + unit + ' 之前';
			},

			future: function (vagueTime, unit) {
				return 'in ' + vagueTime + ' ' + unit;
			},

			defaults: {
				past: '刚刚',
					future: '马上'
			}
		}
    },

    defaultLanguage = 'en',

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
     * @option [lang] {string}  The output language. Default is specified as a
     *                          build option.
     */
    function getVagueTime (options) {
        var units = normaliseUnits(options.units),
            now = Date.now(),
            from = normaliseTime(options.from, units, now),
            to = normaliseTime(options.to, units, now),
            difference = from - to,
            type;

        if (difference >= 0) {
            type = 'past';
        } else {
            type = 'future';
            difference = -difference;
        }

        return estimate(difference, type, options.lang);
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

    function estimate (difference, type, language) {
        var time, vagueTime, lang = languages[language] || languages[defaultLanguage];

        for (time in times) {
            if (times.hasOwnProperty(time) && difference >= times[time]) {
                vagueTime = Math.floor(difference / times[time]);
                return lang[type](vagueTime, lang[time][(vagueTime > 1)+0]);
            }
        }

        return lang.defaults[type];
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

