		zh: {
			year: [ '年', '年' ],
				month: [ '个月', '个月' ],
				week: [ '周', '周' ],
				day: [ '天', '天' ],
				hour: [ '小时', '小时' ],
				minute: [ '分钟', '分钟' ],

				past: function (vagueTime, unit) {
				return vagueTime + ' ' + unit + ' 之前';
			},

			future: function (vagueTime, unit) {
				return 'in ' + vagueTime + ' ' + unit;
			},

			defaults: {
				past: '刚刚',
					future: '马上'
			}
		}