import React from 'react';
import { Container, Icon, Sidebar, Menu } from 'semantic-ui-react';
import {PageRoute} from '../index'
import NavLogo from './NavLogo';
import renderMenuItems from './renderMenuItems';
import './NavSmall.css';

export default class NavSmall extends React.Component {
	state = {
		isLogin: !!this.props.token,
		sidebarVisible: false
	}
	componentWillReceiveProps(nextProps){
		this.setState({ isLogin: !!nextProps.token })
	}
	openSidebar = () => this.setState({ sidebarVisible: true })
	closeSidebar = () => this.setState({ sidebarVisible: false })
	toggleSidebar = () => this.setState({ sidebarVisible: !this.state.sidebarVisible })
	render(){
		let { sidebarVisible, isLogin } = this.state;
		return (
			<div className="nav-small-root">
				<Container className="nav-small-header">
					<NavLogo />
					<Icon circular name='content' onClick={this.toggleSidebar} />
				</Container>
				<Sidebar.Pushable>
		          <Sidebar
		            as={Menu}
		            animation='overlay'
		            width='thin'
		            direction='right'
		            visible={sidebarVisible}
		            icon='labeled'
		            vertical
		            inverted
		          >
		            {renderMenuItems(isLogin, null, this.closeSidebar)}
		          </Sidebar>
		          <Sidebar.Pusher>
		            <PageRoute 
		            	token={this.props.token} userInfo={this.props.userInfo}
		            	submitionStatus={this.props.submitionStatus} submitAccountInfo={this.props.submitAccountInfo} />
		          </Sidebar.Pusher>
		        </Sidebar.Pushable>
		    </div>
		)
	}
}
