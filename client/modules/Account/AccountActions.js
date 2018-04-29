// account actions
export const changeActionType = () => ({
	type: 'CHANGE_ACTION_TYPE'
})

const accountRequest = ({
	username,
	password,
	actionType
}) => ({
	type: 'ACCOUNT_REQUEST',
	username,
	password,
	actionType
})

const accountRequestSuccess = ({
	userInfo,
	token,
	actionType
}) => ({
	type: 'ACCOUNT_REQUEST_SUCCESS',
	userInfo,
	token,
	actionType
})

const accountRequestFailure = ({
	errorMsg,
	actionType
}) => ({
	type: 'ACCOUNT_REQUEST_FAILURE',
	errorMsg,
	actionType
})

export const submitAccountRequest = ({
	username,
	password,
	actionType
}) => {
	return dispatch => {
		dispatch(accountRequest({
			username,
			password,
			actionType
		}));
		sendAccountRequest({
				username,
				password,
				actionType
			})
			.then(accountResp => {
				if (accountResp.error) {
					dispatch(accountRequestFailure({
						errorMsg: accountResp.error,
						actionType
					}));
				} else {
					let {
						userInfo,
						token
					} = accountResp;
					userInfo = userInfo || {};
					token = token || '';
					dispatch(accountRequestSuccess({
						userInfo,
						token,
						actionType
					}));
				}
			})
	}
}

// update rsvps
const toggleRsvp = (id, info) => ({
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

export const submitAccountRequest = ({
	username,
	password,
	actionType
}) => {
	return dispatch => {
		dispatch(accountRequest({
			username,
			password,
			actionType
		}));
		sendAccountRequest({
				username,
				password,
				actionType
			})
			.then(accountResp => {
				if (accountResp.error) {
					dispatch(accountRequestFailure({
						errorMsg: accountResp.error,
						actionType
					}));
				} else {
					let {
						userInfo,
						token
					} = accountResp;
					userInfo = userInfo || {};
					token = token || '';
					dispatch(accountRequestSuccess({
						userInfo,
						token,
						actionType
					}));
				}
			})
	}
}

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
