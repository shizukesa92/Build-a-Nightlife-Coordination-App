import React from "react";
import {
	Route,
	Redirect
} from "react-router-dom";

export const Protected = ({
component: Component,
auth,
...rest
}) => (
<Route
{...rest}
render={props =>
		auth ? ( 
	<Component {...props} />
): (
<Redirect
	  to={{
		pathname: "/login",
		state: { from: props.location }
	  }}
	/>
)
}
/>
);
