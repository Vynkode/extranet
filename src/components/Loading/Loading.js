import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import './Loading.css';

const Loading = () => {
  // console.log('Render: Loading');
  return (
    <div className="loading-container">
      <FontAwesomeIcon
        icon={('fas', 'spinner')}
        color="rgba(159, 48, 48, 0.9)"
        size="3x"
        pulse
      />
      <h5>Cargando Reparaciones</h5>
    </div>
  );
};

export default Loading;
