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
        }
