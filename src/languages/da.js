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
        }
