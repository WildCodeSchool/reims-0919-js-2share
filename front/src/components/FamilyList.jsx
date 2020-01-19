import React, {
  useState,
} from 'react'
import {
  Link,
} from "react-router-dom";

const FamilyList = ({
  families,
  createFamily,
}) => {
  const [newFamilyName, setNewFamilyName] = useState('')

  return (
    <ul>
      <li>
        <input type="text" placeholder="Doe" onChange={e => setNewFamilyName(e.target.value)} value={newFamilyName} />
        <button onClick={() => {createFamily(newFamilyName); setNewFamilyName('')}}>+</button>
      </li>
      {
        React.Children.toArray(
          families.map(
            family => (
              <li>
                <Link to={`/families/${family.id}`}>{family.name}</Link>
              </li>
            )
          )
        )
      }
    </ul>
  )
}

export default FamilyList