import React from "react";
//import FamilyDirectory from "./components/family-directory/FamilyDirectory.component";
//import "./App.css";
//import { Route, Switch } from "react-router-dom";
import {
  BrowserRouter,
  Link,
  Redirect,
  Route,
} from "react-router-dom";
//import Event from './components/Events/Event';
//import LoginForm from './components/Loginform/LoginForm';
//import Todos from './components/TodoList/Todos';
//import Documents from './components/Documents/Documents';
//import HomePage from './components/HomePage/HomePage';
//import RegisterForm from './components/RegisterForm/RegisterForm';
import FamilyList from './components/FamilyList'
import NavBar from './components/NavBar'
import './styles/common.css'
import './styles/layout.css'
import './styles/space.css'

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      /*isLoggedIn: true,
      email: "",
      password: "",
      isAuthData: false*/
      token: null,
    };
  }

  /*handleLogoutClick() {
    this.setState({ isLoggedIn: false });
  }*/

  /*isUserExist() {
    this.setState({ isAuthData: true });
  }*/

  render() {
    return (
      <main className="space:reset height:viewport-100 flex:column">
        <BrowserRouter>

          <Route exact path="/">
            <Redirect to="/families" />
          </Route>

          <Route exact path="/login">
            <p>hello from /login</p>
            <Link to="/register">s'enregistrer</Link>
          </Route>
          <Route exact path="/register">
            <p>hello from /register</p>
            <Link to="/login">se connecter</Link>
          </Route>
          <Route exact path="/logout">
            <Redirect to="/" />
          </Route>

          <Route exact path="/events">
            <p className="flex:1">hello from /events</p>
            <NavBar />
          </Route>
          <Route exact path="/families">
            <div className="flex:1">
              <FamilyList />
            </div>
            <NavBar />
          </Route>
          <Route exact path="/families/:id">
            <p className="flex:1">hello from /families/:id</p>
            <NavBar />
          </Route>
          <Route exact path="/todos">
            <p className="flex:1">hello from /todos</p>
            <NavBar />
          </Route>

        </BrowserRouter>
      </main>
    )
    /*return (
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
    );*/
  }
}

export default App;
