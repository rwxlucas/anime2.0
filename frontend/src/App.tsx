import { useContext, useEffect } from 'react';
import { BrowserRouter as Router, Switch, Route, Redirect } from 'react-router-dom';
import MainContent from './page/MainContent/MainContent';
import { Navbar } from './components/Navbar/Navbar';
import Popup from './components/Popup/Popup';
import { PopupContext } from './contexts/PopupContext';
import { LoadingContext } from './contexts/LoadingContext';
import Loading from './components/Loading/Loading';
import { AuthContext } from './contexts/AuthContext';
import Account from './page/Account/Account';
import { verifyAuthorization } from './services/authService';

import './App.scss';
import { UserContext } from './contexts/UserContext';
function App() {
  const { popup } = useContext(PopupContext);
  const { loading } = useContext(LoadingContext);
  const { setAuth, auth } = useContext(AuthContext);
  const { setUser } = useContext(UserContext);

  useEffect(() => {
    if (localStorage.getItem("xauthorization")) setAuth(localStorage.getItem("xauthorization"));
    if (auth) {
      verifyAuthorization(auth).then((response) => {
        if (response.status !== 200) {
          setAuth('');
        } else {
          const { data: { data } } = response;
          setUser(data);
        }
      }).catch(() => {
        setAuth('');
      });
    };
  }, [auth, setAuth, setUser]);

  return (
    <div className={`App ${popup ? 'popupHandler' : ''}`}  >
      {popup ? <Popup /> : null}
      {loading ? <Loading /> : null}
      <Router>
        <Navbar />
        <Switch>
          <Route path={'/'} exact component={MainContent} />
          <Route path={'/account'} component={() => {
            if (auth) return <Account />
            return <Redirect to={'/'} />
          }} />
        </Switch>
      </Router>
    </div>
  );
}

export default App;
