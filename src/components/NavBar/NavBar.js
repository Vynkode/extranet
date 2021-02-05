import React, { Component } from 'react';
import Menu from './Menu/Menu';
import TopBar from './TopBar/TopBar';

class NavBar extends Component {
  constructor() {
    super();
  }

  render() {
    console.log('Render: Navbar');
    return (
      <div>
        <TopBar />
        <Menu isSignedIn={this.props.isSignedIn} user={this.props.user} onRouteChange={this.props.onRouteChange} toggleModal={this.props.toggleModal} />
      </div>
    );
  }
}

export default NavBar;
