import React from 'react';
import { Link } from 'react-router-dom';
import { Menu } from 'semantic-ui-react'

const renderMenuItems = (isLogin, activeNav, handleNavClick) => {
  let items = isLogin 
    ? [
        {name: 'search', link: '/search', display: 'Bars & Clubs'}, 
        {name: 'about', link: '/about', display: 'About'}, 
        {name: 'user', link: '/user', display: 'My Activities'}, 
        {name: 'logout', link: '/logout', display: 'Log Out'}
      ] 
    : [
        {name: 'search', link: '/search', display: 'Bars & Clubs'}, 
        {name: 'about', link: '/about', display: 'About'}, 
        {name: 'login', link: '/login', display: 'Log In'}, 
        {name: 'signup', link: '/signup', display: 'Sign Up'}
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

export default renderMenuItems;