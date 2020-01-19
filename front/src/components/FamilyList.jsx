import React from 'react'
import {
  Link,
} from "react-router-dom";

const FamilyList = ({
  families,
}) => {
  return (
    <ul>
      <li>
        <input type="text" placeholder="Doe" /><button>+</button>
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