import React from 'react'

class Family extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      members: []
    }
  }

  render() {
    return (
      <p>hello from /families/{this.props.match.params.id}</p>
    )
  }
}

export default Family