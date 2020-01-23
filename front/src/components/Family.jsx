import React from 'react'
import { connect } from 'react-redux'
import axios from 'axios';

const mapStateToProps = state => ({
  token: state.token
})

class Family extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      members: [],
      newMemberEmail: '',
      newMemberRole: '',
      children:[],
      newChildrenFirstname: ''
    }
    this.addMember = this.addMember.bind(this);
    this.addChild = this.addChild.bind(this);
    this.removeChild = this.removeChild.bind(this);
  }

  componentDidMount() {
    fetch(`http://localhost:8000/families/${this.props.match.params.id}/users`)
      .then(response => response.json())
      .then(data => this.setState({members: data}));
    
      fetch('http://localhost:8000/children', {
        method: 'get',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': this.props.token,
          'id' : this.props.match.params.id
        }, 
      })
        .then(response =>response.json())
        .then(data=> this.setState({children: data}))
  }

  addMember() {
    fetch(`http://localhost:8000/families/${this.props.match.params.id}/users`, {
      method: 'post',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': this.props.token
      },
      body: JSON.stringify({
        email: this.state.newMemberEmail,
        family_id: this.props.match.params.id,
        role: this.state.newMemberRole,
      })
    })
      .then(response => response.json())
      .then(data => {
        this.setState(prevState => ({
          members: [...prevState.members, data],
          newMemberEmail: '',
          newMemberRole: '',
        }))
      })
  }

  addChild() {
    if(this.state.newChildrenFirstname === '') {
      alert('ajouter un prénom')
    } else {
    fetch('http://localhost:8000/children', {
      method: 'post',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': this.props.token
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
  }

  deleteChild = (id) => {
    axios(`http://localhost:8000/children/${id}`, {
      method:'delete',
      headers: {
        'Authorization': this.props.token
      }})
      .then(response => {
        if (response.status === 200) {
          this.removeChild(id)
        }
      })
  };

  removeChild(id) {
    const children = this.state.children.filter((child) => {
      return child.id !== id
    })
    this.setState({ children })
  }

  deleteMember (email) {
    axios(`http://localhost:8000/families/${this.props.match.params.id}/users`, { 
    method:"delete", 
    data: {email},
    headers: {
      'Authorization': this.props.token
    }})
      .then(response => {
        if (response.status === 200) {
          this.removeMember(email)
        }
      })
  };

  removeMember(email) {
    const members = this.state.members.filter((members) => {
      return members.email !== email
    })
    this.setState({ members })
  }

  render() {
    return (
      <div>
        <h2>Membres</h2>
      <ul>
        <li>
          <input type="email" placeholder="jdoe@mail.com" onChange={e => this.setState({newMemberEmail: e.target.value})} value={this.state.newMemberEmail} />
          <input type="text" placeholder="parent, nounou..." onChange={e => this.setState({newMemberRole: e.target.value})} value={this.state.newMemberRole} />
          <button onClick={this.addMember}>+</button>
        </li>
        {
          React.Children.toArray(
            this.state.members.map(
              member => (
                <li>
                  {member.email} ({member.role})<button onClick={()=> {this.deleteMember(member.email)}}>-</button>
                </li>
              )
            )
          )
        }
      </ul>

      <h2>Enfants</h2>
      <ul>
      <li>
        <input type="firstname" placeholder="prénom enfant" onChange={e => this.setState({newChildrenFirstname: e.target.value})} value={this.state.newChildrenFirstname} />
        <button onClick={this.addChild}>+</button>
      </li>
      {
        React.Children.toArray(
          this.state.children.map(
            child => (
              <li>
                {child.firstname}<button onClick={()=> {this.deleteChild(child.id)}}>-</button>
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

export default connect(mapStateToProps)(Family)