import {
	store
} from '../../store';



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
export const toggleRsvp = (id, info) => ({
	type: 'TOGGLE_RSVP',
	id,
	info
})
export const toggleAndUpdateRsvp = (id, info) => {
	return dispatch => {
		dispatch(toggleRsvp(id, info));

		let state = store.getState();
		let {
			username,
			rsvps
		} = state.account.userInfo;
		let token = state.account.token;
		updateRsvps(username, token, rsvps);
	}
}
