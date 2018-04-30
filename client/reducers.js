import {
	combineReducers
} from 'redux';

import {
	account
} from "./modules/Account/AccountReducer";
import {
	search
} from "./modules/Search/SearchReducer";

export const reducers = combineReducers({
	account,
	search
});
