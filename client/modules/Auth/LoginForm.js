import React, {
	Component
} from "react";
import {
	Button,
	ButtonToolbar
} from "react-bootstrap";

export default class LoginForm extends Component {
	returnTitle() {
		return this.props.pathname === "/login" ? "Login" : "Register";
	}

	returnInstructions() {
		return this.props.pathname === "/login" ?
			"Please enter your Username and Password." :
			"Please enter a new Username and Password.";
	}

	returnPasswordConfirm() {
		return this.props.pathname === "/login" ? (
			<div />
		) : (
			<div id = "confirmation">
        <label htmlFor="password">Confirm Password</label>  <input
            id="passwordConfirm"
            type="password"
            value={this.props.passwordConfirm}
            onChange={this.props.handlePasswordConfirmChange}
          />
          
          {this.returnPasswordConfirmFailure()}
      </div>
		);
	}

	returnPasswordConfirmFailure() {
		if (!this.props.passwordEntered)
			return <span>{"Please enter a password."}</span>;
		if (!this.props.passwordsMatch)
			return (
				<span>
          {"The passwords don't match. Please retype your password."}
        </span>
			);
		return;
	}

	returnUsernameEmpty() {
		return this.props.usernameEntered ? (
			<span />
		) : (
			<span>{"Please enter a username."}</span>
		);
	}

	render() {
		return (
			<div id = "loginform">
        <div id = "title">
            <h4>{this.returnTitle()}</h4>
        </div>
        <div id = "instructions">
            <p>{this.returnInstructions()}</p>
        </div>
        <div id = "form">
          <form>
            <div className="username">
               <label htmlFor="username">Username</label> <input
                  id="username"
                  type="text"
                  value={this.props.username}
                  onChange={this.props.handleUsernameChange}
                />
                
                {this.returnUsernameEmpty()}
            </div>
            <div id = "password">
                <label htmlFor="password">Password</label> <input
                  id="password"
                  type="password"
                  value={this.props.password}
                  onChange={this.props.handlePasswordChange}
                />
               
            </div>
            {this.returnPasswordConfirm()}
          </form>
        </div>
		<div id ="submission">
			<ButtonToolbar>
           <Button bsStyle = "link" onClick={this.props.closeGateway}>
              Cancel
            </Button>
           <Button bsStyle = "link"
              onClick={
                this.props.pathname === "/login"
                  ? this.props.loginSubmitForm
                  : this.props.registerSubmitForm
              }
            >
              Submit
		  </Button>
	  </ButtonToolbar>
        </div>
      </div>
		);
	}
}
