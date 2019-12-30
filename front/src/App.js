import React from 'react';
import FamilyDirectory from './components/family-directory/FamilyDirectory.component';
import './App.css';
import ButtonRedirectory from './components/family-button/ButtonRedirectory.component';
import { Route, Switch } from "react-router-dom";
import { BrowserRouter } from "react-router-dom";
import Home from './components/Home';
import Event from './components/Events/Event';

class App extends React.Component {
  constructor(){
    super();
    this.state = {
      isLoggedIn : true,
      email: '',
      password : '',
      isAuthData : false,
    }
  }

  handleLogoutClick() {
    this.setState({isLoggedIn : false});
  }

  isUserExist (){
    this.setState({isAuthData : true})
  }
  //{this.state.isLoggedIn ? <LogoutControl handleLogoutClick={this.handleLogoutClick}/> : <LoginForm />}
  render(){
    return (
      <div>
          <BrowserRouter>
            <header className='header_style_theme'>
              <img src='logo_toshare_blue.png' alt='logo-toshare'/>
            </header>
            <Switch>
              <Route exact path="/" component={LoginForm} />
              <Route path="/family-directory" component={()=>this.props.isUserExist ? <FamilyDirectory/> : <LoginForm /> } />
              <Route path="/event" component={Event} />
            </Switch>
            <footer className='footer_style_theme'>
              <p>Icones Footer</p>
            </footer>
          </BrowserRouter> 
      </div>
    );
  }
}

export default App;