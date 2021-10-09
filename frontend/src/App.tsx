import { useContext, useEffect } from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import MainContent from './page/MainContent/MainContent';
import { Navbar } from './components/Navbar/Navbar';
import Popup from './components/Popup/Popup';
import { PopupContext } from './contexts/PopupContext';
import { LoadingContext } from './contexts/LoadingContext';
import Loading from './components/Loading/Loading';
import './App.scss';
import { AuthContext } from './contexts/AuthContext';

function App() {
  const { popup } = useContext(PopupContext);
  const { loading } = useContext(LoadingContext);
  const { setAuth } = useContext(AuthContext);

  useEffect(() => {
    if (localStorage.getItem("xauthorization")) setAuth(localStorage.getItem("xauthorization"));
  }, [setAuth]);

  return (
    <div className="App">
      {popup ? <Popup /> : null}
      {loading ? <Loading /> : null}
      <Navbar />
      <Router>
        <Switch>
          <Route path={'/'} exact component={MainContent} />
        </Switch>
      </Router>
    </div>
  );
}

export default App;
