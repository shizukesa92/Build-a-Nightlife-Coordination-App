import React from 'react';
import {Link} from 'react-router-dom';
import {Button} from 'semantic-ui-react';
import './PageNotFound.css';

const PageNotFound = () => (
	<div className="home-root">
		<h1>404: Page not found</h1>
		<h5 className="font-weight-100">Find bars & clubs near you</h5>
		<h5 className="font-weight-100">Start by searching for your neighbourhood/area</h5>
		<Button inverted color='teal' as={Link} to='/search'>Start from here!</Button>
	</div>
)

export default PageNotFound;