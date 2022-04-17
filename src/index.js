import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';

if (process.env.NODE_ENV === 'production') {
  console.debug = () => { }
}

ReactDOM.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
  document.getElementById('root')
);