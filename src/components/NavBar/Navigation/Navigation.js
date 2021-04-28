import React, { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import './Navigation.css';
import Dropdown from './Dropdown/Dropdown';
// import Modal from '../../Modal/Modal';

const Navigation = ({ onRouteChange, isSignedIn, user, toggleModal }) => {
  const [dropdown, setDropdown] = useState(false);

  const onMouseEnter = () => {
    if (window.innerWidth < 960) {
      setDropdown(false);
    } else {
      setDropdown(true);
    }
  };

  const closeDropdown = () => setDropdown(false);

  const onMouseLeave = () => {
    if (window.innerWidth < 960) {
      setDropdown(false);
    } else {
      setDropdown(false);
    }
  };

  const onMouseClick = () => {
    if (window.innerWidth < 960) {
      setDropdown(false);
    } else {
      setDropdown(true);
    }
  };

  if (isSignedIn && !user.firstTime) {
    return (
      <nav
        onMouseEnter={onMouseEnter}
        onMouseLeave={onMouseLeave}
        className="w-third pa2 white user"
      >
        <div className="user-name">{user.name}</div>
        <FontAwesomeIcon className="user-icon" icon="user" />
        {dropdown && (
          <Dropdown
            onRouteChange={onRouteChange}
            closeDropdown={closeDropdown}
            toggleModal={toggleModal}
          />
        )}
      </nav>
    );
  } else {
    return (
      <nav className="tl tc w-third pa2">
        <p onClick={() => onRouteChange('signin')}>
          <a
            className="f4 link dim white pointer"
            style={{ float: 'right', marginTop: '1rem', marginRight: '9rem' }}
          ></a>
        </p>
        {/* <p onClick={() => onRouteChange('register')} className='f3 link dim white pa3 pointer'>Register</p> */}
      </nav>
    );
  }
};

export default Navigation;
