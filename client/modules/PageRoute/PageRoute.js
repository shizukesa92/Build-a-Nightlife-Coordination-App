import React from 'react';
import {Route, Switch} from 'react-router-dom';
import {Home, About, SearchContainer, MyActivitiesContainer, AccountContainer, PageNotFound} from '../index';
import './PageRoute.css';

const PageRoute = (props) => (
  <div className="content-root">
    <Switch>
      <Route exact path="/" component={Home} />
      <Route path="/about" component={About} />
      <Route path="/search" component={SearchContainer} />
      <Route path="/user" component={MyActivitiesContainer} />
      <Route path="/:actionType(signup|login|logout)" component={AccountContainer} />
      <Route component={PageNotFound} />
    </Switch>
  </div>
) 

export default PageRoute;
