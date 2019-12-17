import React from 'react';
import ButtonRedirectory from './family-button/ButtonRedirectory.component';
import LogoutControl from './LogoutControl/LogoutControl'

function Home  (){
    return (
        <div>
            <p> Hello </p>
            <LogoutControl />
            <ButtonRedirectory/>
            <LoginForm />
        </div>

    )

}
export default Home; 

