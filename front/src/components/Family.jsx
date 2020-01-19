import React from 'react'

class Family extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      members: [],
      newMemberEmail: ''
    }
    this.addMember = this.addMember.bind(this)
  }

  componentDidMount() {
    fetch(`http://localhost:8000/families/${this.props.match.params.id}/users`)
      .then(response => response.json())
      .then(data => this.setState({members: data}))
  }

  addMember() {
    fetch(`http://localhost:8000/families/${this.props.match.params.id}/users`, {
      method: 'post',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        email: this.state.newMemberEmail,
        family_id: this.props.match.params.id,
      })
    })
      .then(response => response.json())
      .then(data => {
        this.setState(prevState => ({
          members: [...prevState.members, data],
          newMemberEmail: '',
        }))
      })
  }

  render() {
    return (
      <ul>
        <li>
          <input type="email" placeholder="jdoe@mail.com" onChange={e => this.setState({newMemberEmail: e.target.value})} value={this.state.newMemberEmail} />
          <button onClick={this.addMember}>+</button>
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