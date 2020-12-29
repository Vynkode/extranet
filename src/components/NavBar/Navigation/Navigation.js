import React from 'react';

const Navigation = ({ onRouteChange, isSignedIn }) => {
  if (isSignedIn) {
    return (
      <nav className='tl tc w-third pa2 white'>
        <p onClick={() => onRouteChange('signout')} className='f4 link white pa3 pointer'>
          Sign Out
        </p>
      </nav>
    );
  } else {
    return (
      <nav className='tl tc w-third pa2'>
        <p onClick={() => onRouteChange('signin')}>
          <a className='f4 link dim white pointer' style={{ float: 'right', marginTop: '1rem', marginRight: '9rem' }}>
            Sign In
          </a>
        </p>
        {/* <p onClick={() => onRouteChange('register')} className='f3 link dim white pa3 pointer'>Register</p> */}
      </nav>
    );
  }
};

export default Navigation;
