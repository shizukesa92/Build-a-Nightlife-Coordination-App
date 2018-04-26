import React from "react";
import {
	Route,
	Redirect,
	Switch
} from "react-router-dom";
import Gateway from "./modules/App/Gateway";
import Landing from "./modules/App/Landing";
import Poll from "./modules/Vote/Poll";
import PollNew from "./modules/Vote/PollNew";
import ProtectedRoute from "./modules/App/ProtectedRoute";

export default (
	<Switch>
                <Route exact path="/" component={Landing} />
                <Route exact path="/login" component={Gateway} />
                <Route exact path="/new_user" component={Gateway} />
                <Route exact path="/poll/:pollId/" component={Poll} />
                <ProtectedRoute
                  exact
                  path="/my_polls"
                  auth={this.props.auth}
                  component={Landing}
                />
                <ProtectedRoute
                  exact
                  path="/new_poll"
                  auth={this.props.auth}
                  component={PollNew}
                />
                <Redirect to="/" />
              </Switch>);
