import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import LoadingProvider from './contexts/LoadingContext';
import PopupProvider from './contexts/PopupContext';
import AuthProvider from './contexts/AuthContext';

ReactDOM.render(
  <React.StrictMode>
    <AuthProvider>
      <LoadingProvider>
        <PopupProvider>
          <App />
        </PopupProvider>
      </LoadingProvider>
    </AuthProvider>
  </React.StrictMode>,
  document.getElementById('root')
);