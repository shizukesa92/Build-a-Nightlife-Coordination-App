export const parseTime = (timeStr) => {
	let timeObj = new Date(timeStr);
	return `${timeObj.getUTCFullYear()}/${timeObj.getMonth() + 1}/${timeObj.getDate()}`;
}

export const formatSearchList = (searchList, rsvps = []) => {
	let todayStr = parseTime(String(new Date()));
	let rsvpIdList = rsvps
		.filter(rsvp => rsvp.date === todayStr)
		.map(rsvp => rsvp.id);
	let searchListDisplay = searchList.map(item => {
		if (rsvpIdList.includes(item.id)) {
			item.rsvp = true;
		} else {
			item.rsvp = false;
		}
		return item
	})
	return searchListDisplay;
}
