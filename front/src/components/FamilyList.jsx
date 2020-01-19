import React from 'react'

class FamilyList extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      families: []
    }
  }

  render() {
    return (
      <p>hello from /families</p>
    )
  }
}

export default FamilyList