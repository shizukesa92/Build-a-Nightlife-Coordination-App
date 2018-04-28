export const getSearchList = (location, sortBy) => (
	fetch('/nightlife', {
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

export const updateRsvps = (username, token, rsvps) => (
	fetch('/rsvps', {
		method: 'put',
		body: JSON.stringify({
			username,
			rsvps
		}),
		headers: {
			'Accept': 'application/json',
			'Content-Type': 'application/json',
			'x-access-token': token
		}
	}).then(res => res.json())
)

export const sendAccountRequest = ({
	username,
	password,
	actionType
}) => (
	fetch('/account', {
		method: 'post',
		body: JSON.stringify({
			username,
			password,
			actionType
		}),
		headers: {
			'Accept': 'application/json',
			'Content-Type': 'application/json'
		}
	}).then(res => res.json())
)
