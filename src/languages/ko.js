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
  		}