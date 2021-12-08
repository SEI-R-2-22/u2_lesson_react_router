import React from 'react';
import ReactDOM from 'react-dom';
import './styles/index.css';
import App from './App';
// import BrowserRouter with { destructuring } here

ReactDOM.render(
  <React.StrictMode>
    // Wrap our App component in BrowserRouter
      <App />
    // Wrap our App component in BrowserRouter
  </React.StrictMode>,
  document.getElementById('root')
);


