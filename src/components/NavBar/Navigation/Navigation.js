import React, { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import './Navigation.css';
import Dropdown from './Dropdown/Dropdown';
import ModalUser from '../../Modals/User/ModalUser';

const Navigation = ({ onRouteChange, isSignedIn, user }) => {
  const [showModalUser, setShowModelUser] = useState(false);
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
    setDropdown(!dropdown);
  };

  if (isSignedIn && !user.firstTime) {
    return (
      <div className="navigation">
        {showModalUser ? (
          <>
            <div
              onClick={() => setShowModelUser(false)}
              className="back-drop"
            />
            <ModalUser setShowModalUser={setShowModelUser} user={user} />
          </>
        ) : (
          <></>
        )}
        <div
          onMouseEnter={onMouseEnter}
          onMouseLeave={onMouseLeave}
          onClick={onMouseClick}
          className="navigation-user"
        >
          <FontAwesomeIcon className="user-icon" icon="user" />
          <div className="user-name">{user.name}</div>
          {dropdown && (
            <Dropdown
              onRouteChange={onRouteChange}
              closeDropdown={closeDropdown}
              setShowModalUser={setShowModelUser}
            />
          )}
        </div>
      </div>
    );
  } else {
    return <></>;
  }
};

export default Navigation;
