import React from 'react';
import {
	Menu
} from 'semantic-ui-react';
import {
	Link
} from 'react-router-dom';

export default class Header extends React.Component {
	state = {
		activeNav: this.props.currentPath,
		isLogin: !!this.props.token
	}
	componentWillReceiveProps(nextProps) {
		this.setState({
			isLogin: !!nextProps.token
		})
	}
	handleNavClick(e, navProps) {
		let name = navProps ? navProps.name : '';
		this.setState({
			activeNav: name
		})
	}

	renderMenuItems(isLogin, activeNav, handleNavClick) {
		let items = isLogin ? [{
				name: 'search',
				link: '/search',
				display: 'Bars & Clubs'
			},
			{
				name: 'user',
				link: '/user',
				display: 'My Activities'
			},
			{
				name: 'logout',
				link: '/logout',
				display: 'Log Out'
			}
		] : [{
				name: 'search',
				link: '/search',
				display: 'Bars & Clubs'
			},
			{
				name: 'login',
				link: '/login',
				display: 'Log In'
			},
			{
				name: 'signup',
				link: '/signup',
				display: 'Sign Up'
			}
		];

		return items.map(item => (
			<Menu.Item
      key={item.name}
      name={item.name} 
      active={activeNav === item.name} 
      as={Link}
      to={item.link}
      onClick={handleNavClick}
    >
      <h3 className="font-weight-400">{item.display}</h3>
    </Menu.Item>
		));
	}

	render() {
		const {
			activeNav,
			isLogin
		} = this.state
		return (
			<div id="header">
				<span id = "left" className = "text-center"><a href = "/">Build a Nightlife Coordination App</a></span>
				<Menu >
          {this.renderMenuItems(isLogin, activeNav, this.handleNavClick)}
        </Menu> 
        </div>


		)
	}
}
