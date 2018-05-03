import _ from 'lodash';
import * as types from '../actions/types';

export default function(state = {error: '', barSearchData: {}, userData: {}}, action) {
  switch(action.type) {
    case types.SEARCH_BARS:
      return {...state, error: '', barSearchData: action.payload.barSearchData, userData: _.mapKeys(action.payload.userData, 'id')}; // action.payload contains barSearchData and userData.
    case types.GET_USER_DATA:
      return {...state, error: '', userData: _.mapKeys(action.payload, 'id')}; // action.payload is the userData. We will maintain the barSearchData.
    case types.CLEAR_SEARCH:
      return {...state, error: '', barSearchData: {}, userData: {}};
    case types.DEAUTH_USER:
      return {...state, error: '', userData: {}}; // get rid of userData when user logs out.
    case types.ADD_BAR: {
      const newUserData = {...state.userData};
      return {...state, error: '', userData: Object.assign(newUserData, {[action.payload.id]: action.payload.updatedBar})};
    }
    case types.REMOVE_BAR: {
      const newUserData = {...state.userData};
      
      if (action.payload.updatedBar) { // if the removed bar still has users, we need to maintain it
        return {...state, error: '', userData: Object.assign(newUserData, {[action.payload.id]: action.payload.updatedBar})};
      }
      else {
        delete newUserData[action.payload.id];
        return {...state, error: '', userData: newUserData};
      }
    }
    case types.DATA_ERROR:
      return {...state, error: action.payload, barSearchData: {}, userData: {}};
    default:
      return state;
  }
}

