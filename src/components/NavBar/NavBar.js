import React, { Component } from 'react';
import Menu from './Menu/Menu';
import Navigation from './Navigation/Navigation';
import TopBar from './TopBar/TopBar';

class NavBar extends Component {
  constructor() {
    super();
  }

  render() {
    return (
      <nav>
        <TopBar />
        <Navigation
          isSignedIn={this.props.isSignedIn}
          user={this.props.user}
          onRouteChange={this.props.onRouteChange}
          toggleModal={this.props.toggleModal}
        />
      </nav>
    );
  }
}

export default NavBar;
