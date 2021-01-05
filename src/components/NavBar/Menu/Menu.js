import React, { Component } from 'react';
import logo from './logo.png';
import Navigation from '../Navigation/Navigation';

class Menu extends Component {
  constructor() {
    super();
    // this.state = {
    //   user: {
    //     name: 'Mariano García',
    //   },
    // };
  }
  render() {
    return (
      <div className='flex white' style={{ borderBottom: '1px solid rgba(211, 211, 211, 0.3)', height: '119px' }}>
        <div className='tl tc w-third pa2'>
          <p className='pt3'>EXTRANET REPARACIONES</p>
        </div>
        <div className='tl tc w-third pa2'>
          <img alt='logo' width='340px' src={logo} />
        </div>
        <Navigation isSignedIn={this.props.isSignedIn} user={this.props.user} onRouteChange={this.props.onRouteChange} />
      </div>
    );
  }
}

export default Menu;
