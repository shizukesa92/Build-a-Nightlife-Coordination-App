import axios from 'axios';
import _ from 'lodash';
import * as types from './types';

const ROOT_URL = process.env.REACT_APP_appUrl || 'http://localhost:3090';

export function signinUser({email, password}, history) {
  // redux-thunk allows us to return a function from our action creator
  return function(dispatch) {
    // Submit email/password to the server
    axios.post(`${ROOT_URL}/signin`, {email, password})
      .then(response => {
        // If request is good...
        
        // - Update state to indicate user is authenticated
        dispatch({type: types.AUTH_USER});
        
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


export function signupUser({email, password}, history) {
  // redux-thunk allows us to return a function from our action creator
  return function(dispatch) {
    axios.post(`${ROOT_URL}/signup`, {email, password})
      .then(response => {
        dispatch({type: types.AUTH_USER});
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
    type: types.AUTH_ERROR,
    payload: error
  };
}


export function signoutUser() {
  localStorage.removeItem('token');
  
  return {
    type: types.DEAUTH_USER
  };
}


export function clearError() {
  return {
    type: types.CLEAR_ERROR
  };
}


export function searchBars(location) {
  return function(dispatch) {
    axios.get(`${ROOT_URL}/search-bars`, {
      headers: {authorization: localStorage.getItem('token')}, // if this token is blank, then request is unauthenticated
      params: {location}
    })
      .then(response => {
        dispatch({
          type: types.SEARCH_BARS,
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
      headers: {authorization: localStorage.getItem('token')}, // if this token is blank, then request is unauthenticated
      params: {yelpIdString}
    })
      .then(response => {
        dispatch({
          type: types.GET_USER_DATA,
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
    type: types.CLEAR_SEARCH
  };
}


export function addBar({id, index}, history, authenticated) {
  if (!authenticated) {
    // if not logged in, then redirect to the route '/signin'
    history.push('/signin');
    return {type: types.REDIRECT_LOGIN};
  }
  
  return function(dispatch) {
    axios.post(`${ROOT_URL}/add-bar`, {id, index}, {
      headers: {authorization: localStorage.getItem('token')}
    })
      .then(response => {
        dispatch({
          type: types.ADD_BAR,
          payload: {updatedBar: response.data.updatedBar, id}
        });
      })
      .catch(error => {
        dispatch(authError(error.message));
      });
  }
}


export function removeBar({id, index}, history, authenticated) {
  if (!authenticated) {
    // if not logged in, then redirect to the route '/signin'
    history.push('/signin');
    return {type: types.REDIRECT_LOGIN};
  }
  
  return function(dispatch) {
    axios.post(`${ROOT_URL}/remove-bar`, {id, index}, {
      headers: {authorization: localStorage.getItem('token')}
    })
      .then(response => {
        dispatch({
          type: types.REMOVE_BAR,
          payload: {updatedBar: response.data.updatedBar, id, index}
        });
      })
      .catch(error => {
        dispatch(authError(error.message));
      });
  }
}


export function dataError(error) {
  return {
    type: types.DATA_ERROR,
    payload: error
  };
}


