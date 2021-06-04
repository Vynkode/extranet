import React, { Component } from 'react';
import Navigation from '../Navigation/Navigation';

import './Menu.css';

class Menu extends Component {
  constructor() {
    super();
  }
  render() {
    const { isSignedIn, user, onRouteChange, toggleModal } = this.props;
    if (isSignedIn) {
      return (
        <div className="menu-container">
          {/*<div className="tl tc w-third pa2">*/}
          {/*  <img alt="logo" width="340px" src={logo} />*/}
          {/*</div>*/}
          <Navigation
            isSignedIn={isSignedIn}
            user={user}
            onRouteChange={onRouteChange}
            toggleModal={toggleModal}
          />
        </div>
      );
    } else {
      return <></>;
    }
  }
}

export default Menu;
