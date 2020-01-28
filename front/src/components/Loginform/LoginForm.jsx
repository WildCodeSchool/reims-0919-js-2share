import React from "react";
import { connect } from "react-redux";
import { storeToken } from "../../redux/reducer";
import cogoToast from "cogo-toast";

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
    this.props.token && this.props.getFamilies();
  }

  handleSubmit = () => {
    axios
      .post("http://localhost:8000/login", {
        email: this.state.email,
        password: this.state.password
      })
      .then(response => {
        this.props.storeToken(response.data.token);
      })
      .catch(e => {
        cogoToast.error("Identifiant ou mot de passe incorrect");
      });
  };

  render() {
    const { email, password } = this.state;
    return (
      <div className="flex:column flex-cross:center">
        <div className="flex:column flex-cross:center space:stack">
          <label htmlFor="email" className="space:stack">
            Email
          </label>
          <input
            className="flex:1 space:inset-squish"
            type="email"
            id="email"
            placeholder="jdoe@mail.com"
            name="email"
            onChange={this.handleChange}
            value={email}
          />
        </div>

        <div className="flex:column flex-cross:center space:stack">
          <label htmlFor="password" className="space:stack">
            Mot de passe
          </label>
          <input
            className="flex:1 space:inset-squish"
            type="password"
            id="password"
            placeholder="********"
            name="password"
            onChange={this.handleChange}
            value={password}
            required
          />
        </div>
        <button
          className="space:inset-squish"
          type="button"
          onClick={this.handleSubmit}
        >
          CONNEXION
        </button>
      </div>
    );
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(LoginForm);
