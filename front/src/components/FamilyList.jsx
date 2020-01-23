import React, { useState } from "react";
import { Link } from "react-router-dom";

const h2 = (text) => (
  <h2 className="flex-self:stretch space:inset space:stack title" style={{backgroundColor: 'var(--primary-color)', background: 'linear-gradient(var(--primary-color), 10%, var(--secondary-color))', color: 'var(--primary-text-color)'}}>{text}</h2>
)

const FamilyList = ({ families, createFamily, token }) => {
  const [newFamilyName, setNewFamilyName] = useState("");

  return (
    <>
    {h2('2Share')}
    <ul className="space:inset" style={{listStyleType: 'none'}}>
      <li className="flex:row flex-cross:center space:stack">
        <label for="family" className="space:inline">famille</label>
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
