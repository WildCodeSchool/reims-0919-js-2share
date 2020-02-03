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
import cogoToast from "cogo-toast";
import { forgetToken } from "./redux/reducer";

const mapStateToProps = state => ({
  token: state.token
});

const mapDispatchToProps = dispatch => ({
  forgetToken: () => dispatch(forgetToken())
});

const h2 = image => (
  <h2
    className="flex-self:stretch text:center space:stack title"
    style={{
      backgroundColor: "var(--primary-color)",
      background:
        "linear-gradient(var(--primary-color), 10%, var(--secondary-color))",
      color: "var(--primary-text-color)"
    }}
  >
    {image}
  </h2>
);

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      families: []
    };
    this.createFamily = this.createFamily.bind(this);
    this.getFamilies = this.getFamilies.bind(this);
  }

  // optionSelector = (e) => {
  //   if(e.target.value === 0 || e.target.value === undefined || e.target.value === null) {
  //    console.log("Im 0")
  //   } else {
  //     fetch(`http://localhost:8000/events?filter=${e.target.value}`)
  //   }
  // }

  getFamilies() {
    fetch("http://localhost:8000/families", {
      headers: {
        Authorization: this.props.token,
        "Content-Type": "application/json"
      }
    })
      .then(response => response.json())
      .then(data => this.setState({ families: data }))
      .then(() => this.props.history.push("/families"));
  }
  createFamily(name) {
    if (name === undefined || name === null || name === "") {
      cogoToast.warn("Veuillez entrer un nom de Famille");
    } else {
      fetch("http://localhost:8000/families", {
        method: "post",
        headers: {
          Authorization: this.props.token,
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
                {h2(
                  <img
                    src="logo_toshare_white.png"
                    height="70px"
                    width="200px"
                    alt="logo"
                  />
                )}
                <LoginForm {...props} getFamilies={this.getFamilies} />
                <Link className="space:inset text:center" to="/register">
                  Pas encore de compte ?
                </Link>
              </>
            )}
          ></Route>
          <Route exact path="/register">
            {h2(
              <img
                src="logo_toshare_white.png"
                height="70px"
                width="200px"
                alt="logo"
              />
            )}
            <RegisterForm />
            <Link className="space:inset text:center" to="/login">
              Se connecter
            </Link>
          </Route>
          <Route exact path="/logout" render={() => {
            this.props.forgetToken();
            return (
              <Redirect to="/" />
            );
          }}>
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
                  <select
                    className="space-size:s space:inset title"
                    onChange={this.optionSelector}
                  >
                    <option value="0">voir tout</option>
                    {React.Children.toArray(
                      this.state.families.map((family, index) => (
                        index === 0 ?
                        <option value={family.id} selected>Famille {family.name}</option> :
                        <option value={family.id}>Famille {family.name}</option>
                      ))
                    )}
                  </select>

                  <Route exact path="/events">
                    <div className="flex:1 overflow:auto">
                      <Event />
                    </div>
                  </Route>

                  <Route exact path="/todos">
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

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(App));
