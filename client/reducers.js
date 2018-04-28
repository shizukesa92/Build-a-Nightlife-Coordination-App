import {
	combineReducers
} from 'redux';
import {
	parseTime
} from './helper';

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

const account = (state = initialState.account, action) => {
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
				// remove rsvp
				userInfo.rsvps = [...userInfo.rsvps.slice(0, index), ...userInfo.rsvps.slice(index + 1)];
			} else {
				// add rsvp
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

const search = (state = initialState.search, action) => {
	switch (action.type) {
		case 'SEARCH_REQUEST':
			return {
				...state,
				city: action.city,
				sortBy: action.sortBy,
				loading: true
			};
		case 'SEARCH_SUCCESS':
			return {
				...state,
				searchList: action.searchList,
				error: '',
				loading: false
			};
		case 'SEARCH_FAILURE':
			return {
				...state,
				error: action.error,
				searchList: [],
				loading: false
			};
		default:
			return state;
	}
}

export const reducer = combineReducers({
	account,
	search
});
