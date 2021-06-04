import React, { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

const Tabs = props => {
  // console.log('Render: Tabs');
  // console.log(props);
  const [activeTabIndex, setActiveTabIndex] = useState(0);
  const activeTab = props.children[activeTabIndex];
  // console.log(activeTab);
  return (
    <div>
      <div className="tabs">
        {props.children.map((tab, i) => (
          <a
            className={`tab-btn ${activeTabIndex === i ? 'active' : ''} ${
              props.icons[i] === 'receipt' && props.budget === 'No'
                ? 'disabled'
                : ''
            }`}
            onClick={() => {
              setActiveTabIndex(i);
            }}
            key={i}
          >
            <FontAwesomeIcon icon={['fas', `${props.icons[i]}`]} />
          </a>
        ))}
      </div>
      <div className="tab-indicator-container">
        <div
          className="tab-indicator"
          style={{
            height: 100 / props.children.length + '%',
            transform: `translateY(${activeTabIndex * 100}%)`,
          }}
        />
      </div>
      <div className="tab-content">{activeTab.props.children}</div>
    </div>
  );
};

export default React.memo(Tabs);
