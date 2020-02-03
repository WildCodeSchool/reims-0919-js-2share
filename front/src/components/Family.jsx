import React from 'react'
import { connect } from 'react-redux'
import axios from 'axios';

const mapStateToProps = state => ({
  token: state.token
})

const h2 = (text) => (
  <h2 className="flex-self:stretch space:inset space:stack title" style={{backgroundColor: 'var(--primary-color)', background: 'linear-gradient(var(--primary-color), 10%, var(--secondary-color))', color: 'var(--primary-text-color)'}}>{text}</h2>
)

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
      <div className="flex:column">
      <h1 className="space-size:s space:inset title text:center">Famille {this.props.location.state.familyName}</h1>
      {h2('Membres')}
      <ul className="space:inset text:center" style={{listStyleType: 'none'}}>
        <li className="flex:row">
          <div className="flex:column flex-cross:stretch flex:1 space:inline">
            <div className="flex:row flex-cross:center space:stack">
              <label htmlFor="email" className="space:inline">Email</label>
              <input id="email" className="flex:1 space:inset-squish" type="email" 
              placeholder="exemple@mail.com" onChange={e => this.setState({newMemberEmail: e.target.value})} value={this.state.newMemberEmail} />
            </div>
            <div className="flex:row flex-cross:center space:stack">
              <label htmlFor="role" className="space:inline">Rôle</label>
              <input id="role" className="flex:1 space:inset-squish" type="text" 
              placeholder="parent, nounou..." onChange={e => this.setState({newMemberRole: e.target.value})} value={this.state.newMemberRole} />
            </div>
          </div>
          <button 
          className="flex-self:center space:inset-squish space-size:s"
          style={{fontWeight:'bold', fontSize:'20px'}}
          onClick={this.addMember}
          >+</button>
        </li>
        {
          React.Children.toArray(
            this.state.members.map(
              member => (
                <li className="space:stack">
                  <span className="space:inline">{member.email} ({member.role})</span>
                  <button 
                  className="flex-self:center space:inset-squish space-size:s"
                  style={{fontWeight:'bold', fontSize:'20px'}} 
                  onClick={()=> {this.deleteMember(member.email)}}
                  >-</button>
                </li>
              )
            )
          )
        }
      </ul>

      {h2('Enfants')}
      <ul className="space:inset text:center" style={{listStyleType: 'none'}}>
      <li className="flex:row flex-cross:center space:stack">
        <label htmlFor="firstname" className="space:inline">Prénom</label>
        <input id="firstname" className="flex:1 space:inset-squish space:inline" 
        type="text" placeholder="indiquez un prénom..." onChange={e => this.setState({newChildrenFirstname: e.target.value})} value={this.state.newChildrenFirstname} />
        <button 
        className="flex-self:center space:inset-squish space-size:s"
        style={{fontWeight:'bold', fontSize:'20px'}} 
        onClick={this.addChild}>+</button>
      </li>
      {
        React.Children.toArray(
          this.state.children.map(
            child => (
              <li className="display:inline-block space:inset-squish">
                <span className="space-size:s space:inline">{child.firstname}</span>
                <button 
                className="flex-self:center space:inset-squish space-size:s"
                style={{fontWeight:'bold', fontSize:'20px'}}
                onClick={()=> {this.deleteChild(child.id)}}>-</button>
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