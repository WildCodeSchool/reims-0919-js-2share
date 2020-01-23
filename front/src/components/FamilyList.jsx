import React, { useState } from "react";
import { Link } from "react-router-dom";

const h2 = (image) => (
  <h2 className="flex-self:stretch text:center space:stack title" style={{backgroundColor: 'var(--primary-color)', background: 'linear-gradient(var(--primary-color), 10%, var(--secondary-color))', color: 'var(--primary-text-color)'}}>{image}</h2>
)

const FamilyList = ({ families, createFamily, token }) => {
  const [newFamilyName, setNewFamilyName] = useState("");

  return (
    <>
    {h2(<img src="logo_toshare_white.png" height="70px" width="200px" alt="logo"/>)}
    <ul className="space:inset" style={{listStyleType: 'none'}}>
      <li className="flex:row flex-cross:center space:stack">
        <label htmlFor="family" className="space:inline">famille</label>
        <input
          id="family"
          className="space:inset-squish space:inline flex:1"
          type="text"
          placeholder="Doe"
          onChange={e => setNewFamilyName(e.target.value)}
          value={newFamilyName}
        />
        <button
          className="flex-self:center space:inset-squish"
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
            <Link className="flex:1 space:stack space:inset border:1" to={{
              pathname: `/families/${family.id}`,
              state: { familyName: family.name }
            }}>famille {family.name}</Link>
          </li>
        ))
      )}
    </ul>
    </>
  );
};

export default FamilyList;
