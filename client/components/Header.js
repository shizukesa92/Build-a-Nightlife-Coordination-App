import React, {
	Component
} from 'react';

import {
	Link
} from 'react-router-dom';
import {
	connect
} from "react-redux";

export default class Header extends Component {
	renderLinks() {
		if (this.props.authenticated) {
			return (
				<li className="nav-item">
          <Link className="nav-link" to="/signout">Sign Out</Link>
        </li>
			);
		} else {
			return [
				<li className="nav-item" key={1}>
          <Link className="nav-link" to="/signin">Sign In</Link>
        </li>,
				<li className="nav-item" key={2}>
          <Link className="nav-link" to="/signup">Sign Up</Link>
        </li>
			];
		}
	}
	render() {
		return (
			<div id="header">
				<span id = "left" className = "text-center"><a href = "/">Build a Nightlife Coordination App</a></span>
				{this.renderLinks()}	

        </div>
		);
	}
}
