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
        <h1 className="h1Family">Création de compte</h1>

        <form className="FormFamily" onSubmit={this.submitForm}>
          <div>
            <p className="paragraphFamily" htmlFor="lastname">
              Nom
            </p>
            <input
              className="inputFamily"
              type="text"
              id="lastname"
              name="lastname"
              onChange={this.onChange}
              value={this.state.lastname}
              required
            />
          </div>

          <div>
            <p className="paragraphFamily" htmlFor="firstname">
              Prénom
            </p>
            <input
              className="inputFamily"
              type="text"
              id="firstname"
              name="firstname"
              onChange={this.onChange}
              value={this.state.firstname}
              required
            />
          </div>

          <div>
            <p className="paragraphFamily" htmlFor="Birthdate">
              Date de naissance
            </p>
            <input
              className="inputFamily"
              type="date"
              id="birthdate"
              name="birthdate"
              min="1920-01-01"
              onChange={this.onChange}
              value={this.state.birthdate}
              required
            />
          </div>

          <div>
            <p className="paragraphFamily" htmlFor="email">
              Email
            </p>
            <input
              className="inputFamily"
              type="email"
              id="email"
              name="email"
              onChange={this.onChange}
              value={this.state.email}
              required
            />
          </div>

          <div>
            <p className="paragraphFamily" htmlFor="password">
              Mot de passe
            </p>
            <input
              className="inputFamily"
              type="password"
              id="password"
              name="password"
              onChange={this.onChange}
              value={this.state.password}
              required
            />
          </div>

          <div>
            <p className="paragraphFamily" htmlFor="password">
              Confirmation du mot de passe
            </p>
            <input
              className="inputFamily"
              type="password"
              id="password_confirm"
              name="password_confirm"
              onChange={this.onChange}
              value={this.state.password_confirm}
              required
            />
          </div>
          <div className="divButton">
            <input className="familyButton" type="submit" value="Envoyer" />
          </div>
        </form>
      </div>
    );
  }
}

export default RegisterForm;
