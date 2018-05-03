import React, {Component} from 'react';
import {connect} from 'react-redux';
import {Link} from 'react-router-dom';

const height = 25;
const width = 45;

class Header extends Component {
  renderLinks() {
    if (this.props.authenticated) {
      // show a link to sign out
      return (
        <li className="nav-item">
          <Link className="nav-link" to="/signout">Sign Out</Link>
        </li>
      );
    }
    else {
      // show a link to sign in or sign up
      return [
        <li className="nav-item" key={1}>
          <Link className="nav-link" to="/signin">Sign In</Link>
        </li>,
        <li className="nav-item" key={2}>
          <Link className="nav-link" to="/signup">Sign Up</Link>
        </li>
      ];
    }
  }
  
  render() {
    return (
      <nav className="navbar navbar-light">
        <Link to="/" className="navbar-brand">Nightlife Coordination App</Link>
        <ul className="nav navbar-nav">
          {this.renderLinks()}
        </ul>
        <div style={{float: "right"}}>Powered by <img src='https://d1tbpd1hx2blcp.cloudfront.net/images/articles/updates/yelp-logo.png' alt='' height={height} width={width} /></div>
      </nav>
    );
  }
}

function mapStateToProps(state) {
  return {
    authenticated: state.auth.authenticated
  };
}

export default connect(mapStateToProps)(Header);

