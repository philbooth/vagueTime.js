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
        }