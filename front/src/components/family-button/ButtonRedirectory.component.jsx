import React from 'react';
import {Link}from 'react-router-dom';
import './button.css';

function ButtonRedirectory  (){
        return(
            <div className="familyButton">
                <Link to="/family-directory"><p> Famille </p></Link>
            </div>            
        )}

export default ButtonRedirectory;