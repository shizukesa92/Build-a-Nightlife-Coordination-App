import React, {
	Component
} from 'react';
import {
	Button,
	ButtonToolbar
} from "react-bootstrap";
import {
	Link
} from 'react-router-dom';
import {
	connect
} from "react-redux";

class Header extends Component {
	buttons() {
		return this.props.auth ?
			(
				<ButtonToolbar> 
			<Button bsStyle = "link"><Link to="/new_poll">Create</Link></Button> 
			<Button bsStyle = "link"><Link to="/my_polls">New</Link></Button>
			<Button bsStyle = "link"><Link to="/">All</Link></Button> 
			<Button bsStyle = "link" href = "/api/logout">Log-out</Button>
		</ButtonToolbar>
			) :
			(
				<ButtonToolbar> {/* To preserve space between buttons https://react-bootstrap.github.io/components/buttons/ */}
			<Button bsStyle = "link"><Link to="/login">Log-in</Link></Button> 
			<Button bsStyle = "link"><Link to="/new_user">Sign-up</Link></Button>
		</ButtonToolbar>

			);
	}
	render() {
		return (
			<div id="header">
				<span id = "left" className = "text-center"><a href = "/">Build a Voting App</a></span>
				{this.buttons()}	
        </div>
		);
	}
}

const mapStateToProps = ({
	auth
}) => {
	return {
		auth
	}
}

export default connect(mapStateToProps)(Header);
