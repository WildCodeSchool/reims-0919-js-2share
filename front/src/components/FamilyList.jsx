import React, { useState } from "react";
import { Link, useHistory } from "react-router-dom";
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome'
import { faSignOutAlt } from '@fortawesome/free-solid-svg-icons'

const h2 = (image) => (
  <h2 className="flex-self:stretch text:center space:stack title" style={{backgroundColor: 'var(--primary-color)', background: 'linear-gradient(var(--primary-color), 10%, var(--secondary-color))', color: 'var(--primary-text-color)'}}>{image}</h2>
)

const FamilyList = ({ families, createFamily, token }) => {
  const [newFamilyName, setNewFamilyName] = useState("");
  const hystory = useHistory();

  return (
    <>
    <div style={{position: 'relative'}}>
      <FontAwesomeIcon icon={ faSignOutAlt } size="2x" className="flex-self:stretch" style={{position: 'absolute', right: '1rem', color: 'white', height: '76px', lineHeight: '76px'}} onClick={() => hystory.push('/logout')} />
      {h2(<img src="logo_toshare_white.png" height="70px" width="200px" alt="logo"/>)}
    </div>
    <p className="text:center space:inline" style={{fontSize: '17px', fontWeight: 'bold'}}> Créez une famille ici :</p>
    <ul className="space:inset" style={{listStyleType: 'none'}}>
      <li className="flex:row flex-cross:center space:stack">
        <label htmlFor="family" className="space:inline"></label>
        <input
          id="family"
          className="space:inset-squish space:inline flex:1"
          type="text"
          placeholder="Nom de famille..."
          onChange={e => setNewFamilyName(e.target.value)}
          value={newFamilyName}
        />
        <button
          className="flex-self:center space:inset-squish space-size:s"
          style={{fontWeight:'bold', fontSize:'20px'}}
          onClick={() => {
            createFamily(newFamilyName);
            setNewFamilyName("");
          }}
        >
          +
        </button>
      </li>
      {React.Children.toArray(
        families.map(family => (
          <li className="flex:row">
            <Link className="flex:1 space:stack space:inset border:1" 
            style={{borderRadius: '15px'}}
            to={{
              pathname: `/families/${family.id}`,
              state: { familyName: family.name }
            }}>Famille: {family.name}</Link>
          </li>
        ))
      )}
    </ul>
    </>
  );
};

export default FamilyList;
