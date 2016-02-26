        se: {
            year: [ 'år', 'år' ],
            month: [ 'månad', 'månader' ],
            week: [ 'vecka', 'veckor' ],
            day: [ 'dag', 'dagar' ],
            hour: [ 'timme', 'timmar' ],
            minute: [ 'minut', 'minuter' ],

            past: function (vagueTime, unit) {
                return vagueTime + ' ' + unit + ' sedan';
            },

            future: function (vagueTime, unit) {
                return 'om ' + vagueTime + ' ' + unit;
            },

            defaults: {
                past: 'alldeles nyss',
                future: 'alldeles strax'
            }
        }