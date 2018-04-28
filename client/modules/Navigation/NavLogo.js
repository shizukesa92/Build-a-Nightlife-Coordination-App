import React from 'react';
import { Link } from 'react-router-dom';
import { Header, Image } from 'semantic-ui-react';
import './NavLogo.css';

const NavLogo = ({handleNavClick}) => (
  <Header className="nav-logo" as={Link} to='/' inverted >
    <Image className="nav-logo-image" src='./images/logo_theme.png' onClick={handleNavClick} />
    <h1 className="nav-logo-title" onClick={handleNavClick}>[ City Night ]</h1>
  </Header>
)

export default NavLogo;
