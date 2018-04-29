	import React from 'react';
	import {
		BrowserRouter
	} from 'react-router-dom';
	import {
		connect
	} from 'react-redux';

	import Footer from "./components/Footer";
	import Header from "./components/Header";
	import {
		Routes
	} from "./routes.js";

	require('./main.scss');
	require("./components/Components.scss");

	const App = (props) => (
		<BrowserRouter>
    <div id="wrapper">
      <Header token={props.account.token} currentPath={window.location.pathname.slice(1)} />
		  {Routes}
	  <Footer />
    </div>
  </BrowserRouter>
	)

	const mapStateToProps = state => ({ ...state
	})

	export default connect(mapStateToProps, null)(App);
