import * as types from '../actions/types';

export default function(state = {}, action) {
  switch(action.type) {
    case types.AUTH_USER:
      return {...state, authenticated: true};
    case types.DEAUTH_USER:
      return {...state, authenticated: false};
    case types.AUTH_ERROR:
      return {...state, error: action.payload};
    case types.CLEAR_ERROR:
      return {...state, error: ''};
    default:
      return state;
  }
}

