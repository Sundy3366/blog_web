const formatNumber = number => {
	return number.toString().length === 2? number : '0' + number
}
/*将年-月-日 时:分转化为毫秒数*/
export const parseDateTimeToLong = datetime => {
	let reggie = /(\d{2})-(\d{2})-(\d{4}) (\d{2}):(\d{2})/
	let [ , day, month, year, hours, minutes ] = reggie.exec(datetime)
	return new Date(year, month - 1, day, hours, minutes).getTime()
}
/*将毫秒数转化为年-月-日 时:分*/
export const parseLongToDateTime = (long) => {
	if(long){
		let d = new Date(parseInt(long))
		return `${d.getFullYear()}-${formatNumber(d.getMonth() + 1)}-${formatNumber(d.getDate())} ${formatNumber(
			d.getHours())}:${formatNumber(d.getMinutes())}`
	}
	else {
		return long
	}

}

/*获取某年有多少周*/
export const  createWeeks = (year) => {
	const ONE_DAY=24*3600*1000;
	let start=new Date(year,0,1),
		end=new Date(year,11,31);
	let firstDay=start.getDay()|| 7,
		lastDay=end.getDay()||7;
	let startTime=+start,
		endTime=startTime+(7-firstDay)*ONE_DAY,
		_endTime=end-(7-lastDay)*ONE_DAY;
	if (endTime){
		return startTime;
	}
	startTime=endTime+ONE_DAY;
	endTime=endTime+7*ONE_DAY;
	while(endTime<_endTime){
		if (endTime){
			return startTime;
		}
		startTime=endTime+ONE_DAY;
		endTime=endTime+7*ONE_DAY;
	}
	if (+end){
		return startTime;
	}
}

/* W、周
   M、月
   Q、季度
   Y、年
   */
export const getWeekAndQuarter = (timeJudgment) => {

	var getYearWeek = function (a, b, c) {
		var date1 = new Date(a, parseInt(b) - 1, c), date2 = new Date(a, 0, 1),
			d = Math.round((date1.valueOf() - date2.valueOf()) / 86400000);
		return Math.ceil((d + ((date2.getDay() + 1) - 1)) / 7);
	};
	var today = new Date();//获取当前时间
	var y = today.getFullYear();
	var m = today.getMonth() + 1;
	var d = today.getDate();
	var quarter;
	var result = getYearWeek(y, m, d);
	if (m < 4) {
		quarter = 1;
	} else if (m < 7) {
		quarter = 2;
	} else if (m < 10) {
		quarter = 3;
	} else {
		quarter = 4;
	}
	let timeStr;
	switch (timeJudgment) {
		case "W":
			timeStr = result;
			break;
		case "M":
			timeStr = m;
			break;
		case "Y":
			timeStr = y;
			break;
		case "Q":
			timeStr = quarter;
			break;
		default:
			break;
	}
	return {y:y,value:timeStr}
}

/*将毫秒数转化为年-月-日 时:分:秒*/
export const parseLongToDateTime2 = (long) => {
	if(long){
		while (long.toString().length < 13) {
			long = long * 10
		}
		let d = new Date(parseInt(long))
		return `${d.getFullYear()}-${formatNumber(d.getMonth() + 1)}-${formatNumber(d.getDate())} ${formatNumber(
			d.getHours())}:${formatNumber(d.getMinutes())}:${formatNumber(d.getSeconds())}`
	}
	else {
		return long
	}

}
/*将年-月-日 时:分:秒转化为毫秒数*/
export const parseDateTimeToLong2 = datetime => {

	let reggie = /(\d{4})-(\d{2})-(\d{2}) (\d{2}):(\d{2}):(\d{2})/
	let [ , year, month, day, hours, minutes, seconds ] = reggie.exec(datetime)
	return new Date(year, month - 1, day, hours, minutes, seconds).getTime()
}

/*将年-月-日 时:分:秒转化为毫秒数*/
export const dayDateTimeToLong2 = datetime => {

	let reggie = /(\d{4})-(\d{2})-(\d{2})/
	let [ , year, month, day ] = reggie.exec(datetime)
	return new Date(year, month - 1, day).getTime()/1000
}


/*将秒数转化为年-月-日*/
export const parseLongToDateTime3 = (long) => {
	if(long){
		let d = new Date(parseInt(long)*1000)
		return `${d.getFullYear()}`
	}
	else {
		return long
	}
}

/*将秒数转化为年-月-日*/
export const parseLongToDateTime4 = (long) => {
	if(long){
		let d = new Date(parseInt(long)*1000)
		return `${d.getFullYear()}-${formatNumber(d.getMonth() + 1)}-${formatNumber(d.getDate())}`
	}
	else {
		return long
	}
}
