import React, {Component} from 'react';
import axios from 'axios';


class TodoList extends Component {
  deleteItem = (id) => {
    axios(`http://localhost:8000/todos/${id}`, {
      method:'delete',
      headers: {
        'Authorization': this.props.token
      }})
      .then(response => {
        if (response.status === 200) {
          this.props.removeItem(id)
        }
      })
  };

  render() {
    return(
      <ul style={{listStyleType: 'none'}}
      
      className="flex:column flex-cross:stretch space:inset">{ React.Children.toArray(this.props.todos.map((todo) => {
          return <li style={{listStyle:'square', marginLeft: '10px'}}>
            <span className="space:inline">
            { todo.description }
            </span>

            <button 
            className="flex-self:center space:inset-squish space-size:s"
            style={{fontWeight:'bold', fontSize:'20px'}} 
            onClick={() => { this.deleteItem(todo.id)}} >-</button>
          </li>
        }))}
      </ul>

    );
  }
}

export default TodoList;