import React from 'react';
import ReactDOM from 'react-dom';
import throttle from 'lodash/throttle';
import './main.css';
import App from './App';
import {
	createStore,
	applyMiddleware
} from 'redux';
import {
	Provider
} from 'react-redux';
import thunkMiddleware from 'redux-thunk';
import {
	reducer
} from './reducers';
import {
	store
} from "./store";

store.subscribe(throttle(() => {
	localStorage.cityNightAccount = JSON.stringify(store.getState().account);
}, 1000))

ReactDOM.render(
	<Provider store={store}>
		<App />
	</Provider>,
	document.getElementById('root'));
