        es: {
            year: [ 'año', 'años' ],
            month: [ 'mes', 'meses' ],
            week: [ 'semana', 'semanas' ],
            day: [ 'día', 'días' ],
            hour: [ 'hora', 'horas' ],
            minute: [ 'minuto', 'minutos' ],

            past: function (vagueTime, unit) {
                return 'hace ' + vagueTime + ' ' + unit;
            },

            future: function (vagueTime, unit) {
                return 'en ' + vagueTime + ' ' + unit;
            },

            defaults: {
                past: 'recién',
                future: 'dentro de poco'
            }
        }
