import React from 'react'

class Family extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      members: [],
      newMemberEmail: '',
      children:[],
      newChildrenFirstname: ''
    }
    this.addMember = this.addMember.bind(this);
    this.addChild = this.addChild.bind(this);
  }

  componentDidMount() {
    fetch(`http://localhost:8000/families/${this.props.match.params.id}/users`)
      .then(response => response.json())
      .then(data => this.setState({members: data}));
    
      fetch('http://localhost:8000/children')
        .then(response =>response.json())
        .then(data=> this.setState({children: data}))
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
        role: this.props.match.params.id,
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

  addChild() {
    fetch('http://localhost:8000/children', {
      method: 'post',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        firstname: this.state.newChildrenFirstname,
        family_id: this.props.match.params.id,
      })
    })
      .then(response => response.json())
      .then(data => {
        this.setState(prevState => ({
          children: [...prevState.children, data],
          newChildrenFirstname: '',
        }))
      })
  }

  render() {
    return (
      <div>
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

      <ul>
      <li>
        <input type="firstname" placeholder="prénom enfant" onChange={e => this.setState({newChildrenFirstname: e.target.value})} value={this.state.newChildrenFirstname} />
        <button onClick={this.addChild}>+</button>
      </li>
      {
        React.Children.toArray(
          this.state.children.map(
            children => (
              <li>
                {children.firstname}<button>-</button>
              </li>
            )
          )
        )
      }
      </ul>
      </div>
    )
  }
}

export default Family