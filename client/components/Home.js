import React from 'react';
import {
	Link
} from 'react-router-dom';
import {
	Button
} from 'semantic-ui-react';
import './Home.css';

const Home = () => (
	<div className="home-root">
		<h5 className="font-weight-300">Find bars & clubs near you</h5>
		<Button inverted color='teal' as={Link} to='/search'>Start a search!</Button>
	</div>
)

export default Home;
