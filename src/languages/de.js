        {
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
        }
