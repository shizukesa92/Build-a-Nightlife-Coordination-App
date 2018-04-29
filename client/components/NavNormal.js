import React from 'react';
import { Menu } from 'semantic-ui-react';
import NavLogo from './NavLogo';
import renderMenuItems from './renderMenuItems';
import Footer from './Footer';
import './NavNormal.css';

class NavNormal extends React.Component {
  state = { 
    activeNav: this.props.currentPath,
    isLogin: !!this.props.token
  }
  componentWillReceiveProps(nextProps){
    this.setState({ isLogin: !!nextProps.token })
  }
  handleNavClick = (e, navProps) => {
    let name = navProps ? navProps.name : '';
    this.setState({ activeNav: name })
  }
  render() {
    const { activeNav, isLogin } = this.state
    return (
      <div className="nav-normal-root">
        <NavLogo handleNavClick={this.handleNavClick} />
        <Menu pointing secondary vertical inverted>
          {renderMenuItems(isLogin, activeNav, this.handleNavClick)}
        </Menu>
        <Footer />
      </div>
    )
  }
}

export default NavNormal;
