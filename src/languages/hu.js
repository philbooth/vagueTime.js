        hu: {
            year: [ 'éve', 'éve' ],
            month: [ 'hónapja', 'hónapja' ],
            week: [ 'hete', 'hete' ],
            day: [ 'napja', 'napja' ],
            hour: [ 'órája', 'órája' ],
            minute: [ 'perce', 'perce' ],

            past: function (vagueTime, unit) {
                return vagueTime + ' ' + unit;
            },

            future: function (vagueTime, unit) {
                var transform = {
                    'éve': 'év',
                    'hónapja': 'hónap',
                    'hete': 'hét',
                    'napja': 'nap',
                    'órája': 'óra',
                    'perce': 'perc'
                };
                unit = transform[unit];
                return vagueTime + ' ' + unit + ' múlva';
            },

            defaults: {
                past: 'most',
                future: 'hamarosan'
            }
        }
