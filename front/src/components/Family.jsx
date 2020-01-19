import React from 'react'

class Family extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      members: [
        {email: 'jessy@mail.com'},
        {email: 'marine@mail.com'},
        {email: 'alexis@mail.com'},
        {email: 'sophie@mail.com'},
      ]
    }
  }

  render() {
    return (
      <ul>
        <li>
          <input type="email" placeholder="jdoe@mail.com" /><button>+</button>
        </li>
        {
          React.Children.toArray(
            this.state.members.map(
              member => (
                <li>
                  {member.email}<button>-</button>
                </li>
              )
            )
          )
        }
      </ul>
    )
  }
}

export default Family