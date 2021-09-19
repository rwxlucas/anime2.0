import { useState } from 'react';
import { BrowserRouter as Router, Switch, Route, Redirect } from 'react-router-dom';
import MainContent from './page/MainContent/MainContent';
import { Navbar } from './components/Navbar/Navbar';
import Popup from './components/Popup/Popup';
import PopupContext from './contexts/PopupContext';
import LoadingContext from './contexts/LoadingContext';
import Loading from './components/Loading/Loading';
import './App.scss';

function App() {
  const [auth, setAuth] = useState<boolean>(false);
  const [popup, setPopup] = useState<string>('');
  const [loading, setLoading] = useState<boolean>(false);

  return (
    <div className="App">
      <LoadingContext.Provider value={{ loading, setLoading }}>
        <PopupContext.Provider value={{ popup, setPopup }} >
          {popup ? <Popup /> : null}
          {loading ? <Loading /> : null}
          <Navbar />
          <Router>
            <Switch>
              <Route path={'/'} exact component={MainContent} />
            </Switch>
          </Router>
        </PopupContext.Provider>
      </LoadingContext.Provider>
    </div>
  );
}

export default App;
