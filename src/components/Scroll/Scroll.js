import React from 'react';

const Scroll = (props) => {
  // console.log('Render: Scroll');
  return <div style={{ overflowY: 'scroll', height: '80vh', width: '100%' }}>{props.children}</div>;
};

export default Scroll;
