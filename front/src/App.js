import React from "react";
import LoginForm from "./components/Loginform/LoginForm";
import RegisterForm from "./components/RegisterForm/RegisterForm";
import "./styles/common.css";
import "./styles/layout.css";
import "./styles/space.css";
import "./styles/color.css";
import { Link, Redirect, Route, Switch, withRouter } from "react-router-dom";
import { connect } from "react-redux";
import Event from "./components/Events/Event";
import Todos from "./components/TodoList/Todos";
import FamilyList from "./components/FamilyList";
import Family from "./components/Family";
import NavBar from "./components/NavBar";


const mapStateToProps = state => ({
  token: state.token
});

const h2 = (text) => (
  <h2 className="flex-self:stretch space:inset space:stack title" style={{backgroundColor: 'var(--primary-color)', background: 'linear-gradient(var(--primary-color), 10%, var(--secondary-color))', color: 'var(--primary-text-color)'}}>{text}</h2>
)

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {

      families: []
    };
    this.createFamily = this.createFamily.bind(this);
    this.getFamilies = this.getFamilies.bind(this);
  }

  getFamilies() {
    fetch("http://localhost:8000/families", {
      headers: {
        "Authorization": this.props.token,
        "Content-Type": "application/json"
      }
    })
      .then(response => response.json())
      .then(data => this.setState({ families: data }))
      .then(() => this.props.history.push("/families"));
  }
  createFamily(name) {
    fetch("http://localhost:8000/families", {
      method: "post",
      headers: {
        "Authorization": this.props.token,
        "Content-Type": "application/json"
      },
      body: JSON.stringify({ name })
    })
      .then(response => response.json())
      .then(data =>
        this.setState(prevState => ({
          families: [...prevState.families, data]
        }))
      );
  }

  render() {
    return (
      <main className="space:reset height:viewport-100 flex:column">
        <Switch>
          <Route exact path="/">
            <Redirect to="/families" />
          </Route>

          <Route
            exact
            path="/login"
            render={props => (
              <>
                {h2('2Share')}
                <LoginForm {...props} getFamilies={this.getFamilies} />
                <Link className="space:inset text:center" to="/register">pas encore de compte ?</Link>
              </>
            )}
          ></Route>
          <Route exact path="/register">
            {h2('2Share')}
            <RegisterForm />
            <Link className="space:inset text:center" to="/login">se connecter</Link>
          </Route>
          <Route exact path="/logout">
            <Redirect to="/" />
          </Route>

          <Route path="/">
            {this.props.token ? (
              <Switch>
                <Route path="/families">
                  <div className="flex:1 overflow:auto">
                    <Route
                      exact
                      path="/families"
                      render={() => (
                        <FamilyList
                          families={this.state.families}
                          createFamily={this.createFamily}
                          getFamilies={this.getFamilies}
                        />
                      )}
                    />
                    <Route
                      exact
                      path="/families/:id"
                      render={props => <Family {...props} />}
                    />
                  </div>
                </Route>

                <Route path="/">
                  <select className="space-size:s space:inset title">
                    <option value="0">voir tout</option>
                    {React.Children.toArray(
                      this.state.families.map(family => (
                        <option value={family.id}>famille {family.name}</option>
                      ))
                    )}
                  </select>

                  <Route exact path="/events" component={Event}>
                    <div className="flex:1 overflow:auto">
                      <Event />
                    </div>
                  </Route>

                  <Route exact path="/todos" component={Todos}>
                    <div className="flex:1 overflow:auto">
                      <Todos />
                    </div>
                  </Route>
                </Route>
              </Switch>
            ) : (
              <Redirect to="/login" />
            )}

            <NavBar />
          </Route>
        </Switch>
      </main>
    );
  }
}

export default withRouter(connect(mapStateToProps)(App));
