import React from 'react';
import ReactDOM from 'react-dom';
import {
	Provider
} from 'react-redux';
import {
	createStore,
	applyMiddleware
} from 'redux';

import reduxThunk from 'redux-thunk';

import App from './App';

import reducers from './reducers';
import {
	AUTH_USER
} from './modules/Actions';


const createStoreWithMiddleware = applyMiddleware(reduxThunk)(createStore);
const store = createStoreWithMiddleware(reducers);

const token = localStorage.getItem('token');
if (token) {
	store.dispatch({
		type: AUTH_USER
	});
}


ReactDOM.render(
	<Provider store={store}>
    	<App />
  </Provider>, document.getElementById("root"));
