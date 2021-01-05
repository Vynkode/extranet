import React from 'react';

const Navigation = ({ onRouteChange, isSignedIn, user }) => {
  if (isSignedIn) {
    return (
      <nav className='tl tc w-third pa2 white'>
        <span>{user.name}</span>
        <a onClick={() => onRouteChange('signout')} className='f4 link white pa3 pointer'>
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
