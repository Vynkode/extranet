import React, { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import './Dropdown.css';

const Dropdown = ({ onRouteChange, closeDropdown, setShowModalUser }) => {
  const [open, setOpen] = useState(false);

  const handleOpen = () => setOpen(!open);

  return (
    <ul
      onClick={handleOpen}
      className={open ? 'dropdown-menu clicked' : 'dropdown-menu'}
    >
      <li
        className="dropdown-link user-data"
        onClick={() => {
          closeDropdown();
          setShowModalUser(true);
        }}
      >
        Mis datos
        <FontAwesomeIcon className="user-icon" icon={['fas', 'id-card']} />
      </li>
      <li
        className="dropdown-link signout"
        onClick={() => {
          onRouteChange('signout');
          closeDropdown();
          localStorage.removeItem('token');
        }}
      >
        Salir
        <FontAwesomeIcon className="user-icon" icon="sign-out-alt" />
      </li>
    </ul>
  );
};

export default Dropdown;
