import React from "react";
import axios from "axios";

class RegisterForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      firstname: "",
      lastname: "",
      birthdate: "",
      email: "",
      password: "",
      password_confirm: ""
    };
  }

  onChange = e => {
    const { name, value } = e.target;
    this.setState({ [name]: value });
  };

  submitForm = e => {
    e.preventDefault();
    if (this.state.password === this.state.password_confirm) {
      axios
        .post("http://localhost:8000/register", {
          firstname: this.state.firstname,
          lastname: this.state.lastname,
          birthdate: this.state.birthdate,
          email: this.state.email,
          password: this.state.password
        })
        .then(res => {
          if (res.error) {
            alert(res.error);
          } else {
            alert("Compte créé");
          }
        })
        .catch(e => {
          console.error(e);
          alert("Erreur lors de l'envoi du formulaire d'inscription");
        });
    } else {
      alert("Le mot de passe ne correspond pas");
    }
  };

  render() {
    return (
      <div>
        <form className="flex:column flex-both:center" onSubmit={this.submitForm}>
          <div className="flex:column flex-cross:center space:stack">
            <label className="space:stack" htmlFor="lastname">
              Nom
            </label>
            <input
              className="flex:1 space:inset-squish"
              type="text"
              id="lastname"
              name="lastname"
              onChange={this.onChange}
              value={this.state.lastname}
              required
            />
          </div>

          <div className="flex:column flex-cross:center space:stack">
            <label className="space:stack" htmlFor="firstname">
              Prénom
            </label>
            <input
              className="flex:1 space:inset-squish"
              type="text"
              id="firstname"
              name="firstname"
              onChange={this.onChange}
              value={this.state.firstname}
              required
            />
          </div>

          <div className="flex:column flex-cross:center space:stack">
            <label className="space:stack" htmlFor="birthdate">
              Date de naissance
            </label>
            <input
              className="flex:1 space:inset-squish"
              type="date"
              id="birthdate"
              name="birthdate"
              min="1920-01-01"
              onChange={this.onChange}
              value={this.state.birthdate}
              required
            />
          </div>

          <div className="flex:column flex-cross:center space:stack">
            <label className="space:stack" htmlFor="email">
              Email
            </label>
            <input
              className="flex:1 space:inset-squish"
              type="email"
              id="email"
              name="email"
              onChange={this.onChange}
              value={this.state.email}
              required
            />
          </div>

          <div className="flex:column flex-cross:center space:stack">
            <label className="space:stack" htmlFor="password">
              Mot de passe
            </label>
            <input
              className="flex:1 space:inset-squish"
              type="password"
              id="password"
              name="password"
              onChange={this.onChange}
              value={this.state.password}
              required
            />
          </div>

          <div className="flex:column flex-cross:center space:stack">
            <label className="space:stack" htmlFor="password_confirm">
              Confirmation du mot de passe
            </label>
            <input
              className="flex:1 space:inset-squish"
              type="password"
              id="password_confirm"
              name="password_confirm"
              onChange={this.onChange}
              value={this.state.password_confirm}
              required
            />
          </div>
          <button className="space:inset-squish" type="submit">INSCRIPTION</button>
        </form>
      </div>
    );
  }
}

export default RegisterForm;
