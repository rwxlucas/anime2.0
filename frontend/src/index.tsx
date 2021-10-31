import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import LoadingProvider from './contexts/LoadingContext';
import PopupProvider from './contexts/PopupContext';
import AuthProvider from './contexts/AuthContext';
import UserProvider from './contexts/UserContext';

ReactDOM.render(
  <React.StrictMode>
    <AuthProvider>
      <UserProvider>
        <LoadingProvider>
          <PopupProvider>
            <App />
          </PopupProvider>
        </LoadingProvider>
      </UserProvider>
    </AuthProvider>
  </React.StrictMode>,
  document.getElementById('root')
);