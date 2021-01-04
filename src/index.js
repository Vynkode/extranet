import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './containers/App';
import register from './registerServiceWorker';
import 'tachyons';

ReactDOM.render(<App />, document.getElementById('root'));
register();
