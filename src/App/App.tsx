import React from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';

import { Header } from '../components/Header';
import './App.scss';
import { CharacterPageContainer } from '../pages/CharacterPage/index';

function App() {
  return (
    <>
      <Router>
        <Header />
        <Switch>
          <Route exact path="/" component={CharacterPageContainer} />
        </Switch>
      </Router>
    </>
  );
}

export default App;
