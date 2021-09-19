import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import LoadingProvider from './contexts/LoadingContext';
import PopupProvider from './contexts/PopupContext';

ReactDOM.render(
  <React.StrictMode>
    <LoadingProvider>
      <PopupProvider>
        <App />
      </PopupProvider>
    </LoadingProvider>
  </React.StrictMode>,
  document.getElementById('root')
);