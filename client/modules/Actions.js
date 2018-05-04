import axios from 'axios';
import _ from 'lodash';
export const AUTH_USER = 'auth_user';
export const DEAUTH_USER = 'deauth_user';
export const AUTH_ERROR = 'auth_error';
export const CLEAR_ERROR = 'clear_error';
export const SEARCH_BARS = 'search_bars';
export const GET_USER_DATA = 'get_user_data';
export const CLEAR_SEARCH = 'clear_search';
export const ADD_BAR = 'add_bar';
export const REMOVE_BAR = 'remove_bar';
export const DATA_ERROR = 'data_error';
export const REDIRECT_LOGIN = 'redirect_login';


const ROOT_URL = 'http://127.0.0.1:3000';

export function signinUser({
	email,
	password
}, history) {
	// redux-thunk allows us to return a function from our action creator
	return function(dispatch) {
		// Submit email/password to the server
		axios.post(`${ROOT_URL}/signin`, {
				email,
				password
			})
			.then(response => {
				// If request is good...

				// - Update state to indicate user is authenticated
				dispatch({
					type: AUTH_USER
				});

				// - Save the JWT token
				localStorage.setItem('token', response.data.token);

				// - redirect to the route '/'
				history.push('/');
			})
			.catch(() => {
				// If request is bad...
				// - Show an error to the user
				dispatch(authError('Bad Login Info'));
			});
	}
}


export function signupUser({
	email,
	password
}, history) {
	// redux-thunk allows us to return a function from our action creator
	return function(dispatch) {
		axios.post(`${ROOT_URL}/signup`, {
				email,
				password
			})
			.then(response => {
				dispatch({
					type: AUTH_USER
				});
				localStorage.setItem('token', response.data.token);
				history.push('/');
			})
			.catch(error => {
				dispatch(authError(error.message));
			});
	}
}


export function authError(error) {
	return {
		type: AUTH_ERROR,
		payload: error
	};
}


export function signoutUser() {
	localStorage.removeItem('token');

	return {
		type: DEAUTH_USER
	};
}


export function clearError() {
	return {
		type: CLEAR_ERROR
	};
}


export function searchBars(location) {
	return function(dispatch) {
		axios.get(`${ROOT_URL}/search-bars`, {
				headers: {
					authorization: localStorage.getItem('token')
				}, // if this token is blank, then request is unauthenticated
				params: {
					location
				}
			})
			.then(response => {
				dispatch({
					type: SEARCH_BARS,
					payload: _.pick(response.data, ['barSearchData', 'userData'])
				});
			})
			.catch(error => {
				dispatch(dataError(error.message));
			})
	}
}


export function getUserData(yelpIdString) {
	return function(dispatch) {
		axios.get(`${ROOT_URL}/bars-user-data`, {
				headers: {
					authorization: localStorage.getItem('token')
				}, // if this token is blank, then request is unauthenticated
				params: {
					yelpIdString
				}
			})
			.then(response => {
				dispatch({
					type: GET_USER_DATA,
					payload: response.data.userData
				});
			})
			.catch(error => {
				dispatch(authError(error.message));
			});
	}
}

export function clearSearch() {
	return {
		type: CLEAR_SEARCH
	};
}


export function addBar({
	id,
	index
}, history, authenticated) {
	if (!authenticated) {
		// if not logged in, then redirect to the route '/signin'
		history.push('/signin');
		return {
			type: REDIRECT_LOGIN
		};
	}

	return function(dispatch) {
		axios.post(`${ROOT_URL}/add-bar`, {
				id,
				index
			}, {
				headers: {
					authorization: localStorage.getItem('token')
				}
			})
			.then(response => {
				dispatch({
					type: ADD_BAR,
					payload: {
						updatedBar: response.data.updatedBar,
						id
					}
				});
			})
			.catch(error => {
				dispatch(authError(error.message));
			});
	}
}


export function removeBar({
	id,
	index
}, history, authenticated) {
	if (!authenticated) {
		// if not logged in, then redirect to the route '/signin'
		history.push('/signin');
		return {
			type: REDIRECT_LOGIN
		};
	}

	return function(dispatch) {
		axios.post(`${ROOT_URL}/remove-bar`, {
				id,
				index
			}, {
				headers: {
					authorization: localStorage.getItem('token')
				}
			})
			.then(response => {
				dispatch({
					type: REMOVE_BAR,
					payload: {
						updatedBar: response.data.updatedBar,
						id,
						index
					}
				});
			})
			.catch(error => {
				dispatch(authError(error.message));
			});
	}
}


export function dataError(error) {
	return {
		type: DATA_ERROR,
		payload: error
	};
}
