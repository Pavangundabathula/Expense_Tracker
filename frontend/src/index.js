import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import BalanceContextProvider from './context/BalanceContext';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <BalanceContextProvider>
      <App />
    </BalanceContextProvider>
  </React.StrictMode>
);

