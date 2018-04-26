import {
	combineReducers
} from "redux";
import {
	reducer as reduxForm
} from "redux-form";

import {
	FETCH_USER,
	LOG_IN,
	FETCH_POLLS,
	SHOW_VOTES
} from "./modules/Vote/VoteActions";

const authReducer = (state = null, action) => {
	switch (action.type) {
		case FETCH_USER:
			return action.payload || false;
		default:
			return state;
	}
};

const gatewayReducer = (state = "", action) => {
	switch (action.type) {
		case LOG_IN:
			return action.type;
		default:
			return state;
	}
};

const pollsReducer = (state = [], action) => {
	switch (action.type) {
		case FETCH_POLLS:
			return action.payload;
		default:
			return state;
	}
};


const showVotesReducer = (state = false, action) => {
	switch (action.type) {
		case SHOW_VOTES:
			return action.show;
		default:
			return state;
	}
};

export default combineReducers({
	auth: authReducer,
	polls: pollsReducer,
	gateway: gatewayReducer,
	form: reduxForm,
	showVoteOptions: showVotesReducer
});
