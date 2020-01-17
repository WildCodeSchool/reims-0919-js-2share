import React from 'react';
import {Link} from "react-router-dom";
import './HomePage.css';


function HomePage () {
  return (

    <div className="redirectionItem">
      <span>
        <Link to="/loginform">
        <button className="redirectionButton1">
        Se connecter
        </button>
        </Link>
      </span>
      <span>
        <Link to="/registerform">
        <button className="redirectionButton2">
        S'inscrire
        </button>
        </Link>
      </span>
    </div>
  )
}
export default HomePage;