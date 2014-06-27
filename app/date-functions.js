module.exports = function () {
	this.formatDotw = function (dayInt) {
		switch (dayInt) {
			case 0:
				return 'Sun';
			case 1:
				return 'Mon';
			case 2:
				return 'Tue';
			case 3:
				return 'Wed';
			case 4:
				return 'Thu';
			case 5:
				return 'Fri';
			case 6:
				return 'Sat';
		}
	};


	this.formatDate = function (dateId) {
		var newDate = new Date(dateId);
		var today = new Date();

		if (today.getDate() === newDate.getDate()) {
			return 'Today';
		}

		var dateString = this.formatDotw(newDate.getDay());
		dateString += ' - ' + (newDate.getMonth() + 1);
		dateString += '/' + newDate.getDate();

		return dateString;
	};

	this.defaultInputDate = function () {
		var todayDefault = new Date();
		var defaultYear = todayDefault.getFullYear();
		var defaultMonth = todayDefault.getMonth() + 1;
		defaultMonth = defaultMonth.toString();
		if (defaultMonth.length < 2) {
			defaultMonth = '0' + defaultMonth;
		}
		var defaultDay = todayDefault.getDate();
		return defaultYear + '-' + defaultMonth + '-' + defaultDay;
	};
};