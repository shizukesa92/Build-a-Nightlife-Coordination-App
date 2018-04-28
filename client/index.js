import React from 'react';
import ReactDOM from 'react-dom';
import throttle from 'lodash/throttle';
import 'semantic-ui-css/semantic.min.css';
import './index.css';
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
} from './assets/reducer';


let persistentState = {
	account: undefined,
	search: undefined
};
if (localStorage.cityNightAccount) {
	persistentState = {
		account: JSON.parse(localStorage.cityNightAccount),
		search: undefined
	};
}

export const store = createStore(reducer, persistentState, applyMiddleware(thunkMiddleware));

store.subscribe(throttle(() => {
	localStorage.cityNightAccount = JSON.stringify(store.getState().account);
}, 1000))

ReactDOM.render(
	<Provider store={store}>
		<App />
	</Provider>,
	document.getElementById('root'));
