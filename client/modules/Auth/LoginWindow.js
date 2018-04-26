import React, {
	Component
} from "react";
import {
	connect
} from "react-redux";
import axios from "axios";
import {
	withRouter
} from "react-router";

import {
	LoginFailure
} from "./LoginFailure";
import {
	RegisterSuccess
} from "./RegisterSuccess";
import LoginForm from "./LoginForm";
import * as actions from "../Vote/VoteActions";


class LoginWindow extends Component {

	constructor(props) {
		super(props);
		this.state = {
			loginFailure: false,
			newuserFailure: false,
			newuserSuccess: false,
			username: "",
			password: "",
			passwordConfirm: "",
			passwordsMatch: true,
			usernameEntered: true,
			passwordEntered: true
		};
	}
	renderContent() {
		if (this.state.loginFailure || this.state.newuserFailure)
			return (
				<LoginFailure
          goBack={this.backFromAuthFailure}
          loginFailure={this.state.loginFailure}
        />
			);
		else if (this.state.newuserSuccess)
			return (
				<RegisterSuccess
          login={this.loginSubmitForm}
          username={this.state.username}
        />
			);
		else
			return (
				<LoginForm
          pathname={this.props.location.pathname}
          username={this.state.username}
          password={this.state.password}
          passwordConfirm={this.state.passwordConfirm}
          handleUsernameChange={this.handleUsernameChange}
          handlePasswordChange={this.handlePasswordChange}
          handlePasswordConfirmChange={this.handlePasswordConfirmChange}
          loginSubmitForm={this.loginSubmitForm}
          registerSubmitForm={this.registerSubmitForm}
          usernameEntered={this.state.usernameEntered}
          passwordEntered={this.state.passwordEntered}
          passwordsMatch={this.state.passwordsMatch}
          closeGateway={this.props.closeGateway}
        />
			);
	}

	handleUsernameChange = event => {
		this.setState({
			username: event.target.value
		});
	};

	handlePasswordChange = event => {
		this.setState({
			password: event.target.value
		});
	};

	handlePasswordConfirmChange = event => {
		this.setState({
			passwordConfirm: event.target.value
		});
	};

	loginSubmitForm = () => {
		axios
			.post("/api/login", {
				username: this.state.username,
				password: this.state.password
			})
			.then(res => {
				this.props
					.fetchUser()
					.then(() => this.props.history.push(this.props.redirectOnSuccess));
			})
			.catch(err =>
				this.setState({
					loginFailure: true,
					username: "",
					password: ""
				})
			);
	};

	registerSubmitForm = () => {
		if (this.state.password !== this.state.passwordConfirm)
			this.setState({
				passwordsMatch: false,
				password: "",
				passwordConfirm: ""
			});
		else this.setState({
			passwordsMatch: true
		});
		if (this.state.username === "") this.setState({
			usernameEntered: false
		});
		else this.setState({
			usernameEntered: true
		});
		if (this.state.password === "") this.setState({
			passwordEntered: false
		});
		else this.setState({
			passwordEntered: true
		});

		if (
			this.state.password === this.state.passwordConfirm &&
			this.state.username !== "" &&
			this.state.password !== ""
		) {
			axios
				.post("/api/create_user", {
					username: this.state.username,
					password: this.state.password
				})
				.then(res => {
					if (res.data === "New User Registered")
						this.setState({
							newuserSuccess: true
						});
					else {
						this.setState({
							newuserFailure: true
						});
					}
				})
				.catch(err => window.alert("Error: " + err));
		}
	};

	backFromAuthFailure() {
		this.setState({
			loginFailure: false,
			newuserFailure: false,
			username: "",
			password: "",
			passwordConfirm: ""
		});
	};

	render() {
		return (
			<div id = "loginwindow">
        <div>
          {this.renderContent()}
        </div>
      </div>
		);
	}
}

export default connect(null, actions)(withRouter(LoginWindow));
