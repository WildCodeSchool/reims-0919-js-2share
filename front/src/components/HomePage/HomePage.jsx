import React from 'react';
import {Link} from "react-router-dom";

function HomePage () {
  return (

    <div className="item">
      <span>
        <Link to="/loginform">
        <button>
        Se connecter
        </button>
        </Link>
      </span>
      <span>
        <Link to="/registerform">
        <button>
        S'inscrire
        </button>
        </Link>
      </span>
    </div>
  )
}
export default HomePage;