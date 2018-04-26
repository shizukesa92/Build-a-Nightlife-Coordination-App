import React from "react";
import {
	Button
} from "react-bootstrap";

export const LoginFailure = ({
	back,
	fail
}) => {
	return (
		<div>
      <div>
          <p>
            {fail
              ? "Username or Password is Invalid."
              : "Username is taken."}
          </p>
          <p>
            {fail
              ? "Please try again."
              : "Please chose a different username."}
          </p>
      </div>
      <div>
          <Button bsStyle = "link" onClick={back}>
            Done
          </Button>
      </div>
    </div>
	);
};
