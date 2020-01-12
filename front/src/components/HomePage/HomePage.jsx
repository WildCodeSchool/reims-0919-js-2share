import React from 'react';
import {Link} from "react-router-dom"

function HomePage () {
  return (

    <div className="item">
      <span>
        <Link to="/loginForm">
        <button>
        Se connecter
        </button>
        </Link>
      </span>
      <span>
        <Link to="/RegisterForm">
        <button>
        S'inscrire
        </button>
        </Link>
      </span>
    </div>
  )
}
export default HomePage;