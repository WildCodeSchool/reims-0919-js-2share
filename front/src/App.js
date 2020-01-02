import React from 'react';
import FamilyDirectory from './components/family-directory/FamilyDirectory.component';
import './App.css';
import ButtonRedirectory from './components/family-button/ButtonRedirectory.component';
import { Route, Switch } from "react-router-dom";
import { BrowserRouter } from "react-router-dom";
import Home from './components/Home';
import Event from './components/Events/Event';

function App() {
  return (
    <div>
        <BrowserRouter>
          <header className='header_style_theme'>
            <img src='logo_toshare_blue.png' alt='logo-toshare'/>
          </header>
          <Switch>
            <Route exact path="/" component={ButtonRedirectory} />
            <Route path="/home" component={Home} />
            <Route path="/family-directory" component={FamilyDirectory} />
            <Route path="/event" component={Event} />
          </Switch>
          <footer className='footer_style_theme'>
            <p>Icones</p>
          </footer>
        </BrowserRouter> 
    </div>
  );
}

export default App;