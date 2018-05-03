import React from "react";
import {
	Route,
	Switch
} from "react-router-dom";

import Signin from './modules/Auth/signin';
import Signout from './modules/Auth/signout';
import Signup from './modules/Auth/signup';
import Main from './modules/App/Main';
export default class Routes extends React.Component {

	render() {
		return (

			<Switch>
          <Route path="/signin" component={Signin} />
          <Route path="/signout" component={Signout} />
          <Route path="/signup" component={Signup} />
          <Route path="/" component={Main} />
	  </Switch>);

	}
}
