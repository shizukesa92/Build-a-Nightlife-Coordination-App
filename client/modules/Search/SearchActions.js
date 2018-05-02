export const searchRequest = (city, sortBy) => ({
	type: 'SEARCH_REQUEST',
	city,
	sortBy
})

export const searchSuccess = searchList => ({
	type: 'SEARCH_SUCCESS',
	searchList
})

export const searchFailure = error => ({
	type: 'SEARCH_FAILURE',
	error
})

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
export const getSearchList = (location, sortBy) => (
	fetch('/api/nightlife', {
		method: 'post',
		body: JSON.stringify({
			location,
			sortBy
		}),
		headers: {
			'Accept': 'application/json',
			'Content-Type': 'application/json'
		}
	}).then(res => res.json())
)
export const fetchSearchList = (city, sortBy) => {
	return dispatch => {
		dispatch(searchRequest(city, sortBy));
		getSearchList(city, sortBy)
			.then(searchResult => {
				if (searchResult.error) {
					dispatch(searchFailure(searchResult.error.description));
				} else {
					dispatch(searchSuccess(searchResult.businesses));
				}
			})
	}
}
