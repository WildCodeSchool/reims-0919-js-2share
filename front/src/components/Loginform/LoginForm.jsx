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
      });
  };
  //essayer avec des données en dur

  render() {
    const { email, password } = this.state;
    return (
      <div className="LoginForm">
        <h1>CONNEXION</h1>

        <form onSubmit={this.handleSubmit}>
          <fieldset>
            <div className="form-data">
              <label htmlFor="email">E-MAIL</label>
              <input
                type="text"
                id="email"
                placeholder="Enter your email"
                name="email"
                onChange={this.handleChange}
                value={email}
              />
            </div>

            <div className="form-data">
              <label htmlFor="password">PASSWORD</label>
              <input
                type="password"
                id="password"
                placeholder="Enter your password"
                name="password"
                onChange={this.handleChange}
                value={password}
                required
              />
            </div>

            <hr />
            <div className="form-data">
              <input type="submit" value="Login" />
            </div>
          </fieldset>
        </form>
      </div>
    );
  }
}

export default connect(null, mapDispatchToProps)(LoginForm);
