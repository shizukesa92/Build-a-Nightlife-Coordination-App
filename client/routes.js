import React from 'react';
import {
	Route,
	Switch
} from 'react-router-dom';
import {
	Home
} from "./components/Home";
import {
	Search
} from "./modules/Search/Search.js";
import {
	Activities
} from "./modules/Activities/MyActivities";
import {
	Account
} from "./modules/Account/Account.js";

export const Routes = (props) => (
	<div id = "content">
    <Switch>
      <Route exact path="/" component={Home} />
      <Route path="/search" component={Search} />
      <Route path="/user" component={MyActivities} />
      <Route path="/:actionType(signup|login|logout)" component={Account} />
    </Switch>
  </div>
)
