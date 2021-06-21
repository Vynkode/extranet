import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import './MailtoButton.css';

const MailtoButton = ({ repair }) => (
  <a
    href={`mailto:info@mgvwatch.com?subject=Consulta%20Reparación%20${repair}`}
    className="mailto-icon"
  >
    <FontAwesomeIcon icon="envelope" />
  </a>
);

export default MailtoButton;
