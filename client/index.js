import React from "react";
import ReactDOM from "react-dom";
import {
	Provider
} from "react-redux";
import {
	createStore,
	applyMiddleware
} from "redux";
import reduxThunk from "redux-thunk";
import axios from "axios";

import App from "./app";
import {
	store
} from "./store";

require("babel-polyfill");

window.axios = axios;

ReactDOM.render(
	<Provider store={store}>
	<App />
	 </Provider>,
	document.getElementById("root")
);
