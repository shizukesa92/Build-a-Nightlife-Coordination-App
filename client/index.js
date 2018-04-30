import React from "react";
import ReactDOM from "react-dom";
import throttle from "lodash/throttle";
import App from "./App";
import {
	Provider
} from "react-redux";

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
	document.getElementById("root"));
