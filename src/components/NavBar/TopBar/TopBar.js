import React, { Component } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import logo from '../../../assets/img/logo.png';
import './TopBar.css';

class TopBar extends Component {
  shouldComponentUpdate(nextProps, nextState) {
    return false;
  }

  render() {
    return (
      <div className="topbar">
        <div className="socials">
          <FontAwesomeIcon
            className="social-icon"
            icon={['fab', 'facebook-square']}
          />
          <FontAwesomeIcon
            className="social-icon"
            icon={['fab', 'instagram']}
          />
        </div>
        <div>EXTRANET REPARACIONES</div>
        <div>
          <img id="header-logo" src={logo} alt="Logo MGVWatch" />
        </div>
        <div className="header-text">
          SERVICIOS A PROFESIONALES<br></br> Y PARTICULARES
        </div>
      </div>
    );
  }
}

export default TopBar;
