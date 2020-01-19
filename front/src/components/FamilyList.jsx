import React from 'react'
import {
  Link,
} from "react-router-dom";

class FamilyList extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      families: [
        {id: 1, name: 'Pinchon'},
        {id: 2, name: 'Robert'},
        {id: 3, name: 'Tonello'},
        {id: 4, name: 'Trochain'},
      ]
    }
  }

  render() {
    return (
      <ul>
        <li>
          <input type="text" placeholder="Doe" /><button>+</button>
        </li>
        {
          React.Children.toArray(
            this.state.families.map(
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
}

export default FamilyList