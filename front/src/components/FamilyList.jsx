import React from 'react'
import {
  Link,
} from "react-router-dom";

class FamilyList extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      families: this.props.families,
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