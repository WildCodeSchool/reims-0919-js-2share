import React from "react";
import { connect } from "react-redux";
import { storeToken } from "../../redux/reducer";

import axios from "axios";

const mapStateToProps = state => ({
  token: state.token
});

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

  componentDidUpdate() {
    this.props.token && this.props.getFamilies()
  }

  handleSubmit = event => {
    event.preventDefault();
    axios
      .post("http://localhost:8000/login", {
        email: this.state.email,
        password: this.state.password
      })
      .then(response => {
        this.props.storeToken(response.data.token);
      })
  };

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
              placeholder="Mot de passe"
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

export default connect(mapStateToProps, mapDispatchToProps)(LoginForm);
