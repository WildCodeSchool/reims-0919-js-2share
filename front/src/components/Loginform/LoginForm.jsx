import React from "react";
import { connect } from "react-redux";
import { storeToken } from "../../redux/reducer";

import "./LoginForm.css";

import axios from "axios";

const mapDispatchToProps = dispatch => ({
  storeToken: token => dispatch(storeToken(token))
});
class LoginForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      email: "",
      password: ""
    };
  }

  handleChange = event => {
    this.setState({
      [event.target.name]: event.target.value
    });
  };

  handleSubmit = event => {
    event.preventDefault();
    axios
      .post("http://localhost:8000/login", {
        email: this.state.email,
        password: this.state.password
      })
      .then(response => {
        this.props.storeToken(response.data.token);
        response.data.token && this.props.history.push("/family-directory");
      });
  };
  //essayer avec des données en dur

  render() {
    const { email, password } = this.state;
    return (
      <div className="LoginForm">
        <form onSubmit={this.handleSubmit}>
          <div>
            <div>
              <input
                className="inputStyle"
                type="text"
                id="email"
                placeholder="Email"
                name="email"
                onChange={this.handleChange}
                value={email}
              />
            </div>
          </div>

          <div>
            <input
              className="inputStyle"
              type="password"
              id="password"
              placeholder="Password"
              name="password"
              onChange={this.handleChange}
              value={password}
              required
            />
          </div>
          <div className="spaceBetween">
            <button className="loginButton" type="submit" value="Login">
              CONNEXION
            </button>
          </div>
        </form>
      </div>
    );
  }
}

export default connect(null, mapDispatchToProps)(LoginForm);
