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
