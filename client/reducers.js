import {
	combineReducers
} from 'redux';
import {
	reducer as formReducer
} from 'redux-form';
import authReducer from './modules/Auth/AuthReducer';
import dataReducer from './modules/DataReducer';

const rootReducer = combineReducers({
	form: formReducer, // reducer from redux form
	auth: authReducer, // reducer from './auth_reducer'
	data: dataReducer // reducer from './data_reducer'
});

export default rootReducer;
