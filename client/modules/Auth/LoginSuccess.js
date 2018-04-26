import React, {
	Component
} from "react";
import {
	withRouter
} from "react-router-dom";
import LoginWindow from './LoginWindow';

class LoginSuccess extends Component {

	constructor(props) {
		super(props);
		this.state = {
			redirectOnSuccess: typeof this.props.location.state !== "undefined" ?
				this.props.location.state.from.pathname : "/my_polls"
		};
	}

	closeGateway() {
		this.props.history.goBack();
	};

	render() {
		return (
			<div id = "login">
        <div id="grey" onClick={this.closeGateway} />
		<LoginWindow
          redirectOnSuccess={this.state.redirectOnSuccess}
          closeGateway={this.closeGateway}
		/>
      </div>
		);
	}
}

export default withRouter(LoginSuccess);
