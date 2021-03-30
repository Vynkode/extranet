import React from 'react';

const Scroll = (props) => {
  // console.log('Render: Scroll');
  return <section style={{ overflowY: 'scroll', height: '80vh', width: '100%' }}>{props.children}</section>;
};

export default Scroll;
