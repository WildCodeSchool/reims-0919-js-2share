import React from 'react';
import FamilyDirectory from './components/family-directory/FamilyDirectory.component';
import './App.css';
import ButtonRedirectory from './components/family-button/ButtonRedirectory.component';
import { Route, Switch } from "react-router-dom";
import { BrowserRouter } from "react-router-dom";
import Home from './components/Home';


function App() {
  return (
    <div className="App">
        <BrowserRouter>
          <Switch>
            <Route exact path="/" exact component={ButtonRedirectory} />
            <Route path="/home" component={Home} />
            <Route path="/family-directory" component={FamilyDirectory} />
          </Switch>
        </BrowserRouter>
    </div>
  );
}

export default App;
