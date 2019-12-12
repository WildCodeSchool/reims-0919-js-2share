import React from 'react';
import {Link}from 'react-router-dom';
import './button.css';

function ButtonRedirectory  (){
        return(
            <div className="button">
                <Link to="/family-directory"><p> Family </p></Link>
            </div>            
        )}

export default ButtonRedirectory;
