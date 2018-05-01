import {
	store
} from '../../store';
import {
	getSearchList
} from "../Search/SearchActions";
import {
	updateRsvps
} from '../Activities/ActivityActions';

export const changeActionType = () => ({
	type: 'CHANGE_ACTION_TYPE'
})

export const accountRequest = ({
	username,
	password,
	actionType
}) => ({
	type: 'ACCOUNT_REQUEST',
	username,
	password,
	actionType
})

export const accountRequestSuccess = ({
	userInfo,
	token,
	actionType
}) => ({
	type: 'ACCOUNT_REQUEST_SUCCESS',
	userInfo,
	token,
	actionType
})

export const accountRequestFailure = ({
	errorMsg,
	actionType
}) => ({
	type: 'ACCOUNT_REQUEST_FAILURE',
	errorMsg,
	actionType
})

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
