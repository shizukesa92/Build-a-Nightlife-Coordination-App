	import React from 'react';
	import {
		BrowserRouter as Router
	} from 'react-router-dom';
	import {
		connect
	} from 'react-redux';
	import {
		NavNormal,
		NavSmall,
		PageRoute,
		BgDecor
	} from './components';
	import './App.css';

	const AppRoot = (props) => (
		<Router>
    <div className="app-root">
      <NavNormal token={props.account.token} currentPath={window.location.pathname.slice(1)} />
      <NavSmall token={props.account.token} />
      <div className="normal-size-content">
        <PageRoute />
      </div>
      <BgDecor /> 
    </div>
  </Router>
	)

	const mapStateToProps = state => ({ ...state
	})

	const App = connect(mapStateToProps, null)(AppRoot);

	export default App;
