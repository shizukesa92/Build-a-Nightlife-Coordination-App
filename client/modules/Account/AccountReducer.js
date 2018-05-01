import {
	changeActionType,
	accountRequestSuccess,
	accountRequestFailure,
	accountRequest
} from "./AccountActions";
import {
	toggleRsvp
} from "../Activities/ActivityActions";
import {
	parseTime
} from "../Search/SearchActions";
let initialState = {
	account: {
		userInput: {
			username: '',
			password: ''
		},
		userInfo: {
			username: '',
			rsvps: []
		},
		errorMsg: '',
		token: '',
		actionType: '',
		submitionStatus: '',
		loading: false
	},
	search: {
		city: '',
		sortBy: 'rating',
		searchList: [],
		error: '',
		loading: false
	}
};


export const account = (state = initialState.account, action) => {
	switch (action.type) {
		case 'CHANGE_ACTION_TYPE':
			return {
				...state,
				errorMsg: '',
				submitionStatus: ''
			}
		case 'ACCOUNT_REQUEST':
			return {
				...state,
				userInput: {
					username: action.username,
					password: action.password
				},
				userInfo: {},
				token: '',
				errorMsg: '',
				actionType: action.actionType,
				submitionStatus: '',
				loading: true
			};
		case 'ACCOUNT_REQUEST_SUCCESS':
			return {
				...state,
				userInput: {
					username: '',
					password: ''
				},
				userInfo: action.userInfo,
				token: action.token,
				submitionStatus: action.actionType === 'logout' ? '' : 'success',
				loading: false
			};
		case 'ACCOUNT_REQUEST_FAILURE':
			return {
				...state,
				errorMsg: action.errorMsg,
				actionType: action.actionType,
				submitionStatus: 'error',
				loading: false
			};
		case 'TOGGLE_RSVP':
			let userInfo = { ...state.userInfo
			};
			let todayStr = parseTime(String(new Date()));
			let id = action.id;
			let info = action.info;
			let index = userInfo.rsvps.findIndex(rsvp => rsvp.id === id && rsvp.date === todayStr);
			if (index !== -1) {
				userInfo.rsvps = [...userInfo.rsvps.slice(0, index), ...userInfo.rsvps.slice(index + 1)];
			} else {
				let newRsvp = {
					date: todayStr,
					id,
					info
				};
				userInfo.rsvps = [newRsvp, ...userInfo.rsvps];
			}
			return {
				...state,
				userInfo
			};
		default:
			return state;
	}
}
