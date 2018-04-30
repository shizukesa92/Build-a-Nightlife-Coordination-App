import {
	createStore,
	applyMiddleware
} from "redux";
import thunkMiddleware from "redux-thunk";

import {
	reducers
} from "./reducers";

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
export const store = createStore(reducers, persistentState, applyMiddleware(thunkMiddleware));
