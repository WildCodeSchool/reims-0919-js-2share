import React from "react";
import FamilyDirectory from "./components/family-directory/FamilyDirectory.component";
import "./App.css";
import { Route, Switch } from "react-router-dom";
import { BrowserRouter } from "react-router-dom";
import Event from './components/Events/Event';
import LoginForm from './components/Loginform/LoginForm';
import Todos from './components/TodoList/Todos';
import Documents from './components/Documents/Documents';
import HomePage from './components/HomePage/HomePage';
import RegisterForm from './components/RegisterForm/RegisterForm';

class App extends React.Component {
  constructor() {
    super();
    this.state = {
      isLoggedIn: true,
      email: "",
      password: "",
      isAuthData: false
    };
  }

  handleLogoutClick() {
    this.setState({ isLoggedIn: false });
  }

  isUserExist() {
    this.setState({ isAuthData: true });
  }

  render() {
    return (
      <div>
          <BrowserRouter>
            <header className='header_style_theme'>
              <img src='logo_toshare_blue.png' alt='logo-toshare'/>

            </header>
            <Switch>
              <Route exact path="/" component={HomePage}/>
              <Route path="/loginform" component={LoginForm} />
              <Route path="/family-directory" component={FamilyDirectory} />
              <Route path="/event" component={Event} />
              <Route path="/documents" component={Documents} />
              <Route path="/registerform" component={RegisterForm} />
            </Switch>
          </BrowserRouter> 
      </div>
    );
  }
}

export default App;
