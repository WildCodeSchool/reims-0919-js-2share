import React from 'react'
import './Footer.css'
import {Link} from "react-router-dom";

function Footer () {
    return (

            <div className="logo2shareindividual">
                <img className="logoburger logo" src='https://zupimages.net/up/20/03/odxs.png' alt='' />
                <img className="logobudget logo" src='https://zupimages.net/up/20/03/hoos.png' alt=''/>
                <Link className="logo" to="/">
                    <img className="logohome" src='https://zupimages.net/up/20/03/aoh2.png' alt=''/>
                </Link>
                <img className="logocontact logo" src='https://zupimages.net/up/20/03/4xxv.png' alt=''/>
                <img className="logorappel logo" src='https://zupimages.net/up/20/03/p1yt.png' alt=''/>
            </div>

    )
}

export default Footer