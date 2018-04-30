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
} from "./modules/Search/Search";
import {
	Activities
} from "./modules/Activities/Activities";
import {
	Account
} from "./modules/Account/Account";

export const Routes = (props) => (
	<div id = "content">
    <Switch>
      <Route exact path="/" component={Home} />
      <Route path="/search" component={Search} />
      <Route path="/user" component={Activities} />
      <Route path="/:actionType(signup|login|logout)" component={Account} />
    </Switch>
  </div>
)
