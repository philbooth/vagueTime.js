{
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
}
