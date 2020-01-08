import React from "react";
import "./registerform.css";
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
    axios
      .post("https://localhost:8000/register", {
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
  };

  checkPassword = () => {
    if (this.state.password === this.state.password_confirm) {
      this.submitForm();
    } else {
      alert("Le mot de passe ne correspond pas");
    }
  };

  render() {
    return (
      <div className="FormFamily">
        <h1>Création de Compte</h1>

        <form onSubmit={this.submitForm}>
          <fieldset>
            <legend>Informations</legend>
            <div className="form-data">
              <label htmlFor="lastname">Nom</label>
              <input
                type="text"
                id="lastname"
                name="lastname"
                onChange={this.onChange}
                value={this.state.lastname}
                required
              />
            </div>

            <div className="form-data">
              <label htmlFor="firstname">Prénom</label>
              <input
                type="text"
                id="firstname"
                name="firstname"
                onChange={this.onChange}
                value={this.state.firstname}
                required
              />
            </div>

            <div className="form-data">
              <label htmlFor="firstname">Date de Naissance</label>
              <input
                type="date"
                id="birthdate"
                name="birthdate"
                onChange={this.onChange}
                value={this.state.birthdate}
                required
              />
            </div>

            <div className="form-data">
              <label htmlFor="email">E-mail</label>
              <input
                type="email"
                id="email"
                name="email"
                onChange={this.onChange}
                value={this.state.email}
                required
              />
            </div>
            <hr />

            <div className="form-data">
              <label htmlFor="password">Mot de passe</label>
              <input
                type="password"
                id="password"
                name="password"
                onChange={this.onChange}
                value={this.state.password}
                required
              />
            </div>
            <div className="form-data">
              <label htmlFor="password">Confirmez votre mot de passe</label>
              <input
                type="password"
                id="password_confirm"
                name="password_confirm"
                onChange={this.onChange}
                value={this.state.password_confirm}
                required
              />
            </div>
            <hr />

            <div className="form-data">
              <input
                type="submit"
                value="Envoyer"
                onClick={this.checkPassword}
              />
            </div>
          </fieldset>
        </form>
      </div>
    );
  }
}

export default RegisterForm;
