import React from "react";
import {
	Button
} from "react-bootstrap";

export const RegisterSuccess = ({
	username,
	login
}) => {
	return (
		<div>
      <div className="row">
          <h4>Success!</h4>
      </div>
      <div className="row">
          <p>
            You are now registered as user <b>{username}</b>.
          </p>
      </div>

      <div className="row">
          <Button bsStyle = "link" onClick={login}>
            Continue to Site
          </Button>
      </div>
    </div>
	);
};
