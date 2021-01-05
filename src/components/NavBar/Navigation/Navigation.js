import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import './Navigation.css';

const Navigation = ({ onRouteChange, isSignedIn, user }) => {
  if (isSignedIn) {
    return (
      <nav className='tl tc w-third pa2 white user'>
        <div className='user-name'>{user.name}</div>
        <FontAwesomeIcon className='user-icon' icon='user' />
        <a onClick={() => onRouteChange('signout')} className='f5 link white pa3 pointer'>
          Salir
        </a>
      </nav>
    );
  } else {
    return (
      <nav className='tl tc w-third pa2'>
        <p onClick={() => onRouteChange('signin')}>
          <a className='f4 link dim white pointer' style={{ float: 'right', marginTop: '1rem', marginRight: '9rem' }}></a>
        </p>
        {/* <p onClick={() => onRouteChange('register')} className='f3 link dim white pa3 pointer'>Register</p> */}
      </nav>
    );
  }
};

export default Navigation;
